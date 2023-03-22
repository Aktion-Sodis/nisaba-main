import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'UserRepository.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'implementations/custom_syncronization/AppliedInterventionRepositoryCustom.dart';

abstract class AppliedInterventionRepository {
  static final AppliedInterventionRepository instance =
      AppliedInterventionRepositoryCustom.instance;

  Future<List<AppliedIntervention>> getAllAmpAppliedInterventions();

  Future<List<AppliedIntervention>> getAmpAppliedInterventionsByEntityID(
      String entityID);

  Future<AppliedIntervention> getAmpAppliedInterventionByID(String id);

  Future<String> createAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity);

  Future<void> updateAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity);

  Future<AppliedIntervention> appliedInterventionByExecutedSurvey(
      ExecutedSurvey executedSurvey);

  Future<AppliedIntervention> _populate(AppliedIntervention appliedIntervention,
      {List<ExecutedSurvey>? executedSurveys});

  Future<List<AppliedIntervention>> _populateList(
      List<AppliedIntervention> appliedInterventions);

  //todo: implement pic logic

  SyncedFile appliedInterventionPic(AppliedIntervention appliedIntervention);
}
