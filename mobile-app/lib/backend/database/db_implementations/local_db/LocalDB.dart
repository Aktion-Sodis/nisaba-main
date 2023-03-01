import 'dart:io';

import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast_io.dart';
import 'package:sembast/sembast.dart';

class LocalDB extends DB {
  // late String dbPath;
  late final Database db;

  final DBModelCollection<LocalDBModelRegistration> _modelCollection =
      DBModelCollection();

  void registerModel(Type type, LocalDBModelRegistration registration) {
    _modelCollection.registerModel(type, registration);
  }

  String generateID() {
    return UUID.getUUID();
  }

  @override
  // creates specific store for g
  Future<void> create<G extends DBObject>(G object) async {
    object.id = generateID();
    var objectAsMap =
        _modelCollection.getRegisteredModel<G>().fromDBModel(object);

    var store = stringMapStoreFactory.store(object.runtimeType.toString());
    await store.record(object.id!).put(db, objectAsMap);
    return Future.value();
  }

  @override
  Future<void> delete<G extends DBObject>(G object) async {
    if (object.id == null) {
      throw "Object has no id. Cannot delete";
    }

    var store = stringMapStoreFactory.store(object.runtimeType.toString());
    await store.record(object.id!).delete(db);
    return Future.value();
  }

  @override
  Future<List<G>> get<G extends DBObject>(Query query) async {
    var store = stringMapStoreFactory.store(G.toString());

    var finder = _modelCollection
        .getRegisteredModel<G>()
        .queryPredicateTranslation(query);
    var snapshotList = await store.find(db, finder: finder);

    List<G> objectList = [];
    for (var snapshot in snapshotList) {
      G object = _modelCollection
          .getRegisteredModel<G>()
          .toDBModel(snapshot.value) as G;
      object.id = snapshot.key;
      objectList.add(object);
    }
    return Future.value(objectList);
  }

  @override
  Future<G?> getById<G extends DBObject>(String id) async {
    var store = stringMapStoreFactory.store(G.toString());
    var snapshot = await store.record(id).get(db);
    if (snapshot == null) {
      return Future.value(null);
    }
    G object =
        _modelCollection.getRegisteredModel<G>().toDBModel(snapshot) as G;
    object.id = id;
    return Future.value(object);
  }

  @override
  Future<void> update<G extends DBObject>(G object) async {
    if (object.id == null) {
      throw "Object has no id. Cannot update";
    }

    var objectAsMap =
        _modelCollection.getRegisteredModel<G>().fromDBModel(object);

    var store = stringMapStoreFactory.store(object.runtimeType.toString());
    await store.record(object.id!).put(db, objectAsMap);

    return Future.value();
  }

  Future<void> initLocalDB() async {
    Directory appDocDir = await getApplicationSupportDirectory();
    String dbPath = appDocDir.path + '/LocalDB.db';
    final DatabaseFactory dbFactory = databaseFactoryIo;
    db = await dbFactory.openDatabase(dbPath);
  }
}
