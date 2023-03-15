import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/CustomData.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'Level.g.dart';
part 'Level.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Level extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Level.fromJson(Map<String, dynamic> json) => _$LevelFromJson(json);

  Map<String, dynamic> toJson() => _$LevelToJson(this);

  static Map<String, dynamic> queryFields() => _$Level;

  late I18nString name;

  late I18nString description;
  String? parentLevelID;
  late bool interventionsAreAllowed;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  List<LevelInterventionRelation>? allowedInterventions =
      []; // Unpopulated allowed
  late List<CustomData> customData; // Unpopulated allowed
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayName => name.text;

  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayName(String name) => this.name.text = name;

  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayDescription => description.text;

  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayDescription(String description) =>
      this.description.text = description;

  Level(
      {String? id,
      required this.name,
      required this.description,
      this.parentLevelID,
      required this.interventionsAreAllowed,
      required this.customData,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt})
      : super(id);

  Level.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Level.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Level) {
      return name == other.name &&
          description == other.description &&
          parentLevelID == other.parentLevelID &&
          interventionsAreAllowed == other.interventionsAreAllowed &&
          schemeVersion == other.schemeVersion &&
          id == other.id;
    }
    return false;
  }
}
