import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Entity.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart'
    as definition;
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class EntityRepositoryCustom extends definition.EntityRepository {
  final int batchSize = 15;

  @override
  static final EntityRepositoryCustom instance = EntityRepositoryCustom._();

  @override
  EntityRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<Entity>> getAllAmpEntities() async {
    //todo: check if necessary -> replicate of following function
    return db.get(Entity);
  }

  @override
  Future<List<Entity>> getAllEntities({int? page}) async {
    //todo: pagination
    return db.get(Entity);
  }

  @override
  Future<List<Entity>> getEntities(
      {int? page,
      bool byParentEntityID = false,
      String? parentEntityID,
      String? searchByName}) async {
    //todo: enhance by pagination
    List<Entity> toReturn = await db.get(
        Entity, Query(QPredicate.EQ, 'parentEntityID', parentEntityID));

    List<Entity> popluatedEntities =
        await _populateMultipleConnections(toReturn);

    return popluatedEntities;
  }

  @override
  Future<Entity> ampEntityByID(String id) async {
    Entity toReturn = await db.getById(Entity, id) as Entity;
    return _populateConnections(toReturn);
  }

  @override
  Future<Entity> _populateConnections(Entity entity) async {
    Entity toReturn = entity;

    //todo: gut möglich, dass hier level fehlen

    toReturn.appliedInterventions = await AppliedInterventionRepository.instance
        .getAmpAppliedInterventionsByEntityID(toReturn.id);

    return toReturn;
  }

  @override
  Future<List<Entity>> _populateMultipleConnections(List<Entity> entities) {
    List<Future<Entity>> populateFutures = List.generate(
        entities.length, (index) => _populateConnections(entities[index]));
    return Future.wait(populateFutures);
  }

  @override
  Future<String> createEntity(Entity entity) async {
    // TODO: Check if entity already exists. Maybe, generating a new ID is not necessary.
    String id = UUID.getUUID();
    entity.id = entity.id ?? id;
    db.create(entity);
    return entity.id!;
  }

  @override
  Future updateEntity(Entity entity) async {
    db.update(entity);
  }

  @override
  SyncedFile getEntityPic(Entity entity) {
    String path = dataStorePath(DataStorePaths.entityPicPath, [entity.id!]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getEntityPicByID(String entityId) {
    String path = dataStorePath(DataStorePaths.entityPicPath, [entityId]);
    return SyncedFile(path);
  }
}
