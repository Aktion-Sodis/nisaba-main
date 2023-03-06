import 'package:mobile_app/backend/callableModels/CustomData.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'Level.g.dart';

@JsonSerializable()
class Level extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Level.fromJson(Map<String, dynamic> json) => _$LevelFromJson(json);

  Map<String, dynamic> toJson() => _$LevelToJson(this);

  String? id;
  late I18nString name_ml;
  late I18nString description_ml;
  String? parentLevelID;
  late bool interventionsAreAllowed;
  List<LevelInterventionRelation>? allowedInterventions; // Unpopulated allowed
  late List<CustomData> customData; // Unpopulated allowed
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  Level(
      {this.id,
      required this.name_ml,
      required this.description_ml,
      this.parentLevelID,
      required this.interventionsAreAllowed,
      required this.allowedInterventions,
      required this.customData,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Level.fromAmplifyModel(amp.Level level) {
    id = level.id;
    name_ml = I18nString.fromAmplifyModel(level.name);
    description_ml = I18nString.fromAmplifyModel(level.description);
    parentLevelID = level.parentLevelID;
    interventionsAreAllowed = level.interventionsAreAllowed;
    if (allowedInterventions != null) {
      allowedInterventions = level.allowedInterventions!
          .map((e) => LevelInterventionRelation(
              id: e.id,
              first: this,
              second: Intervention.fromAmplifyModel(e.intervention)))
          .toList();
    }
    customData = List.generate(level.customData.length,
        (index) => CustomData.fromAmplifyModel(level.customData[index]));
    schemeVersion = level.schemeVersion;
    createdAt = level.createdAt?.getDateTimeInUtc();
    updatedAt = level.updatedAt?.getDateTimeInUtc();
  }

  amp.Level toAmplifyModel() {
    return amp.Level(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        parentLevelID: parentLevelID,
        interventionsAreAllowed: interventionsAreAllowed,
        allowedInterventions: allowedInterventions
            ?.map((e) => amp.LevelInterventionRelation(
                id: e.id,
                level: e.first.toAmplifyModel(),
                intervention: e.second.toAmplifyModel()))
            .toList(),
        customData: List.generate(
            customData.length, (index) => customData[index].toAmplifyModel()),
        schemeVersion: schemeVersion);
  }

  Level.unpopulated(this.id) {
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
      return name_ml == other.name_ml &&
          description_ml == other.description_ml &&
          parentLevelID == other.parentLevelID &&
          interventionsAreAllowed == other.interventionsAreAllowed &&
          schemeVersion == other.schemeVersion &&
          id == other.id;
    }
    return false;
  }
}
