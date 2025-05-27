import 'package:mobile_app/backend/callableModels/Entity.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/EntityRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';

abstract class EntityRepository {
  static final EntityRepository instance = EntityRepositoryCustom.instance;

  Future<List<Entity>> getAllAmpEntities();

  Future<List<Entity>> getAllEntities({int? page});

  Future<List<Entity>> getAllEntitiesInclAppliedInterventionsAndExecutedSurveys();

  Future<List<Entity>> getEntities(
      {int? page,
      bool byParentEntityID = false,
      String? parentEntityID,
      String? searchByName});

  Future<Entity> ampEntityByID(String id);

  Future<List<Entity>> populateWithAppliedInterventionsAndExecutedSurveys(
      List<Entity> entities);

  Future<String> createEntity(Entity entity);

  Future updateEntity(Entity entity);

  SyncedFile getEntityPic(Entity entity);

  SyncedFile getEntityPicByID(String entityId);
}
