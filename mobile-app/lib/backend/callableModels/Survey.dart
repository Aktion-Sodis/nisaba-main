import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Question.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/SurveyTag.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'Survey.g.dart';
part 'Survey.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Survey extends DBModel {
  // JsonSerializable factory and toJson methods

  factory Survey.fromJson(Map<String, dynamic> json) => _$SurveyFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$SurveyToJson(this);

  static Map<String, dynamic> queryFields() => _$Survey;

  late I18nString name;
  late I18nString description;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  Intervention? intervention; // Unpopulated allowed
  late List<Question> questions;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late List<SurveySurveyTagRelation> tagConnections = []; // Unpopulated allowed
  late SurveyStatus status;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late SurveyType surveyType;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayName => name.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayName(String name) => this.name.text = name;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String get displayDescription => description.text;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  set displayDescription(String description) =>
      this.description.text = description;

  List<SurveyTag> get tags => tagConnections
      .where((element) => element.second != null)
      .map((e) => e.second!)
      .toList();

  Question questionByID(String id) {
    return questions.firstWhere((element) => element.id == id);
  }

  Survey(
      {String? id,
      required this.name,
      required this.description,
      this.intervention,
      required this.questions,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt,
      required this.surveyType,
      this.status = SurveyStatus.DRAFT})
      : super(id);

  Survey.fromAmplifyModel(amp.Survey survey) : super(survey.id) {
    id = survey.id;
    name = I18nString.fromAmplifyModel(survey.name);
    description = I18nString.fromAmplifyModel(survey.description);
    questions = survey.questions
        .map((question) => Question.fromAmplifyModel(question))
        .toList();
    status = surveyStatusFromAmplifySurveyStatus(survey.status);
    schemeVersion = survey.schemeVersion;
    createdAt = survey.createdAt?.getDateTimeInUtc();
    updatedAt = survey.updatedAt?.getDateTimeInUtc();
    surveyType = surveyTypeFromAmplifySurveyType(survey.surveyType);
  }

  amp.Survey toAmplifyModel() {
    return amp.Survey(
        name: name.toAmplifyModel(),
        description: description.toAmplifyModel(),
        questions: questions.map((question) => question.toAmplifyModel()).toList(),
        status: surveyStatusToAmplifySurveyStatus(status),
        id: id,
        schemeVersion: schemeVersion,
        surveyType: surveyTypeToAmplifySurveyType(surveyType));
  }

  Survey.unpopulated(super.id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Survey.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Survey) {
      return id == other.id &&
          name == other.name &&
          description == other.description &&
          ((intervention == null && other.intervention == null) ||
              (intervention != null &&
                  other.intervention != null &&
                  intervention!.id == other.intervention!.id)) &&
          listEquals(questions, other.questions) &&
          schemeVersion == other.schemeVersion &&
          unpopulatedListsEqual(tagConnections, other.tagConnections) &&
          surveyType == other.surveyType &&
          status == other.status;
    } else {
      return false;
    }
  }
}

enum SurveyType { INITIAL, DEFAULT }

SurveyType surveyTypeFromAmplifySurveyType(amp.SurveyType surveyType) {
  switch (surveyType) {
    case amp.SurveyType.INITIAL:
      return SurveyType.INITIAL;
      break;
    case amp.SurveyType.DEFAULT:
      return SurveyType.DEFAULT;
      break;
  }
}

amp.SurveyType surveyTypeToAmplifySurveyType(SurveyType surveyType) {
  switch (surveyType) {
    case SurveyType.INITIAL:
      return amp.SurveyType.INITIAL;
      break;
    case SurveyType.DEFAULT:
      return amp.SurveyType.DEFAULT;
      break;
  }
}

enum SurveyStatus { DRAFT, ACTIVE, ARCHIVED }

SurveyStatus surveyStatusFromAmplifySurveyStatus(amp.SurveyStatus surveyStatus) {
  switch (surveyStatus) {
    case amp.SurveyStatus.DRAFT:
      return SurveyStatus.DRAFT;
      break;
    case amp.SurveyStatus.ACTIVE:
      return SurveyStatus.ACTIVE;
      break;
    case amp.SurveyStatus.ARCHIVED:
      return SurveyStatus.ARCHIVED;
      break;
  }
}

amp.SurveyStatus surveyStatusToAmplifySurveyStatus(SurveyStatus surveyStatus) {
  switch (surveyStatus) {
    case SurveyStatus.DRAFT:
      return amp.SurveyStatus.DRAFT;
      break;
    case SurveyStatus.ACTIVE:
      return amp.SurveyStatus.ACTIVE;
      break;
    case SurveyStatus.ARCHIVED:
      return amp.SurveyStatus.ARCHIVED;
      break;
  }
}
