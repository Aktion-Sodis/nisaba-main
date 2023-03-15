import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'Intervention.dart';
import 'Relation.dart';

import 'package:json_annotation/json_annotation.dart';

part 'InterventionTag.g.dart';
part 'InterventionTag.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class InterventionTag extends DBModel {
  // JsonSerializable factory and toJson methods
  factory InterventionTag.fromJson(Map<String, dynamic> json) =>
      _$InterventionTagFromJson(json);

  Map<String, dynamic> toJson() => _$InterventionTagToJson(this);

  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<InterventionInterventionTagRelation> interventions;

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  InterventionTag(
      {String? id,
      required this.text_ml,
      this.schemeVersion,
      required this.interventions,
      this.createdAt,
      this.updatedAt})
      : super(id);

  InterventionTag.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return InterventionTag.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is InterventionTag) {
      return text_ml == other.text_ml &&
          schemeVersion == other.schemeVersion &&
          id == other.id;
    }
    return false;
  }
}
