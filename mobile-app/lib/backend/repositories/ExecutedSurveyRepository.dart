import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/repositories/implementations/amplify_datastore/ExecutedSurveyRepositoryAmplifyDataStore.dart'
    as implementation;

abstract class ExecutedSurveyRepository {
  static final ExecutedSurveyRepository instance =
      implementation.ExecutedSurveyRepositoryAmplifyDataStore.instance;

  Future<List<amp.ExecutedSurvey>> getAllAmpExecutedSurveys();

  Future<ExecutedSurvey> executedSurveyByID(String executedSurveyID);

  Future<amp.ExecutedSurvey> ampExecutedSurveyByID(String executedSurveyID);

  Future<List<amp.ExecutedSurvey>> executedSurveysByAppliedIntervention(
      amp.AppliedIntervention appliedIntervention);

  Future<ExecutedSurvey> saveExecutedSurvey(ExecutedSurvey executedSurvey);

  SyncedFile getQuestionAnswerPic(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question);

  SyncedFile getQuestionAnswerAudio(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question);
}
