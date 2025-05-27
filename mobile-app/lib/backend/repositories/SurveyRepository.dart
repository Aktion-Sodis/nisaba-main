import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/SurveyRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import '../callableModels/Relation.dart';

abstract class SurveyRepository {
  static final SurveyRepository instance = SurveyRepositoryCustom.instance;

  Future<Survey> getSurveyByID(String surveyID);

  Future<List<Survey>> getAllAmpSurveys();

  Future<Survey> getAmpSurveyByID(String surveyID);

  Future<List<Survey>> getAmpSurveysByIntervention(Intervention intervention);

  Future<List<SurveySurveyTagRelation>>
      getAllSurveySurveyTagRelationsBySurvey();

  Future<List<SurveySurveyTagRelation>> surveySurveyTagRelationsBySurvey(
      Survey survey);

  SyncedFile getSurveyPic(Survey survey);

  SyncedFile getQuestionPic(Survey survey, Question question);

  SyncedFile getQuestionOptionPic(
      Survey survey, Question question, QuestionOption questionOption);
}
