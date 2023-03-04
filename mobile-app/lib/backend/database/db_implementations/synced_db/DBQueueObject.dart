import 'package:mobile_app/backend/database/DBModel.dart';

class DBQueueObject extends DBModel {
  @override
  String? id;

  @override
  bool isPopulated = false;

  @override
  int version = 0;

  DBAction action;
  String modelType;
  DBModel object;

  /// modelType: The type of the model that is being queued which can be get
  /// using [object.runtimeType.toString()] for an object [DBModel object].
  DBQueueObject(this.modelType, this.object, this.action, [this.id]) {
    if (object.id == null) {
      throw Exception('DBModel.id is null');
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

  @override
  DBModel getUnpopulated() {
    // Implementation unnecessary
    throw UnimplementedError();
  }
}

enum DBAction { CREATE, UPDATE, DELETE }
