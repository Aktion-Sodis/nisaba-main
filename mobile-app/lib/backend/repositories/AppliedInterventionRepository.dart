import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'UserRepository.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'implementations/amplify_datastore/AppliedInterventionRepositoryAmplifyDataStore.dart'
    as implementation;

abstract class AppliedInterventionRepository {
  static final AppliedInterventionRepository instance =
      implementation.AppliedInterventionRepositoryAmplifyDataStore.instance;

  Future<List<amp.AppliedIntervention>> getAllAmpAppliedInterventions();

  Future<List<amp.AppliedIntervention>> getAmpAppliedInterventionsByEntityID(
      String entityID);

  Future<amp.AppliedIntervention> getAmpAppliedInterventionByID(String id);

  Future<String> createAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity);

  Future<void> updateAppliedIntervention(
      AppliedIntervention appliedIntervention, Entity entity);

  Future<amp.AppliedIntervention> appliedInterventionByExecutedSurvey(
      amp.ExecutedSurvey executedSurvey);

  Future<amp.AppliedIntervention> _populate(
      amp.AppliedIntervention appliedIntervention,
      {List<amp.ExecutedSurvey>? executedSurveys});

  Future<List<amp.AppliedIntervention>> _populateList(
      List<amp.AppliedIntervention> appliedInterventions);

  //todo: implement pic logic

  SyncedFile appliedInterventionPic(AppliedIntervention appliedIntervention);
}
