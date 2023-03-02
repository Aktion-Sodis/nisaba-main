import 'package:mobile_app/backend/database/DBModelCollection.dart';

import 'DBModelRegistration.dart';
import 'DBObject.dart';
import 'Query.dart';

abstract class DB<R extends DBModelRegistration> {
  /// DB actions

  Future<void> create(DBObject object);

  Future<void> update(DBObject object);

  Future<void> delete(DBObject object);

  Future<List<G>> get<G extends DBObject>(Type modelType, [Query? query]);

  Future<G?> getById<G extends DBObject>(Type modelType, String id);

  /// Model registration
  final DBModelCollection<R> _modelCollection = DBModelCollection();

  void registerModel(Type type, R registration) {
    _modelCollection.registerModel(type, registration);
  }

  R getRegisteredModel(Type type) {
    return _modelCollection.getRegisteredModel(type);
  }

  List<Type> getRegisteredModelTypes() {
    return _modelCollection.getRegisteredModelTypes();
  }
}
