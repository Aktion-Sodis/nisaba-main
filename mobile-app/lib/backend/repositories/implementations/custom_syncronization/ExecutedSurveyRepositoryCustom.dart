import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart'
    as definition;
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class ExecutedSurveyRepositoryCustom
    extends definition.ExecutedSurveyRepository {
  static final ExecutedSurveyRepositoryCustom instance =
      ExecutedSurveyRepositoryCustom._();

  ExecutedSurveyRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<ExecutedSurvey>> getAllAmpExecutedSurveys() async {
    List<ExecutedSurvey> results = await db.get(ExecutedSurvey);
    return results;
  }

  @override
  Future<ExecutedSurvey> executedSurveyByID(String executedSurveyID) async {
    ExecutedSurvey executedSurvey =
        db.getById(ExecutedSurvey, executedSurveyID) as ExecutedSurvey;
    return executedSurvey;
  }

  @override
  Future<ExecutedSurvey> ampExecutedSurveyByID(String executedSurveyID) async {
    ExecutedSurvey executedSurvey =
        db.getById(ExecutedSurvey, executedSurveyID) as ExecutedSurvey;
    return _populate(executedSurvey);
  }

  @override
  Future<List<ExecutedSurvey>> executedSurveysByAppliedIntervention(
      AppliedIntervention appliedIntervention) async {
    print("executed survey by applied intervention");
    print("applied intervention: ");
    print(appliedIntervention.whoDidIt.toString());

    List<ExecutedSurvey> toReturn = await db.get(
        ExecutedSurvey,
        Query(QPredicate.EQ, 'appliedInterventionExecutedSurveysId',
            appliedIntervention.id));

    return _populateList(toReturn, appliedIntervention: appliedIntervention);
  }

  Future<ExecutedSurvey> _populate(ExecutedSurvey executedSurvey,
      {AppliedIntervention? appliedIntervention}) async {
    print("Populating executed Survey");
    print("applied Intervention (passed)");
    print(appliedIntervention.toString());
    print(appliedIntervention?.whoDidIt.toString());
    ExecutedSurvey toReturn = executedSurvey;
    toReturn.appliedIntervention = appliedIntervention ??
        await AppliedInterventionRepository.instance
                .appliedInterventionByExecutedSurvey(executedSurvey)
            as AppliedIntervention;
    //survey and who executed it probably missing due to missing ids

    return toReturn;
  }

  Future<List<ExecutedSurvey>> _populateList(
      List<ExecutedSurvey> executedSurveys,
      {AppliedIntervention? appliedIntervention}) {
    return Future.wait(List.generate(
        executedSurveys.length,
        (index) => _populate(executedSurveys[index],
            appliedIntervention: appliedIntervention)));
  }

  @override
  Future<ExecutedSurvey> saveExecutedSurvey(
      ExecutedSurvey executedSurvey) async {
    executedSurvey.id = executedSurvey.id ?? UUID.getUUID();

    db.create(executedSurvey);

    return executedSurvey;
  }

  @override
  SyncedFile getQuestionAnswerPic(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question) {
    String path = dataStorePath(DataStorePaths.questionPicAnswerPath,
        [appliedIntervention.id!, executedSurveyID, question.id!]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getQuestionAnswerAudio(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question) {
    String path = dataStorePath(DataStorePaths.questionAudioAnswerPath,
        [appliedIntervention.id!, executedSurveyID, question.id!]);
    return SyncedFile(path);
  }
}
