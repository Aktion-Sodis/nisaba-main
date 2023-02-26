import 'DBObject.dart';
import 'Query.dart';

abstract class DB<G extends DBObject> {
  Future<void> create(G object);

  Future<void> update(G object);

  Future<void> delete(G object);

  Future<List<G>> get(Query query);

  Future<G> getById(String id);
}
