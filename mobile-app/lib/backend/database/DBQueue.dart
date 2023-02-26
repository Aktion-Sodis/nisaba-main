import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBObject.dart';

class DBQueue {
  final DB localDB;

  DBQueue(this.localDB);

  Future<void> enqueue<G extends DBObject>(G object) {
    throw UnimplementedError();
  }

  Future<void> deqeue<G extends DBObject>(G object) {
    throw UnimplementedError();
  }
}
