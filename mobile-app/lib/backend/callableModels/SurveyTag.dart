import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'SurveyTag.g.dart';
part 'SurveyTag.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class SurveyTag extends DBModel {
  // JsonSerializable factory and toJson methods
  factory SurveyTag.fromJson(Map<String, dynamic> json) =>
      _$SurveyTagFromJson(json);

  Map<String, dynamic> toJson() => _$SurveyTagToJson(this);
  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  @DBModelIgnore()
  late List<SurveySurveyTagRelation> surveys; // unpopulated allowed

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  SurveyTag(
      {String? id,
      required this.text_ml,
      this.schemeVersion,
      required this.surveys,
      this.createdAt,
      this.updatedAt})
      : super(id);

  SurveyTag.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return SurveyTag.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is SurveyTag) {
      return text_ml == other.text_ml &&
          schemeVersion == other.schemeVersion &&
          id == other.id &&
          createdAt == other.createdAt &&
          updatedAt == other.updatedAt &&
          unpopulatedListsEqual(surveys, other.surveys);
    }
    return false;
  }
}
