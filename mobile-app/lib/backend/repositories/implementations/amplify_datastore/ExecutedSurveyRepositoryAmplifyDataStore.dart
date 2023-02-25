import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart'
    as definition;
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class ExecutedSurveyRepositoryAmplifyDataStore
    extends definition.ExecutedSurveyRepository {
  static final ExecutedSurveyRepositoryAmplifyDataStore instance =
      ExecutedSurveyRepositoryAmplifyDataStore._();

  ExecutedSurveyRepositoryAmplifyDataStore._();

  Future<List<amp.ExecutedSurvey>> getAllAmpExecutedSurveys() async {
    var results = Amplify.DataStore.query(
      amp.ExecutedSurvey.classType,
    );
    return results;
  }

  Future<ExecutedSurvey> executedSurveyByID(String executedSurveyID) async {
    amp.ExecutedSurvey executedSurvey =
        await ampExecutedSurveyByID(executedSurveyID);
    return ExecutedSurvey.fromAmplifyModel(executedSurvey);
  }

  Future<amp.ExecutedSurvey> ampExecutedSurveyByID(
      String executedSurveyID) async {
    var results = await Amplify.DataStore.query(amp.ExecutedSurvey.classType,
        where: amp.ExecutedSurvey.ID.eq(executedSurveyID));
    return _populate(results.first);
  }

  Future<List<amp.ExecutedSurvey>> executedSurveysByAppliedIntervention(
      amp.AppliedIntervention appliedIntervention) async {
    print("executed survey by applied intervention");
    print("applied intervention: ");
    print(appliedIntervention.whoDidIt.toString());
    List<amp.ExecutedSurvey> toReturn = await Amplify.DataStore.query(
        amp.ExecutedSurvey.classType,
        where:
            amp.ExecutedSurvey.APPLIEDINTERVENTION.eq(appliedIntervention.id));
    return _populateList(toReturn, appliedIntervention: appliedIntervention);
  }

  Future<amp.ExecutedSurvey> _populate(amp.ExecutedSurvey executedSurvey,
      {amp.AppliedIntervention? appliedIntervention}) async {
    print("Populating executed Survey");
    print("applied Intervention (passed)");
    print(appliedIntervention.toString());
    print(appliedIntervention?.whoDidIt.toString());
    amp.ExecutedSurvey toReturn = executedSurvey.copyWith(
        appliedIntervention: appliedIntervention ??
            await AppliedInterventionRepository.instance
                .appliedInterventionByExecutedSurvey(executedSurvey),
        whoExecutedIt: await UserRepository.getAmpUserByID(
            executedSurvey.executedSurveyWhoExecutedItId),
        survey: await SurveyRepository.getAmpSurveyByID(
            executedSurvey.executedSurveySurveyId));
    return toReturn;
  }

  Future<List<amp.ExecutedSurvey>> _populateList(
      List<amp.ExecutedSurvey> executedSurveys,
      {amp.AppliedIntervention? appliedIntervention}) {
    return Future.wait(List.generate(
        executedSurveys.length,
        (index) => _populate(executedSurveys[index],
            appliedIntervention: appliedIntervention)));
  }

  Future<ExecutedSurvey> saveExecutedSurvey(
      ExecutedSurvey executedSurvey) async {
    executedSurvey.id = executedSurvey.id ?? UUID.getUUID();
    print("now chaning executed survey to amp model");
    amp.ExecutedSurvey toSave = executedSurvey.toAmplifyModel();
    //todo: testen ob applied intervention auch gespeichert werden muss
    Amplify.DataStore.save(toSave);
    return executedSurvey;
  }

  SyncedFile getQuestionAnswerPic(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question) {
    String path = dataStorePath(DataStorePaths.questionPicAnswerPath,
        [appliedIntervention.id!, executedSurveyID, question.id!]);
    return SyncedFile(path);
  }

  SyncedFile getQuestionAnswerAudio(AppliedIntervention appliedIntervention,
      String executedSurveyID, Question question) {
    String path = dataStorePath(DataStorePaths.questionAudioAnswerPath,
        [appliedIntervention.id!, executedSurveyID, question.id!]);
    return SyncedFile(path);
  }
}
