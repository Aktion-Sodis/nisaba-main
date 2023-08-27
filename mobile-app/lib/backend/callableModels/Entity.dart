import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/AppliedCustomData.dart';
import 'package:mobile_app/backend/callableModels/AppliedIntervention.dart';
import 'package:mobile_app/backend/callableModels/ExecutedSurvey.dart';
import 'package:mobile_app/backend/callableModels/Level.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'Entity.g.dart';
part 'Entity.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Entity extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Entity.fromJson(Map<String, dynamic> json) {Entity tr = _$EntityFromJson(json); tr.entityLevelId = tr.level.id; return tr;}

  Map<String, dynamic> toJson() => _$EntityToJson(this);

  static Map<String, dynamic> queryFields() => _$Entity;

  late I18nString name;
  late I18nString description;
  String? parentEntityID;

  late Level level;

  late String entityLevelId;

  Location? location;
  late List<AppliedCustomData> customData;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  List<AppliedIntervention> appliedInterventions = []; // Unpopulated allowed

  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayDescription => description.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayDescription(String description) =>
      this.description.text = description;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayName => name.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayName(String name) => this.name.text = name;

  Entity(
      {String? id,
      required this.name,
      required this.description,
      this.parentEntityID,
      required this.level,
      this.location,
      required this.customData,
      List<AppliedIntervention>? appliedInterventions,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt})
      : super(id) {
    if (appliedInterventions != null) {
      this.appliedInterventions = appliedInterventions;
    }
    entityLevelId = level.id;
  }

  List<ExecutedSurvey> executedSurveysDescending() {
    List<ExecutedSurvey> toSort = [];
    for (AppliedIntervention appliedIntervention in appliedInterventions) {
      toSort.addAll(appliedIntervention.executedSurveys);
    }
    toSort.sort((a, b) => b.date.difference(a.date).inHours);
    return toSort;
  }

  Entity.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Entity.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Entity &&
        other.id == id &&
        other.name == name &&
        other.description == description &&
        other.parentEntityID == parentEntityID &&
        other.level.id == level.id && // Unpopulated allowed
        other.location == location &&
        listEquals(other.customData, customData) &&
        other.schemeVersion == schemeVersion;
  }
}
