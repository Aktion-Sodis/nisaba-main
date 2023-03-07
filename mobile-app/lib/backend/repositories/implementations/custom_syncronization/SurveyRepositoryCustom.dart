import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/callableModels/CallableModels.dart';

import '../../../callableModels/Relation.dart';
import '../../SurveyRepository.dart';

class SurveyRepositoryCustom extends SurveyRepository {
  static final SurveyRepositoryCustom instance = SurveyRepositoryCustom._();
  SurveyRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<Survey> getSurveyByID(String surveyID) async {
    return db.getById(Survey, surveyID) as Survey;
  }

  @override
  Future<List<Survey>> getAllAmpSurveys() async {
    return db.get(Survey);
  }

  @override
  Future<Survey> getAmpSurveyByID(String surveyID) async {
    return db.getById(Survey, surveyID) as Survey;
  }

  @override
  Future<List<Survey>> getAmpSurveysByIntervention(
      Intervention intervention) async {
    return db.get(
        Survey, Query(QPredicate.EQ, 'interventionSurveysId', intervention.id));
  }

  Future<Survey> _populate(Survey survey,
      {Intervention? passedIntervention}) async {
    Survey toReturn = survey;
    Intervention? toPass = passedIntervention;

    if (toPass == null) {
      if (survey.intervention != null) {
        print("loading according to stored intervention");
        toPass = survey.intervention;
        toPass!.surveys = [];
        toPass.levelConnections = [];
        toPass.tagConnections = [];
        toPass.interventionContentRelations = [];
      } else {}
    }
    toReturn.intervention = toPass;
    toReturn.tagConnections = await surveySurveyTagRelationsBySurvey(survey);

    return toReturn;
  }

  Future<List<Survey>> _populateList(List<Survey> surveys,
      {Intervention? intervention}) {
    return Future.wait(
        List.generate(surveys.length, (index) => _populate(surveys[index])));
  }

  @override
  Future<List<SurveySurveyTagRelation>>
      getAllSurveySurveyTagRelationsBySurvey() async {
    return db.get(SurveySurveyTagRelation);
  }

  @override
  Future<List<SurveySurveyTagRelation>> surveySurveyTagRelationsBySurvey(
      Survey survey) {
    return db.get(
        SurveySurveyTagRelation, Query(QPredicate.EQ, 'surveyId', survey.id));
  }

  @override
  SyncedFile getSurveyPic(Survey survey) {
    String path = dataStorePath(DataStorePaths.interventionSurveyPicPath,
        [survey.intervention!.id!, survey.id!]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getQuestionPic(Survey survey, Question question) {
    String path = dataStorePath(DataStorePaths.questionPicPath,
        [survey.intervention!.id!, survey.id!, question.id!]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getQuestionOptionPic(
      Survey survey, Question question, QuestionOption questionOption) {
    String path = dataStorePath(DataStorePaths.questionOptionPicPath, [
      survey.intervention!.id!,
      survey.id!,
      question.id!,
      questionOption.id!
    ]);
    return SyncedFile(path);
  }
}
