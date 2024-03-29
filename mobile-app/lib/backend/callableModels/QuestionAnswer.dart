import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/Marking.dart';
import 'package:mobile_app/backend/callableModels/Question.dart';
import 'package:mobile_app/backend/callableModels/QuestionOption.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQLJsonConverter.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'QuestionAnswer.g.dart';
part 'QuestionAnswer.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class QuestionAnswer extends DBModel {
  // JsonSerializable factory and toJson methods
  factory QuestionAnswer.fromJson(Map<String, dynamic> json) =>
      _$QuestionAnswerFromJson(json);

  Map<String, dynamic> toJson() => _$QuestionAnswerToJson(this);

  late String questionID;

  // Has to be UTC
  @JsonKey(
    toJson: GraphQLJsonConverter.dateToJson,
    fromJson: GraphQLJsonConverter.dateFromJson,
  )
  late DateTime date;

  @JsonKey(
      toJson: GraphQLJsonConverter.enumToJson,
      readValue: GraphQLJsonConverter.readEnumValue)
  late QuestionType type;

  String? text;
  int? intValue;
  double? doubleValue;
  int? rating;
  List<QuestionOption>? questionOptions;
  late List<Marking> markings;

  QuestionAnswer(
      {String? id,
      required this.questionID,
      required this.date,
      required this.type,
      this.text,
      this.questionOptions,
      List<Marking>? markings,
      this.intValue,
      this.doubleValue,
      this.rating})
      : super(id) {
    if (markings == null) {
      this.markings = [];
    } else {
      this.markings = markings;
    }
  }

  QuestionAnswer.fromAmplifyModel(amp.QuestionAnswer questionAnswer)
      : super(questionAnswer.id) {
    id = questionAnswer.id;
    questionID = questionAnswer.questionID;
    date = questionAnswer.date.getDateTimeInUtc();
    type = questionTypeFromAmplifyQuestionType(questionAnswer.type);
    text = questionAnswer.text;
    intValue = questionAnswer.intValue;
    doubleValue = questionAnswer.doubleValue;
    rating = questionAnswer.rating;
    questionOptions = questionAnswer.questionOptions != null
        ? List.generate(
            questionAnswer.questionOptions!.length,
            (index) => QuestionOption.fromAmplifyModel(
                questionAnswer.questionOptions![index]))
        : null;
    markings = List.generate(questionAnswer.markings!.length,
        (index) => Marking.fromAmplifyModel(questionAnswer.markings![index]));
  }

  QuestionAnswer.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return QuestionAnswer.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is QuestionAnswer) {
      return id == other.id &&
          questionID == other.questionID &&
          date == other.date &&
          type == other.type &&
          text == other.text &&
          intValue == other.intValue &&
          doubleValue == other.doubleValue &&
          rating == other.rating &&
          listEquals(questionOptions, other.questionOptions) &&
          listEquals(markings, other.markings);
    }
    return false;
  }
}
