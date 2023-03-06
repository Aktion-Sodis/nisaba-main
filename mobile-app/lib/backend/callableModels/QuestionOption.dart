import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'QuestionOption.g.dart';

@JsonSerializable()
class QuestionOption extends DBModel {
  // JsonSerializable factory and toJson methods
  factory QuestionOption.fromJson(Map<String, dynamic> json) =>
      _$QuestionOptionFromJson(json);

  Map<String, dynamic> toJson() => _$QuestionOptionToJson(this);

  String? id;
  late I18nString text_ml;
  List<String>? followUpQuestionIDs;

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  QuestionOption({this.id, required this.text_ml, this.followUpQuestionIDs});

  amp.QuestionOption toAmplifyModel() {
    return amp.QuestionOption(
        text: text_ml.toAmplifyModel(),
        followUpQuestionIDs: followUpQuestionIDs,
        id: id);
  }

  QuestionOption.fromAmplifyModel(amp.QuestionOption questionOption) {
    id = questionOption.id;
    text_ml = I18nString.fromAmplifyModel(questionOption.text);
    followUpQuestionIDs = questionOption.followUpQuestionIDs;
  }

  QuestionOption.unpopulated(this.id) {
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
      return text_ml == other.text_ml &&
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
