import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class InterventionRepository {
  static Future<amp.Intervention> getAmpInterventionByID(
      String interventionID) async {
    var interventions = await Amplify.DataStore.query(
        amp.Intervention.classType,
        where: amp.Intervention.ID.eq(interventionID));
    amp.Intervention toReturn = interventions.first;
    return _populate(toReturn);
  }

  static Future<amp.Intervention?> getAmplifyInterventionBySurvey(
      amp.Survey survey) async {
    /*var interventions = await Amplify.DataStore.query(
        amp.Intervention.classType,
        where: amp.Intervention;*/
    return null;
    //return _populate(interventions.first);
    //todo: query könnte falsch sein
  }

  static Future<amp.Intervention> _populate(
      amp.Intervention intervention) async {
    amp.Intervention toReturn = intervention;
    toReturn = toReturn.copyWith(
        contents:
            await interventionContentRelationsByInterventionID(intervention),
        tags: await interventionInterventionTagRelationsByInterventionID(
            intervention),
        levels: await levelInterventionRelationsByInterventionID(intervention),
        surveys:
            await SurveyRepository.getAmpSurveysByIntervention(intervention));
    return toReturn;
  }

  static Future<List<amp.InterventionContentRelation>>
      interventionContentRelationsByInterventionID(
          amp.Intervention intervention) async {
    return Amplify.DataStore.query(amp.InterventionContentRelation.classType,
        where:
            amp.InterventionContentRelation.INTERVENTION.eq(intervention.id));
  }

  static Future<List<amp.InterventionInterventionTagRelation>>
      interventionInterventionTagRelationsByInterventionID(
          amp.Intervention intervention) async {
    return Amplify.DataStore.query(
        amp.InterventionInterventionTagRelation.classType,
        where: amp.InterventionInterventionTagRelation.INTERVENTION
            .eq(intervention.id));
  }

  static Future<List<amp.LevelInterventionRelation>>
      levelInterventionRelationsByInterventionID(
          amp.Intervention intervention) async {
    return Amplify.DataStore.query(amp.LevelInterventionRelation.classType,
        where: amp.LevelInterventionRelation.INTERVENTION.eq(intervention.id));
  }
}
