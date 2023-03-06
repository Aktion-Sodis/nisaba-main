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

@JsonSerializable()
class Intervention extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Intervention.fromJson(Map<String, dynamic> json) =>
      _$InterventionFromJson(json);

  Map<String, dynamic> toJson() => _$InterventionToJson(this);

  String? id;
  late I18nString name_ml;
  late I18nString description_ml;
  late InterventionType interventionType;
  late List<InterventionContentRelation>
      interventionContentRelations; // Unpopulated allowed
  late List<Survey> surveys; // Unpopulated allowed
  late List<InterventionInterventionTagRelation>
      tagConnections; // Unpopulated allowed
  late List<LevelInterventionRelation> levelConnections; // Unpopulated allowed
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  List<InterventionTag> get tags =>
      tagConnections.map((e) => e.second).toList();

  void addInterventionTag(InterventionTag interventionTag) {
    tagConnections.add(InterventionInterventionTagRelation(
        id: interventionTag.id, first: this, second: interventionTag));
  }

  void updateInterventionTag(InterventionTag interventionTag) {
    int index = tagConnections
        .indexWhere((element) => element.id == interventionTag.id);
    if (index >= 0) {
      tagConnections[index].second = interventionTag;
    } else {
      addInterventionTag(interventionTag);
    }
  }

  Intervention(
      {this.id,
      required this.name_ml,
      required this.description_ml,
      required this.interventionType,
      required this.interventionContentRelations,
      required this.surveys,
      required this.tagConnections,
      required this.levelConnections,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Intervention.fromAmplifyModel(amp.Intervention intervention) {
    id = intervention.id;
    name_ml = I18nString.fromAmplifyModel(intervention.name);
    description_ml = I18nString.fromAmplifyModel(intervention.description);
    interventionType = interventionTypeFromAmplifyInterventionType(
        intervention.interventionType);
    interventionContentRelations = intervention.contents.map((e) {
      return InterventionContentRelation(
          id: e.id,
          first: Intervention.fromAmplifyModel(e.intervention),
          second: Content.fromAmplifyModel(e.content));
    }).toList();
    surveys = List.generate(intervention.surveys.length,
        (index) => Survey.fromAmplifyModel(intervention.surveys[index]));
    tagConnections = intervention.tags
        .map((e) => InterventionInterventionTagRelation(
            id: e.id,
            first: this,
            second: InterventionTag.fromAmplifyModel(e.interventionTag)))
        .toList();
    schemeVersion = intervention.schemeVersion;
    createdAt = intervention.createdAt?.getDateTimeInUtc();
    updatedAt = intervention.updatedAt?.getDateTimeInUtc();
    levelConnections = intervention.levels.map((e) {
      return LevelInterventionRelation(
          id: e.id,
          first: Level.fromAmplifyModel(e.level),
          second: Intervention.fromAmplifyModel(e.intervention));
    }).toList();
  }

  amp.Intervention toAmplifyModel() {
    return (amp.Intervention(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        interventionType:
            amplifyInterventionTypeFromInterventionType(interventionType),
        contents: interventionContentRelations
            .map(
              (e) => amp.InterventionContentRelation(
                  id: e.id,
                  intervention: e.first.toAmplifyModel(),
                  content: e.second.toAmplifyModel()),
            )
            .toList(),
        tags: tagConnections.map((e) {
          return amp.InterventionInterventionTagRelation(
              id: e.id,
              intervention: e.first.toAmplifyModel(),
              interventionTag: e.second.toAmplifyModel());
        }).toList(),
        surveys: List.generate(
            surveys.length, (index) => surveys[index].toAmplifyModel()),
        levels: levelConnections.map((e) {
          return amp.LevelInterventionRelation(
              id: e.id,
              level: e.first.toAmplifyModel(),
              intervention: e.second.toAmplifyModel());
        }).toList(),
        schemeVersion: schemeVersion));
  }

  Intervention.unpopulated(this.id) {
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
          name_ml == other.name_ml &&
          description_ml == other.description_ml &&
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
