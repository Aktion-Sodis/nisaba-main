import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/LevelRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import '../callableModels/Relation.dart';

abstract class LevelRepository {
  static final LevelRepository instance = LevelRepositoryCustom.instance;

  Future<List<Level>> getAllAmpLevels();

  Future<List<Level>> getAllLevels();

  Future<Level> getAmpLevelByID(String levelID);

  Future<List<LevelInterventionRelation>> levelInterventionRelationsByLevel(
      Level level);

  SyncedFile getLevelPicFile(Level level);

  SyncedFile getCustomDataPicFile(Level level, CustomData customData);
}
