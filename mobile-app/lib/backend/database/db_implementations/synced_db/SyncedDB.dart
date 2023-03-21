import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQLDB.dart';
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
  final Set<Type> _modelsToSyncDownstream = {};
  final List<Type> registeredModelTypes = [];
  late final DBQueue queue;
  late final Synchronizer synchronizer;

  bool syncUpstreamAutomatically = true;

  SyncedDB(this.localDB, this.remoteDB) {
    queue = DBQueue(localDB);
    synchronizer = Synchronizer(localDB, remoteDB, queue,
        _modelsToSyncDownstream, registeredModelTypes);
    _registerQueueObject();
  }

  @override
  void registerModel(Type type, SyncedDBModelRegistration registration) {
    super.registerModel(type, registration);
    localDB.registerModel(type, registration.localDBModelRegistration);
    remoteDB.registerModel(type, registration.remoteDBModelRegistration);
    if (registration.haveToSyncDownstream) {
      _modelsToSyncDownstream.add(type);
    }
    registeredModelTypes.add(type);
  }

  static final SyncedDB instance = SyncedDB(LocalDB(), GraphQLDB());

  Type _getRegisteredTypeByString(String typeString) {
    for (Type type in registeredModelTypes) {
      if (type.toString() == typeString) {
        return type;
      }
    }
    throw Exception('Type $typeString not registered');
  }

  void _registerQueueObject() {
    localDB.registerModel(DBQueueObject,
        LocalDBModelRegistration(toDBModel: _jsonToDBQueueObject));
  }

  DBQueueObject _jsonToDBQueueObject(Map<String, Object?> json) {
    String modelName = json["modelType"] as String;
    DBModelRegistration modelRegistration =
        localDB.getRegisteredModelByName(modelName);
    DBModel object = modelRegistration.toDBModel(json["object"])!;
    DBAction action =
        DBQueueObject.dbActionFromString(json['action'] as String);
    String id = json["id"] as String;

    DBQueueObject queueObject = DBQueueObject(modelName, object, action, id);
    return queueObject;
  }

  @override
  Future<void> create(DBModel object) async {
    await localDB.create(object);
    await queue.enqueue(object, DBAction.CREATE);

    if (syncUpstreamAutomatically) {
      synchronizer.syncUpstream();
    }
  }

  @override
  Future<void> delete(DBModel object) async {
    await queue.enqueue(object, DBAction.DELETE);
    await localDB.delete(object);

    if (syncUpstreamAutomatically) {
      synchronizer.syncUpstream();
    }
  }

  @override
  Future<void> update(DBModel object) async {
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
  Future<G?> getById<G extends DBModel>(Type type, String id) {
    var registeredModel = getRegisteredModel(type);
    if (!registeredModel.haveToSyncDownstream) {
      throw "The model $type is not registered to be accessed by query";
    }

    return localDB.getById(type, id);
  }

  @override
  Future<List<G>> get<G extends DBModel>(Type type, [Query? query]) {
    var registeredModel = getRegisteredModel(type);
    if (!registeredModel.haveToSyncDownstream) {
      throw "The model $type is not registered to be accessed by query";
    }

    return localDB.get(type, query);
  }
}
