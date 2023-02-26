import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/Synchronizer.dart';
import 'package:mobile_app/backend/database/db_implementations/RemoteDB.dart';
import '../DB.dart';
import '../DBQueue.dart';
import 'LocalDB.dart';

class SyncedDB extends DB {
  final DB localDB;
  final DB remoteDB;
  late final DBQueue queue;
  late final Synchronizer synchronizer;

  SyncedDB._(this.localDB, this.remoteDB) {
    queue = DBQueue(localDB);
    synchronizer = Synchronizer(localDB, remoteDB, queue);
  }

  static final SyncedDB instance = SyncedDB._(LocalDB(), RemoteDB());

  @override
  Future<void> create(DBObject object) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<void> delete(DBObject object) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<List<DBObject>> get(Query query) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<void> update(DBObject object) {
    // TODO: implement update
    throw UnimplementedError();
  }

  @override
  Future<DBObject> getById(String id) {
    // TODO: implement getById
    throw UnimplementedError();
  }
}
