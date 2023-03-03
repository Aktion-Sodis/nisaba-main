import 'package:mobile_app/backend/database/DBModelCollection.dart';

import 'DBModelRegistration.dart';
import 'DBModel.dart';
import 'Query.dart';

abstract class DB<R extends DBModelRegistration> {
  /// DB actions

  Future<void> create(DBModel object);

  Future<void> update(DBModel object);

  Future<void> delete(DBModel object);

  Future<List<G>> get<G extends DBModel>(Type modelType, [Query? query]);

  Future<G?> getById<G extends DBModel>(Type modelType, String id);

  // TODO: test this for LocalDB, SyncedDB and RemoteDB
  Future<void> clear() async {
    List<Type> types = getRegisteredModelTypes();
    for (Type type in types) {
      List<DBModel> objects = await get(type);
      for (DBModel object in objects) {
        await delete(object);
      }
    }
  }

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
