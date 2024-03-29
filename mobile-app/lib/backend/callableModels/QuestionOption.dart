import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'QuestionOption.g.dart';
part 'QuestionOption.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class QuestionOption extends DBModel {
  // JsonSerializable factory and toJson methods
  factory QuestionOption.fromJson(Map<String, dynamic> json) =>
      _$QuestionOptionFromJson(json);

  Map<String, dynamic> toJson() => _$QuestionOptionToJson(this);

  late I18nString text;
  List<String>? followUpQuestionIDs;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayText => text.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayText(String text) => this.text.text = text;

  QuestionOption({String? id, required this.text, this.followUpQuestionIDs})
      : super(id);

  amp.QuestionOption toAmplifyModel() {
    return amp.QuestionOption(
        text: text.toAmplifyModel(),
        followUpQuestionIDs: followUpQuestionIDs,
        id: id);
  }

  QuestionOption.fromAmplifyModel(amp.QuestionOption questionOption)
      : super(questionOption.id) {
    id = questionOption.id;
    text = I18nString.fromAmplifyModel(questionOption.text);
    followUpQuestionIDs = questionOption.followUpQuestionIDs;
  }

  QuestionOption.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return QuestionOption.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is QuestionOption) {
      return text == other.text &&
          ((followUpQuestionIDs == null && other.followUpQuestionIDs == null) ||
              (followUpQuestionIDs != null &&
                  other.followUpQuestionIDs != null &&
                  listEquals(
                      followUpQuestionIDs, other.followUpQuestionIDs))) &&
          id == other.id;
    }
    return false;
  }
}
