import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';
import 'package:mobile_app/backend/callableModels/SurveyTag.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'Survey.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Relation.g.dart';

class Relation<T extends DBModel, P extends DBModel> extends DBModel {
  T? first;
  P? second;

  late final String firstID;
  late final String secondID;

  @override
  bool get isPopulated => firstPopulated || secondPopulated;

  bool get firstPopulated => first != null;
  bool get secondPopulated => second != null;

  void populate({T? first, P? second}) {
    first = first;
    second = second;
  }

  Relation(
      {required this.firstID,
      required this.secondID,
      String? id,
      T? first,
      P? second})
      : super(id);

  Relation.unpopulated(String? id) : super(id);

  @override
  DBModel getUnpopulated() {
    return Relation.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Relation) {
      return id == other.id;
    } else {
      return false;
    }
  }
}

// All relations
@JsonSerializable()
class SurveySurveyTagRelation extends Relation<Survey, SurveyTag> {
  @override
  DBModel getUnpopulated() {
    return SurveySurveyTagRelation.unpopulated(id);
  }

  // JsonSerializable factory and toJson methods
  factory SurveySurveyTagRelation.fromJson(Map<String, dynamic> json) =>
      _$SurveySurveyTagRelationFromJson(json);

  Map<String, dynamic> toJson() => _$SurveySurveyTagRelationToJson(this);

  SurveySurveyTagRelation(
      {String? id,
      required firstID,
      required secondID,
      Survey? first,
      SurveyTag? second})
      : super(
            id: id,
            first: first,
            second: second,
            firstID: firstID,
            secondID: secondID);

  SurveySurveyTagRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class LevelInterventionRelation extends Relation<Level, Intervention> {
  @override
  DBModel getUnpopulated() {
    return LevelInterventionRelation.unpopulated(id);
  }

  // JsonSerializable factory and toJson methods
  factory LevelInterventionRelation.fromJson(Map<String, dynamic> json) =>
      _$LevelInterventionRelationFromJson(json);

  Map<String, dynamic> toJson() => _$LevelInterventionRelationToJson(this);

  LevelInterventionRelation(
      {String? id,
      required firstID,
      required secondID,
      Level? first,
      Intervention? second})
      : super(
            id: id,
            first: first,
            second: second,
            firstID: firstID,
            secondID: secondID);

  LevelInterventionRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class InterventionInterventionTagRelation
    extends Relation<Intervention, InterventionTag> {
  @override
  DBModel getUnpopulated() {
    return InterventionInterventionTagRelation.unpopulated(id);
  }

  // JsonSerializable factory and toJson methods

  factory InterventionInterventionTagRelation.fromJson(
          Map<String, dynamic> json) =>
      _$InterventionInterventionTagRelationFromJson(json);

  Map<String, dynamic> toJson() =>
      _$InterventionInterventionTagRelationToJson(this);

  InterventionInterventionTagRelation(
      {String? id,
      required firstID,
      required secondID,
      Intervention? first,
      InterventionTag? second})
      : super(
            id: id,
            first: first,
            second: second,
            firstID: firstID,
            secondID: secondID);

  InterventionInterventionTagRelation.unpopulated(String? id)
      : super.unpopulated(id);
}

@JsonSerializable()
class InterventionContentRelation extends Relation<Intervention, Content> {
  @override
  DBModel getUnpopulated() {
    return InterventionContentRelation.unpopulated(id);
  }

  // JsonSerializable factory and toJson methods
  factory InterventionContentRelation.fromJson(Map<String, dynamic> json) =>
      _$InterventionContentRelationFromJson(json);

  Map<String, dynamic> toJson() => _$InterventionContentRelationToJson(this);

  InterventionContentRelation(
      {String? id,
      required firstID,
      required secondID,
      Intervention? first,
      Content? second})
      : super(
            id: id,
            first: first,
            second: second,
            firstID: firstID,
            secondID: secondID);

  InterventionContentRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class ContentContentTagRelation extends Relation<Content, ContentTag> {
  @override
  DBModel getUnpopulated() {
    return ContentContentTagRelation.unpopulated(id);
  }

  // JsonSerializable factory and toJson methods
  factory ContentContentTagRelation.fromJson(Map<String, dynamic> json) =>
      _$ContentContentTagRelationFromJson(json);

  Map<String, dynamic> toJson() => _$ContentContentTagRelationToJson(this);

  ContentContentTagRelation(
      {String? id,
      required firstID,
      required secondID,
      Content? first,
      ContentTag? second})
      : super(
            id: id,
            first: first,
            second: second,
            firstID: firstID,
            secondID: secondID);

  ContentContentTagRelation.unpopulated(String? id) : super.unpopulated(id);
}
