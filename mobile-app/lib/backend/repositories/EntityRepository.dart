import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Entity.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/repositories/implementations/amplify_datastore/EntityRepositoryAmplifyDataStore.dart'
    as implementation;
import 'package:mobile_app/models/ModelProvider.dart' as amp;

abstract class EntityRepository {
  static final EntityRepository instance =
      implementation.EntityRepositoryAmplifyDataStore.instance;

  Future<List<amp.Entity>> getAllAmpEntities();

  Future<List<Entity>> getAllEntities({int? page});

  Future<List<Entity>> getEntities(
      {int? page,
      bool byParentEntityID = false,
      String? parentEntityID,
      String? searchByName});

  Future<amp.Entity> ampEntityByID(String id);

  Future<String> createEntity(Entity entity);

  Future updateEntity(Entity entity);

  SyncedFile getEntityPic(Entity entity);

  SyncedFile getEntityPicByID(String entityId);
}
