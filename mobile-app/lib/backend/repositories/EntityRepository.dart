import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Entity.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/EntityRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

abstract class EntityRepository {
  static final EntityRepository instance = EntityRepositoryCustom.instance;

  Future<List<Entity>> getAllAmpEntities();

  Future<List<Entity>> getAllEntities({int? page});

  Future<List<Entity>> getEntities(
      {int? page,
      bool byParentEntityID = false,
      String? parentEntityID,
      String? searchByName});

  Future<Entity> ampEntityByID(String id);

  Future<String> createEntity(Entity entity);

  Future updateEntity(Entity entity);

  SyncedFile getEntityPic(Entity entity);

  SyncedFile getEntityPicByID(String entityId);
}
