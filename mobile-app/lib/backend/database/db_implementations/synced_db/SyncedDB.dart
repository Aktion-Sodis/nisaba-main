import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueueObject.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/Synchronizer.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDB.dart';
import '../../DB.dart';
import 'DBQueue.dart';
import '../local_db/LocalDB.dart';

List<Type> _modelsToSyncDownstream = [];

class SyncedDB extends DB<SyncedDBModelRegistration> {
  final LocalDB localDB;
  final DB remoteDB;
  final List<Type> modelsToSyncDownstream;
  final List<Type> registeredModelTypes = [];
  late final DBQueue queue;
  late final Synchronizer synchronizer;

  bool syncUpstreamAutomatically = true;

  SyncedDB(this.localDB, this.remoteDB, this.modelsToSyncDownstream) {
    queue = DBQueue(localDB);
    synchronizer = Synchronizer(
        localDB, remoteDB, queue, modelsToSyncDownstream, registeredModelTypes);
    _registerQueueObject();
  }

  @override
  void registerModel(Type type, SyncedDBModelRegistration registration) {
    super.registerModel(type, registration);
    localDB.registerModel(type, registration.localDBModelRegistration);
    remoteDB.registerModel(type, registration.remoteDBModelRegistration);
    registeredModelTypes.add(type);
  }

  static final SyncedDB instance =
      SyncedDB(LocalDB(), RemoteDB(), _modelsToSyncDownstream);

  Type _getRegisteredTypeByString(String typeString) {
    for (Type type in registeredModelTypes) {
      if (type.toString() == typeString) {
        return type;
      }
    }
    throw Exception('Type $typeString not registered');
  }

  void _registerQueueObject() {
    localDB.registerModel(
        DBQueueObject,
        LocalDBModelRegistration(fromDBModel: (model) {
          DBQueueObject queueObject = model as DBQueueObject;

          DBObject object = queueObject.object;
          Map<String, Object?> objectMap = localDB
              .getRegisteredModel(object.runtimeType)
              .fromDBModel(object);

          return {
            'modelType': queueObject.modelType,
            'id': queueObject.id,
            'object': objectMap,
            'action': queueObject.action.toString().split('.').last
          };
        }, toDBModel: (map) {
          String modelTypeAsString = map['modelType'] as String;
          Type modelType = _getRegisteredTypeByString(modelTypeAsString);
          DBObject dbObject = localDB
              .getRegisteredModel(modelType)
              .toDBModel(map['object'] as Map<String, dynamic>);

          return DBQueueObject(
              map['modelType'] as String,
              dbObject,
              DBQueueObject.dbActionFromString(map['action'] as String),
              map['id'] as String?);
        }));
  }

  @override
  Future<void> create(DBObject object) async {
    await localDB.create(object);
    await queue.enqueue(object, DBAction.CREATE);

    if (syncUpstreamAutomatically) {
      synchronizer.syncUpstream();
    }
  }

  @override
  Future<void> delete(DBObject object) async {
    await queue.enqueue(object, DBAction.DELETE);
    await localDB.delete(object);

    if (syncUpstreamAutomatically) {
      synchronizer.syncUpstream();
    }
  }

  @override
  Future<void> update(DBObject object) async {
    await localDB.update(object);
    await queue.enqueue(object, DBAction.UPDATE);

    if (syncUpstreamAutomatically) {
      synchronizer.syncUpstream();
    }
  }

  @override
  Future<void> clear() async {
    await localDB.clear();
    await queue.clear();
  }

  @override
  Future<G?> getById<G extends DBObject>(Type type, String id) {
    return localDB.getById(type, id);
  }

  @override
  Future<List<G>> get<G extends DBObject>(Type type, [Query? query]) {
    return localDB.get(type, query);
  }
}
