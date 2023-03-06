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

@JsonSerializable()
class Entity extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Entity.fromJson(Map<String, dynamic> json) => _$EntityFromJson(json);

  Map<String, dynamic> toJson() => _$EntityToJson(this);

  String? id;
  late I18nString name_ml;
  late I18nString description_ml;
  String? parentEntityID;
  late Level level; // Unpopulated allowed
  Location? location;
  late List<AppliedCustomData> customData;
  late List<AppliedIntervention> appliedInterventions; // Unpopulated allowed
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  Entity(
      {this.id,
      required this.name_ml,
      required this.description_ml,
      this.parentEntityID,
      required this.level,
      this.location,
      required this.customData,
      required this.appliedInterventions,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Entity.fromAmplifyModel(amp.Entity entity) {
    id = entity.id;
    name_ml = I18nString.fromAmplifyModel(entity.name);
    description_ml = I18nString.fromAmplifyModel(entity.description);
    parentEntityID = entity.parentEntityID;
    level = Level.fromAmplifyModel(entity.level);
    location = entity.location == null
        ? null
        : Location.fromAmplifyModel(entity.location!);
    customData = List.generate(
        entity.customData.length,
        (index) =>
            AppliedCustomData.fromAmplifyModel(entity.customData[index]));
    appliedInterventions = List.generate(
        entity.appliedInterventions.length,
        (index) => AppliedIntervention.fromAmplifyModel(
            entity.appliedInterventions[index])); // unpopulated allowed
    schemeVersion = entity.schemeVersion;
    createdAt = entity.createdAt?.getDateTimeInUtc();
    updatedAt = entity.updatedAt?.getDateTimeInUtc();
  }

  amp.Entity toAmplifyModel() {
    return (amp.Entity(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        parentEntityID: parentEntityID,
        level: level.toAmplifyModel(),
        location: location?.toAmplifyModel(),
        customData: List.generate(
            customData.length, (index) => customData[index].toAmplifyModel()),
        appliedInterventions: List.generate(appliedInterventions.length,
            (index) => appliedInterventions[index].toAmplifyModel()),
        schemeVersion: schemeVersion,
        entityLevelId: level.id!));
  }

  List<ExecutedSurvey> executedSurveysDescending() {
    List<ExecutedSurvey> toSort = [];
    for (AppliedIntervention appliedIntervention in appliedInterventions) {
      toSort.addAll(appliedIntervention.executedSurveys);
    }
    toSort.sort((a, b) => b.date.difference(a.date).inHours);
    return toSort;
  }

  Entity.unpopulated(this.id) {
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
        other.name_ml == name_ml &&
        other.description_ml == description_ml &&
        other.parentEntityID == parentEntityID &&
        other.level.id == level.id && // Unpopulated allowed
        other.location == location &&
        listEquals(other.customData, customData) &&
        other.schemeVersion == schemeVersion;
  }
}
