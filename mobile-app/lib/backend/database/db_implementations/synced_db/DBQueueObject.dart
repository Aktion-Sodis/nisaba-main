import 'package:json_annotation/json_annotation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

part 'DBQueueObject.g.dart';

@JsonSerializable()
class DBQueueObject extends DBModel {
  DBAction action;

  // TODO: Use Type instead of String
  String modelType;

  @DBModelConverter.instance
  DBModel object;

  /// modelType: The type of the model that is being queued which can be get
  /// using [object.runtimeType.toString()] for an object [DBModel object].
  DBQueueObject(this.modelType, this.object, this.action, [String? id])
      : super(id) {
    this.id = id ?? this.id;
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

  @override
  Map<String, dynamic> toJson() => _$DBQueueObjectToJson(this);

  factory DBQueueObject.fromJson(Map<String, dynamic> json) =>
      _$DBQueueObjectFromJson(json);
}

enum DBAction { CREATE, UPDATE, DELETE }
