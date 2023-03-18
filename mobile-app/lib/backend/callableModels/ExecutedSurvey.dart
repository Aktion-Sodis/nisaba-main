import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/AppliedIntervention.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/QuestionAnswer.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/callableModels/User.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQLJsonConverter.dart';

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

  static Map<String, dynamic> queryFields() => _$ExecutedSurvey;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late AppliedIntervention appliedIntervention; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late Survey survey; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late User whoExecutedIt; // Unpopulated allowed

  String appliedInterventionExecutedSurveysId;
  String executedSurveySurveyId;
  String executedSurveyWhoExecutedItId;

  // Has to be UTC
  @JsonKey(
      toJson: GraphQLJsonConverter.dateToJson,
      fromJson: GraphQLJsonConverter.dateFromJson)
  late DateTime date;

  Location? location;
  late List<QuestionAnswer> answers;

  ExecutedSurvey({
    String? id,
    required this.appliedInterventionExecutedSurveysId,
    required this.executedSurveySurveyId,
    required this.executedSurveyWhoExecutedItId,
    required DateTime date,
    this.location,
    required this.answers,
  }) : super(id) {
    this.date = date;
  }

  @override
  DBModel getUnpopulated() {
    throw UnimplementedError();
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
          id == other.id;
    } else {
      return false;
    }
  }
}
