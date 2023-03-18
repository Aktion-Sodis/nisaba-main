import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart'
    as definition;
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class AppliedInterventionRepositoryCustom
    extends definition.AppliedInterventionRepository {
  @override
  static final AppliedInterventionRepositoryCustom instance =
      AppliedInterventionRepositoryCustom._();

  @override
  AppliedInterventionRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<AppliedIntervention>> getAllAmpAppliedInterventions() async {
    List<AppliedIntervention> appliedInterventions =
        await db.get(AppliedIntervention);

    return appliedInterventions;
  }

  @override
  Future<List<AppliedIntervention>> getAmpAppliedInterventionsByEntityID(
      String entityID) async {
    print("applied Interventions by Entity: $entityID");
    List<AppliedIntervention> appliedInterventions = await db.get(
        AppliedIntervention,
        Query(QPredicate.EQ, 'entityAppliedInterventionsId', entityID));

    print("number: ${appliedInterventions.length}");

    return _populateList(appliedInterventions);
  }

  @override
  Future<AppliedIntervention> getAmpAppliedInterventionByID(String id) async {
    AppliedIntervention result =
        await db.getById(AppliedIntervention, id) as AppliedIntervention;

    return _populate(result);
  }

  @override
  Future<String> createAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity) async {
    await db.create(appliedIntervention);

    return appliedIntervention.id;
  }

  @override
  Future updateAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity) async {
    appliedIntervention.id = appliedIntervention.id ?? UUID.getUUID();
    appliedIntervention.entity = entity;

    db.update(appliedIntervention);
  }

  @override
  Future<AppliedIntervention> appliedInterventionByExecutedSurvey(
      ExecutedSurvey executedSurvey) async {
    print("applied intervention by executed survey");

    //todo: möglich dass querying feld / art und weise nicht korrekt
    List<AppliedIntervention> results = await db.get(AppliedIntervention,
        Query(QPredicate.CONTAINS, 'executedSurveys', executedSurvey.id));

    return _populate(results.first, executedSurveys: []);
  }

  Future<AppliedIntervention> _populate(AppliedIntervention appliedIntervention,
      {List<ExecutedSurvey>? executedSurveys}) async {
    // Population of User and Entity not implemented
    appliedIntervention.intervention = await InterventionRepository.instance
        .getAmpInterventionByID(
            appliedIntervention.appliedInterventionInterventionId);

    appliedIntervention.executedSurveys = await ExecutedSurveyRepository
        .instance
        .executedSurveysByAppliedIntervention(appliedIntervention);

    return appliedIntervention;
  }

  @override
  Future<List<AppliedIntervention>> _populateList(
          List<AppliedIntervention> appliedInterventions) =>
      Future.wait(List.generate(appliedInterventions.length,
          (index) => _populate(appliedInterventions[index])));

  //todo: implement pic logic

  @override
  SyncedFile appliedInterventionPic(AppliedIntervention appliedIntervention) {
    String path = dataStorePath(
        DataStorePaths.appliedInterventionPicPath, [appliedIntervention.id!]);
    return SyncedFile(path);
  }
}
