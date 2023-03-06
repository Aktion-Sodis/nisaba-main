import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';
import 'package:mobile_app/backend/callableModels/SurveyTag.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'Survey.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Relation.g.dart';

class Relation<T extends DBModel, P extends DBModel> extends DBModel {
  late final T first;
  late final P second;

  Relation({required this.first, required this.second, String? id}) : super(id);

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
  // JsonSerializable factory and toJson methods
  factory SurveySurveyTagRelation.fromJson(Map<String, dynamic> json) =>
      _$SurveySurveyTagRelationFromJson(json);

  Map<String, dynamic> toJson() => _$SurveySurveyTagRelationToJson(this);

  SurveySurveyTagRelation(
      {String? id, required Survey first, required SurveyTag second})
      : super(id: id, first: first, second: second);

  SurveySurveyTagRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class LevelInterventionRelation extends Relation<Level, Intervention> {
  // JsonSerializable factory and toJson methods
  factory LevelInterventionRelation.fromJson(Map<String, dynamic> json) =>
      _$LevelInterventionRelationFromJson(json);

  Map<String, dynamic> toJson() => _$LevelInterventionRelationToJson(this);

  LevelInterventionRelation(
      {String? id, required Level first, required Intervention second})
      : super(id: id, first: first, second: second);

  LevelInterventionRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class InterventionInterventionTagRelation
    extends Relation<Intervention, InterventionTag> {
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
  // JsonSerializable factory and toJson methods
  factory InterventionContentRelation.fromJson(Map<String, dynamic> json) =>
      _$InterventionContentRelationFromJson(json);

  Map<String, dynamic> toJson() => _$InterventionContentRelationToJson(this);

  InterventionContentRelation(
      {String? id, required Intervention first, required Content second})
      : super(id: id, first: first, second: second);

  InterventionContentRelation.unpopulated(String? id) : super.unpopulated(id);
}

@JsonSerializable()
class ContentContentTagRelation extends Relation<Content, ContentTag> {
  // JsonSerializable factory and toJson methods
  factory ContentContentTagRelation.fromJson(Map<String, dynamic> json) =>
      _$ContentContentTagRelationFromJson(json);

  Map<String, dynamic> toJson() => _$ContentContentTagRelationToJson(this);

  ContentContentTagRelation(
      {String? id, required Content first, required ContentTag second})
      : super(id: id, first: first, second: second);

  ContentContentTagRelation.unpopulated(String? id) : super.unpopulated(id);
}
