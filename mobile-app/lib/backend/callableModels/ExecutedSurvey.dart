import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/AppliedIntervention.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/QuestionAnswer.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/callableModels/User.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'ExecutedSurvey.g.dart';
part 'ExecutedSurvey.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class ExecutedSurvey extends DBModel {
  // JsonSerializable factory and toJson methods
  factory ExecutedSurvey.fromJson(Map<String, dynamic> json) =>
      _$ExecutedSurveyFromJson(json);

  Map<String, dynamic> toJson() => _$ExecutedSurveyToJson(this);

  late AppliedIntervention appliedIntervention; // Unpopulated allowed
  late Survey survey; // Unpopulated allowed
  late User whoExecutedIt; // Unpopulated allowed
  late DateTime date;
  Location? location;
  late List<QuestionAnswer> answers;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  ExecutedSurvey(
      {String? id,
      required this.appliedIntervention,
      required this.survey,
      required this.whoExecutedIt,
      required this.date,
      this.location,
      required this.answers,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt})
      : super(id);

  ExecutedSurvey.fromAmplifyModel(amp.ExecutedSurvey executedSurvey)
      : super(executedSurvey.id) {
    id = executedSurvey.id;
    appliedIntervention = AppliedIntervention.fromAmplifyModel(
        executedSurvey.appliedIntervention);
    survey = Survey.fromAmplifyModel(executedSurvey.survey);
    whoExecutedIt = User.fromAmplifyModel(executedSurvey.whoExecutedIt);
    date = executedSurvey.date.getDateTimeInUtc();
    location = executedSurvey.location == null
        ? null
        : Location.fromAmplifyModel(executedSurvey.location!);
    answers = List.generate(
        executedSurvey.answers.length,
        (index) =>
            QuestionAnswer.fromAmplifyModel(executedSurvey.answers[index]));
    schemeVersion = executedSurvey.schemeVersion;
    createdAt = executedSurvey.createdAt?.getDateTimeInUtc();
    updatedAt = executedSurvey.updatedAt?.getDateTimeInUtc();
  }

  amp.ExecutedSurvey toAmplifyModel() {
    return amp.ExecutedSurvey(
      id: id,
      appliedIntervention: appliedIntervention.toAmplifyModel(),
      survey: survey.toAmplifyModel(),
      whoExecutedIt: whoExecutedIt.toAmplifyModel(),
      date: TemporalDateTime(date),
      location: location?.toAmplifyModel(),
      answers: List.generate(
          answers.length, (index) => answers[index].toAmplifyModel()),
      schemeVersion: schemeVersion,
      executedSurveySurveyId: survey.id!,
      executedSurveyWhoExecutedItId: whoExecutedIt.id!,
    );
  }

  ExecutedSurvey.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return ExecutedSurvey.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is ExecutedSurvey) {
      return appliedIntervention.id ==
              other.appliedIntervention.id && // Unpopulated allowed
          survey.id == other.survey.id && // Unpopulated allowed
          whoExecutedIt.id == other.whoExecutedIt.id && // Unpopulated allowed
          date == other.date &&
          location == other.location &&
          listEquals(answers, other.answers) &&
          schemeVersion == other.schemeVersion &&
          id == other.id;
    } else {
      return false;
    }
  }
}
