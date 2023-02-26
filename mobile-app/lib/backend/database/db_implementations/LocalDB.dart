import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/Query.dart';

import '../DB.dart';

class LocalDB<G extends DBObject> extends DB {
  @override
  Future<void> create<G extends DBObject>(G object) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<void> delete<G extends DBObject>(G object) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<List<G>> get<G extends DBObject>(Query query) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<G> getById<G extends DBObject>(String id) {
    // TODO: implement getById
    throw UnimplementedError();
  }

  @override
  Future<void> update<G extends DBObject>(G object) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
