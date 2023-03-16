import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../callableModels/Relation.dart';
import '../callableModels/Survey.dart';

abstract class InterventionRepository {
  static final InterventionRepository instance =
      InterventionRepository.instance;

  Future<List<Intervention>> getAllAmpIntervention();

  Future<Intervention> getAmpInterventionByID(String interventionID);

  Future<List<Intervention>> getInterventionsByLevelConnections(
      List<LevelInterventionRelation> relations);

  Future<Intervention?> getAmplifyInterventionBySurvey(Survey survey);

  Future<List<Intervention>> populateList(List<Intervention> interventions);

  Future<Intervention> populate(Intervention intervention);

  Future<List<InterventionContentRelation>>
      interventionContentRelationsByInterventionID(Intervention intervention);

  Future<List<InterventionInterventionTagRelation>>
      interventionInterventionTagRelationsByInterventionID(
          Intervention intervention);

  Future<List<LevelInterventionRelation>>
      levelInterventionRelationsByInterventionID(Intervention intervention);

  SyncedFile getInterventionPic(Intervention intervention);

  Future<Intervention> populatedInterventionFromContent(String id);
}
