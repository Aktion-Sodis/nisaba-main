import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/repositories/implementations/amplify_datastore/InterventionRepositoryAmplifyDataStore.dart'
    as implementation;

abstract class InterventionRepository {
  static final InterventionRepository instance =
      implementation.InterventionRepositoryAmplifyDataStore.instance;

  Future<List<amp.Intervention>> getAllAmpIntervention();

  Future<amp.Intervention> getAmpInterventionByID(String interventionID);

  Future<List<Intervention>> getInterventionsByLevelConnections(
      List<amp.LevelInterventionRelation> relations);

  Future<amp.Intervention?> getAmplifyInterventionBySurvey(amp.Survey survey);

  Future<List<amp.Intervention>> populateList(
      List<amp.Intervention> interventions);

  Future<amp.Intervention> populate(amp.Intervention intervention);

  Future<List<amp.InterventionContentRelation>>
      interventionContentRelationsByInterventionID(
          amp.Intervention intervention);

  Future<List<amp.InterventionInterventionTagRelation>>
      interventionInterventionTagRelationsByInterventionID(
          amp.Intervention intervention);

  Future<List<amp.LevelInterventionRelation>>
      levelInterventionRelationsByInterventionID(amp.Intervention intervention);

  SyncedFile getInterventionPic(Intervention intervention);
}
