import 'dart:io';

import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast_io.dart';
import 'package:sembast/sembast.dart';

class LocalDB extends DB<LocalDBModelRegistration> {
  // late String dbPath;
  late final Database db;
  bool _isInitialized = false;

  String generateID() {
    return UUID.getUUID();
  }

  @override
  // creates specific store for g
  Future<void> create(DBModel object) async {
    Type modelType = object.runtimeType;
    object.id = object.id ?? generateID();
    var objectAsMap = getRegisteredModel(modelType).fromDBModel(object);

    var store = stringMapStoreFactory.store(object.runtimeType.toString());
    await store.record(object.id!).put(db, objectAsMap!);
    return Future.value();
  }

  @override
  Future<void> delete(DBModel object) async {
    Type modelType = object.runtimeType;
    if (object.id == null) {
      throw "Object has no id. Cannot delete";
    }

    var store = stringMapStoreFactory.store(modelType.toString());
    await store.record(object.id!).delete(db);
    object.id = null;
    return Future.value();
  }

  @override
  Future<List<G>> get<G extends DBModel>(Type modelType, [Query? query]) async {
    var store = stringMapStoreFactory.store(modelType.toString());

    Finder? finder;
    if (query != null) {
      finder = getRegisteredModel(modelType).queryPredicateTranslation(query);
    }
    var snapshotList = await store.find(db, finder: finder);

    List<DBModel> objectList = [];
    for (var snapshot in snapshotList) {
      DBModel object = getRegisteredModel(modelType).toDBModel(snapshot.value)!;
      object.id = snapshot.key;
      objectList.add(object);
    }
    return Future.value(objectList.map((e) => e as G).toList());
  }

  @override
  Future<G?> getById<G extends DBModel>(Type modelType, String id) async {
    var store = stringMapStoreFactory.store(modelType.toString());
    var snapshot = await store.record(id).get(db);
    if (snapshot == null) {
      return Future.value(null);
    }
    DBModel object = getRegisteredModel(modelType).toDBModel(snapshot)!;
    object.id = id;
    return Future.value(object as G);
  }

  @override
  Future<void> update(DBModel object) async {
    Type modelType = object.runtimeType;

    if (object.id == null) {
      throw "Object has no id. Cannot update";
    }

    var objectAsMap = getRegisteredModel(modelType).fromDBModel(object);

    var store = stringMapStoreFactory.store(object.runtimeType.toString());
    await store.record(object.id!).put(db, objectAsMap!);

    return Future.value();
  }

  Future<void> initLocalDB([String dbName = "LocalDB"]) async {
    if (_isInitialized) {
      return;
    }

    Directory appDocDir = await getApplicationSupportDirectory();
    String dbPath = appDocDir.path + '/$dbName.db';
    final DatabaseFactory dbFactory = databaseFactoryIo;
    db = await dbFactory.openDatabase(dbPath);
    _isInitialized = true;
  }

  Future<void> closeDB() async {
    await db.close();
  }
}
