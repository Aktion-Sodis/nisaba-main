import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'implementations/amplify_datastore/LevelRepositoryAmplifyDataStore.dart'
    as implementation;

abstract class LevelRepository {
  static final LevelRepository instance =
      implementation.LevelRepositoryAmplifyDataStore.instance;

  Future<List<amp.Level>> getAllAmpLevels();

  Future<List<Level>> getAllLevels();

  Future<amp.Level> getAmpLevelByID(String levelID);

  Future<List<amp.LevelInterventionRelation>> levelInterventionRelationsByLevel(
      amp.Level level);

  SyncedFile getLevelPicFile(Level level);

  SyncedFile getCustomDataPicFile(Level level, CustomData customData);
}
