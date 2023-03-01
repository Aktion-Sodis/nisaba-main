import 'DBObject.dart';
import 'Query.dart';

abstract class DB {
  Future<void> create<G extends DBObject>(G object);

  Future<void> update<G extends DBObject>(G object);

  Future<void> delete<G extends DBObject>(G object);

  Future<List<G>> get<G extends DBObject>([Query? query]);

  Future<G?> getById<G extends DBObject>(String id);
}
