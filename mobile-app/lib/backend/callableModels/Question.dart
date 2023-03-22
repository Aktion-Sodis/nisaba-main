import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/QuestionOption.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'Question.g.dart';
part 'Question.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class Question extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Question.fromJson(Map<String, dynamic> json) =>
      _$QuestionFromJson(json);

  @override
  String id = UUID.getUUID();

  @override
  Map<String, dynamic> toJson() => _$QuestionToJson(this);

  late I18nString text; // TODO: Rename to text
  late QuestionType type;
  List<QuestionOption>? questionOptions;
  late bool isFollowUpQuestion;

  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayText => text.text;

  set displayText(String text) => this.text.text = text;

  Question(
      {String? id,
      required this.text,
      required this.type,
      this.questionOptions,
      required this.isFollowUpQuestion})
      : super(id);

  amp.Question toAmplifyModel() {
    return amp.Question(
        id: id,
        text: text.toAmplifyModel(),
        type: questionTypeToAmplifyQuestionType(type),
        questionOptions: questionOptions != null
            ? List.generate(questionOptions!.length,
                (index) => questionOptions![index].toAmplifyModel())
            : null,
        isFollowUpQuestion: isFollowUpQuestion);
  }

  Question.fromAmplifyModel(amp.Question question) : super(question.id) {
    id = question.id;
    text = I18nString.fromAmplifyModel(question.text);
    type = questionTypeFromAmplifyQuestionType(question.type);
    questionOptions = question.questionOptions != null
        ? List.generate(
            question.questionOptions!.length,
            (index) => QuestionOption.fromAmplifyModel(
                question.questionOptions![index]))
        : null;
    isFollowUpQuestion = question.isFollowUpQuestion;
  }

  Question.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Question.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Question) {
      return text == other.text &&
          type == other.type &&
          id == other.id &&
          isFollowUpQuestion == other.isFollowUpQuestion &&
          listEquals(questionOptions, other.questionOptions);
    }
    return false;
  }
}

enum QuestionType {
  TEXT,
  SINGLECHOICE,
  MULTIPLECHOICE,
  PICTURE,
  PICTUREWITHTAGS,
  AUDIO,
  INT,
  DOUBLE,
  RATING
}

amp.QuestionType questionTypeToAmplifyQuestionType(QuestionType questionType) {
  switch (questionType) {
    case QuestionType.TEXT:
      return amp.QuestionType.TEXT;
      break;
    case QuestionType.SINGLECHOICE:
      return amp.QuestionType.SINGLECHOICE;
      break;
    case QuestionType.MULTIPLECHOICE:
      return amp.QuestionType.MULTIPLECHOICE;
      break;
    case QuestionType.PICTURE:
      return amp.QuestionType.PICTURE;
      break;
    case QuestionType.PICTUREWITHTAGS:
      return amp.QuestionType.PICTUREWITHTAGS;
      break;
    case QuestionType.AUDIO:
      return amp.QuestionType.AUDIO;
      break;
    case QuestionType.INT:
      return amp.QuestionType.INT;
      break;
    case QuestionType.DOUBLE:
      return amp.QuestionType.DOUBLE;
      break;
    case QuestionType.RATING:
      return amp.QuestionType.RATING;
      break;
  }
}

QuestionType questionTypeFromAmplifyQuestionType(
    amp.QuestionType questionType) {
  switch (questionType) {
    case amp.QuestionType.TEXT:
      return QuestionType.TEXT;
      break;
    case amp.QuestionType.SINGLECHOICE:
      return QuestionType.SINGLECHOICE;
      break;
    case amp.QuestionType.MULTIPLECHOICE:
      return QuestionType.MULTIPLECHOICE;
      break;
    case amp.QuestionType.PICTURE:
      return QuestionType.PICTURE;
      break;
    case amp.QuestionType.PICTUREWITHTAGS:
      return QuestionType.PICTUREWITHTAGS;
      break;
    case amp.QuestionType.AUDIO:
      return QuestionType.AUDIO;
      break;
    case amp.QuestionType.INT:
      return QuestionType.INT;
      break;
    case amp.QuestionType.DOUBLE:
      return QuestionType.DOUBLE;
      break;
    case amp.QuestionType.RATING:
      return QuestionType.RATING;
      break;
  }
}
