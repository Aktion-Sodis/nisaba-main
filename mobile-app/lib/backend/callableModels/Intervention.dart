import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/Content.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'Level.dart';

import 'package:json_annotation/json_annotation.dart';

part 'Intervention.g.dart';
part 'Intervention.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Intervention extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Intervention.fromJson(Map<String, dynamic> json) =>
      _$InterventionFromJson(json);

  Map<String, dynamic> toJson() => _$InterventionToJson(this);

  static Map<String, dynamic> queryFields() => _$Intervention;

  late I18nString name;
  late I18nString description;
  late InterventionType interventionType;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late List<InterventionContentRelation>
      interventionContentRelations; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late List<Survey> surveys; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late List<InterventionInterventionTagRelation>
      tagConnections; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late List<LevelInterventionRelation> levelConnections; // Unpopulated allowed

  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayName => name.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayName(String name) => this.name.text = name;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayDescription => description.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayDescription(String description) =>
      this.description.text = description;

  List<InterventionTag> get tags =>
      tagConnections.map((e) => e.second!).toList();

  Intervention(
      {String? id,
      required this.name,
      required this.description,
      required this.interventionType,
      List<InterventionContentRelation>? interventionContentRelations,
      List<Survey>? surveys,
      List<InterventionInterventionTagRelation>? tagConnections,
      List<LevelInterventionRelation>? levelConnections,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt})
      : super(id) {
    this.surveys = surveys ?? [];
    this.interventionContentRelations = interventionContentRelations ?? [];
    this.tagConnections = tagConnections ?? [];
    this.levelConnections = levelConnections ?? [];
  }

  Intervention.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Intervention.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Intervention) {
      return (id == other.id &&
          name == other.name &&
          description == other.description &&
          interventionType == other.interventionType &&
          schemeVersion == other.schemeVersion &&
          unpopulatedListsEqual(interventionContentRelations,
              other.interventionContentRelations) &&
          unpopulatedListsEqual(surveys, other.surveys) &&
          unpopulatedListsEqual(tagConnections, other.tagConnections) &&
          unpopulatedListsEqual(levelConnections, other.levelConnections));
    } else {
      return false;
    }
  }
}

enum InterventionType { TECHNOLOGY, EDUCATION }

amp.InterventionType amplifyInterventionTypeFromInterventionType(
    InterventionType interventionType) {
  switch (interventionType) {
    case InterventionType.TECHNOLOGY:
      return amp.InterventionType.TECHNOLOGY;
      break;
    case InterventionType.EDUCATION:
      return amp.InterventionType.EDUCATION;
      break;
  }
}

InterventionType interventionTypeFromAmplifyInterventionType(
    amp.InterventionType interventionType) {
  switch (interventionType) {
    case amp.InterventionType.TECHNOLOGY:
      return InterventionType.TECHNOLOGY;
      break;
    case amp.InterventionType.EDUCATION:
      return InterventionType.EDUCATION;
      break;
  }
}
