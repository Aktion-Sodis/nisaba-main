import 'dart:io';

import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast_io.dart';
import '../DB.dart';
import 'package:sembast/sembast.dart';

class LocalDB extends DB {
  // late String dbPath;
  late final Database db;

  @override
  // creates specific store for g
  Future<void> create<G extends DBObject>(G object) async {
    var store = intMapStoreFactory.store(object.runtimeType.toString());
    await store.add(db, object.toMap());
    return Future.value();
  }

  @override
  Future<void> delete<G extends DBObject>(G object) async {
    var store = intMapStoreFactory.store(object.runtimeType.toString());
    await store.delete(db);
    return Future.value();
  }

  @override
  Future<List<G>> get<G extends DBObject>(Query query) {
    var store = intMapStoreFactory.store(G.toString());
    Future<List<G>> finder = getQuery(query, store);
    return finder;
  }

  @override
  Future<G> getById<G extends DBObject>(String id) async {
    var store = intMapStoreFactory.store(G.toString());
    var snapshotList =
        await store.find(db, finder: Finder(filter: Filter.byKey(id)));
    return snapshotList[0].value as G;
  }

  @override
  Future<void> update<G extends DBObject>(G object) async {
    await delete(object);
    await create(object);
    return Future.value();
  }

  Future<void> initLocalDB() async {
    Directory appDocDir = await getApplicationSupportDirectory();
    String dbPath = appDocDir.path + '/LocalDB.db';
    final DatabaseFactory dbFactory = databaseFactoryIo;
    db = await dbFactory.openDatabase(dbPath);
  }

  Future<List<G>> getQuery<G extends DBObject>(
      Query query, StoreRef<int, Map<String, Object?>> store) async {
    var finder;
    switch (query.predicate) {
      case QPredicate.EQ:
        finder = await store.find(db,
            finder: Finder(filter: Filter.equals(Field.value, query.attr1)));
        break;
      case QPredicate.GE:
        finder = await store.find(db,
            finder: Finder(
                filter: Filter.greaterThanOrEquals(Field.value, query.attr1)));
        break;
      case QPredicate.GT:
        finder = await store.find(db,
            finder:
                Finder(filter: Filter.greaterThan(Field.value, query.attr1)));
        break;
      case QPredicate.LE:
        finder = await store.find(db,
            finder: Finder(
                filter: Filter.lessThanOrEquals(Field.value, query.attr1)));
        break;
      case QPredicate.LT:
        finder = await store.find(db,
            finder: Finder(filter: Filter.lessThan(Field.value, query.attr1)));
        break;
      case QPredicate.NE:
        finder = await store.find(db,
            finder: Finder(filter: Filter.notEquals(Field.value, query.attr1)));
        break;
      case QPredicate.BETWEEN:
        throw UnimplementedError();
      case QPredicate.CONTAINS:
        throw UnimplementedError();
    }
    return finder;
  }
}
