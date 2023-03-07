import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../../../callableModels/Relation.dart';

class LevelRepositoryCustom extends LevelRepository {
  static final LevelRepositoryCustom instance = LevelRepositoryCustom._();
  LevelRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<Level>> getAllAmpLevels() async {
    db.get(Level);
  }

  @override
  Future<List<Level>> getAllLevels() async {
    List<Level> levels = await getAllAmpLevels();

    List<Level> populated =
        await Future.wait(levels.map((e) => _populate(e)).toList());
    List<Level> toOrder = populated;

    // Sort in the ascending order
    List<Level> result = [];
    int rootIndex =
        toOrder.indexWhere((element) => element.parentLevelID == null);
    result.add(toOrder[rootIndex]);
    toOrder.removeAt(rootIndex);

    while (toOrder.isNotEmpty) {
      int childIndex = toOrder
          .indexWhere((element) => element.parentLevelID == result.last.id);
      result.add(toOrder[childIndex]);
      toOrder.removeAt(childIndex);
    }

    return Future.value(result);
  }

  @override
  Future<Level> getAmpLevelByID(String levelID) async {
    Level level = await db.getById(Level, levelID) as Level;

    return _populate(level);
  }

  Future<Level> _populate(Level level) async {
    Level toReturn = level;
    toReturn.allowedInterventions =
        await levelInterventionRelationsByLevel(level);
    return toReturn;
  }

  @override
  Future<List<LevelInterventionRelation>> levelInterventionRelationsByLevel(
      Level level) async {
    return db.get(
        LevelInterventionRelation, Query(QPredicate.EQ, 'levelId', level.id));
  }

  Future<List<Intervention>> interventionsFromUnpopulatedLIRelations(
      List<LevelInterventionRelation> relations) async {
    List<Intervention> toWait = await Future.wait(List.generate(
        relations.length,
        (index) => InterventionRepository.instance
            .getAmpInterventionByID(relations[index].secondID)));
    return toWait;
  }

  @override
  SyncedFile getLevelPicFile(Level level) {
    String path = dataStorePath(DataStorePaths.levelPicPath, [level.id!]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getCustomDataPicFile(Level level, CustomData customData) {
    String path = dataStorePath(
        DataStorePaths.levelCustomDataPicPath, [level.id!, customData.id!]);
    return SyncedFile(path);
  }
}
