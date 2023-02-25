import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart'
    as definition;
import 'implementations/amplify_datastore/SurveyRepositoryAmplifyDataStore.dart'
    as implementation;

abstract class SurveyRepository {
  static final SurveyRepository instance =
      implementation.SurveyRepositoryAmplifyDataStore.instance;

  Future<Survey> getSurveyByID(String surveyID);

  Future<List<amp.Survey>> getAllAmpSurveys();

  Future<amp.Survey> getAmpSurveyByID(String surveyID);

  Future<List<amp.Survey>> getAmpSurveysByIntervention(
      amp.Intervention intervention);

  Future<List<amp.SurveySurveyTagRelation>>
      getAllSurveySurveyTagRelationsBySurvey();

  Future<List<amp.SurveySurveyTagRelation>> surveySurveyTagRelationsBySurvey(
      amp.Survey survey);

  SyncedFile getSurveyPic(Survey survey);

  SyncedFile getQuestionPic(Survey survey, Question question);

  SyncedFile getQuestionOptionPic(
      Survey survey, Question question, QuestionOption questionOption);
}
