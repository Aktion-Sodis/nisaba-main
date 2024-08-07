import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';
import 'package:mobile_app/backend/callableModels/SurveyTag.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'Survey.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Relation.g.dart';
part 'Relation.db_model.dart';

abstract class Relation<T extends DBModel, P extends DBModel> extends DBModel {
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

  Relation.byID({
    String? id,
    required this.firstID,
    required this.secondID,
  }) : super(id);

  Relation({
    String? id,
    required T this.first,
    required P this.second,
  })  : firstID = first.id,
        secondID = second.id,
        super(id);

  Relation.unpopulated(String? id) : super(id);

  @override
  DBModel getUnpopulated() {
    throw UnimplementedError();
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
/*
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
      {String? id, required Survey first, required SurveyTag second})
      : super(id: id, first: first, second: second);

  SurveySurveyTagRelation.unpopulated(String? id) : super.unpopulated(id);
}
*/
/*
@DBModelAnnotation()
@JsonSerializable()
class LevelInterventionRelation extends Relation<Level, Intervention> {
  @override
  DBModel getUnpopulated() {
    return LevelInterventionRelation.unpopulated(id);
  }

  //static Map<String, dynamic> queryFields() => _$LevelIn

  // JsonSerializable factory and toJson methods
  factory LevelInterventionRelation.fromJson(Map<String, dynamic> json) =>
      _$LevelInterventionRelationFromJson(json);

  Map<String, dynamic> toJson() => _$LevelInterventionRelationToJson(this);

  LevelInterventionRelation(
      {String? id, required Level first, required Intervention second})
      : super(
          id: id,
          first: first,
          second: second,
        );

  LevelInterventionRelation.unpopulated(String? id) : super.unpopulated(id);
}*/
/*
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
      required Intervention first,
      required InterventionTag second})
      : super(id: id, first: first, second: second);

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
      {String? id, required Intervention first, required Content second})
      : super(
          id: id,
          first: first,
          second: second,
        );

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
      {String? id, required Content first, required ContentTag second})
      : super(id: id, first: first, second: second);

  ContentContentTagRelation.unpopulated(String? id) : super.unpopulated(id);
}*/

/// Simple models
///
///

// LevelInterventionRelation
@DBModelAnnotation()
@JsonSerializable()
class LevelInterventionRelation extends DBModel {
  String levelId;
  String interventionId;

  // TODO: remove
  // Old interface
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Level? first;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Intervention? second;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? firstID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? secondID;

  LevelInterventionRelation(
      {required String id, required this.levelId, required this.interventionId})
      : super(id);

  @override
  DBModel getUnpopulated() {
    // TODO: implement getUnpopulated
    throw UnimplementedError();
  }

  static Map<String, dynamic> queryFields() => _$LevelInterventionRelation;

  factory LevelInterventionRelation.fromJson(Map<String, dynamic> json) =>
      _$LevelInterventionRelationFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LevelInterventionRelationToJson(this);
}

@DBModelAnnotation()
@JsonSerializable()
class SurveySurveyTagRelation extends DBModel {
  String surveyId;
  String surveyTagId;

  // TODO: remove
  // Old interface
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Survey? first;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  SurveyTag? second;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? firstID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? secondID;

  SurveySurveyTagRelation(
      {required String id, required this.surveyId, required this.surveyTagId})
      : super(id);

  factory SurveySurveyTagRelation.fromJson(Map<String, dynamic> json) =>
      _$SurveySurveyTagRelationFromJson(json);

  @override
  DBModel getUnpopulated() {
    // TODO: implement getUnpopulated
    throw UnimplementedError();
  }

  static Map<String, dynamic> queryFields() => _$LevelInterventionRelation;

  @override
  Map<String, dynamic> toJson() => _$SurveySurveyTagRelationToJson(this);
}

@DBModelAnnotation()
@JsonSerializable()
class ContentContentTagRelation extends DBModel {
  String contentId;
  String contentTagId;

  // TODO: remove
  // Old interface
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Content? first;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  ContentTag? second;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? firstID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? secondID;

  factory ContentContentTagRelation.fromJson(Map<String, dynamic> json) =>
      _$ContentContentTagRelationFromJson(json);

  ContentContentTagRelation(
      {required String id, required this.contentId, required this.contentTagId})
      : super(id);

  @override
  DBModel getUnpopulated() {
    // TODO: implement getUnpopulated
    throw UnimplementedError();
  }

  static Map<String, dynamic> queryFields() => _$LevelInterventionRelation;

  @override
  Map<String, dynamic> toJson() => _$ContentContentTagRelationToJson(this);
}

@DBModelAnnotation()
@JsonSerializable()
class InterventionContentRelation extends DBModel {
  String interventionId;
  String contentId;

  // TODO: remove
  // Old interface
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Intervention? first;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Content? second;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? firstID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? secondID;

  factory InterventionContentRelation.fromJson(Map<String, dynamic> json) =>
      _$InterventionContentRelationFromJson(json);

  InterventionContentRelation(
      {required String id,
      required this.contentId,
      required this.interventionId})
      : super(id);

  @override
  DBModel getUnpopulated() {
    // TODO: implement getUnpopulated
    throw UnimplementedError();
  }

  static Map<String, dynamic> queryFields() => _$InterventionContentRelation;

  @override
  Map<String, dynamic> toJson() => _$InterventionContentRelationToJson(this);
}

@DBModelAnnotation()
@JsonSerializable()
class InterventionInterventionTagRelation extends DBModel {
  String interventionId;
  String interventionTagId;

  // TODO: remove
  // Old interface
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? firstID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String? secondID;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Intervention? first;
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  InterventionTag? second;

  factory InterventionInterventionTagRelation.fromJson(
          Map<String, dynamic> json) =>
      _$InterventionInterventionTagRelationFromJson(json);

  InterventionInterventionTagRelation(
      {required String id,
      required this.interventionTagId,
      required this.interventionId})
      : super(id);

  @override
  DBModel getUnpopulated() {
    // TODO: implement getUnpopulated
    throw UnimplementedError();
  }

  static Map<String, dynamic> queryFields() =>
      _$InterventionInterventionTagRelation;

  @override
  Map<String, dynamic> toJson() =>
      _$InterventionInterventionTagRelationToJson(this);
}
