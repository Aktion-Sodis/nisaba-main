import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'Content.dart';
import 'Relation.dart';

import 'package:json_annotation/json_annotation.dart';

part 'ContentTag.g.dart';
part 'ContentTag.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class ContentTag extends DBModel {
  // JsonSerializable factory and toJson methods
  factory ContentTag.fromJson(Map<String, dynamic> json) =>
      _$ContentTagFromJson(json);

  Map<String, dynamic> toJson() => _$ContentTagToJson(this);

  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<ContentContentTagRelation> contents;

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  ContentTag(
      {String? id,
      required this.text_ml,
      this.schemeVersion,
      required this.contents,
      this.createdAt,
      this.updatedAt})
      : super(id);

  ContentTag.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return ContentTag.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is ContentTag) {
      return text_ml == other.text_ml &&
          schemeVersion == other.schemeVersion &&
          id == other.id &&
          unpopulatedListsEqual(contents, other.contents);
    } else {
      return false;
    }
  }
}
