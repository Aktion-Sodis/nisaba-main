import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart'
    as definition;
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../../../callableModels/Relation.dart';

class InterventionRepositoryCustom extends definition.InterventionRepository {
  @override
  static final InterventionRepositoryCustom instance =
      InterventionRepositoryCustom._();

  @override
  InterventionRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<Intervention>> getAllAmpIntervention() async {
    return db.get(Intervention);
  }

  @override
  Future<Intervention> getAmpInterventionByID(String interventionID) async {
    return populate(
        await db.getById(Intervention, interventionID) as Intervention);
  }

  @override
  Future<List<Intervention>> getInterventionsByLevelConnections(
      List<LevelInterventionRelation> relations) async {
    print("interventions to populate from connections: ${relations.length}");

    if (relations.isEmpty) {
      return [];
    }

    List<Future<Intervention?>> toWait = relations
        .map((e) => db.getById<Intervention>(Intervention, e.interventionId))
        .toList();

    List<Intervention> interventions = (await Future.wait(toWait))
        .where((element) => element != null)
        .map((e) => e!)
        .toList();

    interventions = await populateList(interventions);
    return interventions;
  }

  @override
  Future<Intervention?> getAmplifyInterventionBySurvey(Survey survey) async {
    /*var interventions = await Amplify.DataStore.query(
        Intervention.classType,
        where: Intervention;*/
    return null;
    //return populate(interventions.first);
    //todo: query könnte falsch sein
  }

  @override
  Future<List<Intervention>> populateList(List<Intervention> interventions) {
    List<Future<Intervention>> toWait = List.generate(
        interventions.length, (index) => populate(interventions[index]));
    return Future.wait(toWait);
  }

  @override
  Future<Intervention> populate(Intervention intervention) async {
    Intervention toReturn = intervention;

    toReturn.levelConnections =
        await levelInterventionRelationsByInterventionID(intervention);

    for (Survey survey in toReturn.surveys) {
      survey.intervention = toReturn;
    }

    return toReturn;
  }

  Future<Intervention> populateWithConnectionsAndSurveys(Intervention toPopulate) async {
    toPopulate.levelConnections = await levelInterventionRelationsByInterventionID(toPopulate);
    toPopulate.surveys = await SurveyRepository.instance.getAmpSurveysByIntervention(toPopulate);
    for (Survey survey in toPopulate.surveys) {
      survey.intervention = toPopulate;
    }
    return toPopulate;
  }

  Future<List<Intervention>> populateListWithConnectionsAndSurveys(List<Intervention> toPopulate) async {
    List<Future<Intervention>> toWait = List.generate(toPopulate.length, (index) => populateWithConnectionsAndSurveys(toPopulate[index]));
    return Future.wait(toWait);
  }

  @override
  Future<List<InterventionContentRelation>>
      interventionContentRelationsByInterventionID(
          Intervention intervention) async {
    return db.get(InterventionContentRelation,
        Query(QPredicate.EQ, 'interventionId', intervention.id));
  }

  @override
  Future<List<InterventionInterventionTagRelation>>
      interventionInterventionTagRelationsByInterventionID(
          Intervention intervention) async {
    return db.get(InterventionInterventionTagRelation,
        Query(QPredicate.EQ, 'interventionId', intervention.id));
  }

  @override
  Future<List<LevelInterventionRelation>>
      levelInterventionRelationsByInterventionID(
          Intervention intervention) async {
    return db.get(LevelInterventionRelation,
        Query(QPredicate.EQ, 'interventionId', intervention.id));
  }

  @override
  SyncedFile getInterventionPic(Intervention intervention) {
    String path =
        dataStorePath(DataStorePaths.interventionPicPath, [intervention.id!]);
    return SyncedFile(path);
  }

  @override
  Future<Intervention> populatedInterventionFromContent(String id) async {
    Intervention intervention =
        await db.getById(Intervention, id) as Intervention;
    return populate(intervention);
  }

  @override
  Future<List<Intervention>> allInterventionsIncludingSurveys() async {
    List<Intervention> interventions = await getAllAmpIntervention();
    return populateListWithConnectionsAndSurveys(interventions);
  }
}
