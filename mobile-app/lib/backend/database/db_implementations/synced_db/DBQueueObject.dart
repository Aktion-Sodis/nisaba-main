import 'package:mobile_app/backend/database/DBObject.dart';

class DBQueueObject implements DBObject {
  @override
  String? id;

  @override
  bool isPopulated = false;

  @override
  int version = 0;

  DBAction action;
  String modelType;
  DBObject object;

  /// modelType: The type of the model that is being queued which can be get
  /// using [object.runtimeType.toString()] for an object [DBObject object].
  DBQueueObject(this.modelType, this.object, this.action, [this.id]) {
    if (object.id == null) {
      throw Exception('DBObject.id is null');
    }
  }

  static dbActionFromString(String action) {
    switch (action) {
      case 'CREATE':
        return DBAction.CREATE;
      case 'UPDATE':
        return DBAction.UPDATE;
      case 'DELETE':
        return DBAction.DELETE;
      default:
        throw Exception('Invalid DBAction');
    }
  }

  @override
  bool deleted = false;
}

enum DBAction { CREATE, UPDATE, DELETE }
