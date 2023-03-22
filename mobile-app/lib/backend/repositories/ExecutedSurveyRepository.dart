import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/ExecutedSurveyRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

abstract class ExecutedSurveyRepository {
  static final ExecutedSurveyRepository instance =
      ExecutedSurveyRepositoryCustom.instance;

  Future<List<ExecutedSurvey>> getAllAmpExecutedSurveys();

  Future<ExecutedSurvey> executedSurveyByID(String executedSurveyID);

  Future<ExecutedSurvey> ampExecutedSurveyByID(String executedSurveyID);

  Future<List<ExecutedSurvey>> executedSurveysByAppliedIntervention(
      AppliedIntervention appliedIntervention);

  Future<ExecutedSurvey> saveExecutedSurvey(ExecutedSurvey executedSurvey);

  SyncedFile getQuestionAnswerPic(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question);

  SyncedFile getQuestionAnswerAudio(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question);
}
