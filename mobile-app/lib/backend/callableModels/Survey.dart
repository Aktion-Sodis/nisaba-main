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

  Map<String, dynamic> toJson() => _$SurveyToJson(this);

  late I18nString name_ml;
  late I18nString description_ml;
  Intervention? intervention; // Unpopulated allowed
  late List<Question> questions;
  late List<SurveySurveyTagRelation> tagConnections; // Unpopulated allowed
  late bool archived;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late SurveyType surveyType;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  List<SurveyTag> get tags => tagConnections
      .where((element) => element.second != null)
      .map((e) => e.second!)
      .toList();

  void addSurveyTag(SurveyTag surveyTag) {
    tagConnections.add(SurveySurveyTagRelation(first: this, second: surveyTag));
  }

  void updateSurveyTag(SurveyTag surveyTag) {
    int index = tagConnections.indexWhere((element) =>
        element.second != null && element.second!.id == surveyTag.id);
    if (index >= 0) {
      tagConnections[index].second = surveyTag;
    } else {
      addSurveyTag(surveyTag);
    }
  }

  Question questionByID(String id) {
    return questions.firstWhere((element) => element.id == id);
  }

  Survey(
      {String? id,
      required this.name_ml,
      required this.description_ml,
      this.intervention,
      required this.questions,
      required this.tagConnections,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt,
      required this.surveyType,
      this.archived = false})
      : super(id);

  Survey.fromAmplifyModel(amp.Survey survey) : super(survey.id) {
    print(survey.intervention.toString());

    id = survey.id;
    name_ml = I18nString.fromAmplifyModel(survey.name);
    description_ml = I18nString.fromAmplifyModel(survey.description);
    intervention = survey.intervention != null
        ? Intervention.fromAmplifyModel(survey.intervention!)
        : null;
    questions = List.generate(survey.questions.length,
        (index) => Question.fromAmplifyModel(survey.questions[index]));
    tagConnections = survey.tags
        .map((e) => SurveySurveyTagRelation(
            id: e.id,
            first: this,
            second: SurveyTag.fromAmplifyModel(e.surveyTag)))
        .toList();
    schemeVersion = survey.schemeVersion;
    createdAt = survey.createdAt?.getDateTimeInUtc();
    updatedAt = survey.updatedAt?.getDateTimeInUtc();
    surveyType = surveyTypeFromAmplifySurveyType(
        survey.surveyType); //todo: change with theme change
    archived = survey.archived ?? false;
  }

  amp.Survey toAmplifyModel() {
    return amp.Survey(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        intervention: intervention?.toAmplifyModel(),
        surveyType: surveyTypeToAmplifySurveyType(surveyType),
        questions: List.generate(
            questions.length, (index) => questions[index].toAmplifyModel()),
        tags: tagConnections
            .map((e) => amp.SurveySurveyTagRelation(
                id: e.id,
                surveyTag: e.second!.toAmplifyModel(),
                survey: e.first!.toAmplifyModel()))
            .toList(),
        schemeVersion: schemeVersion,
        archived: archived
        //todo: missing survey type
        );
  }

  Survey.unpopulated(String? id) : super(id) {
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
          name_ml == other.name_ml &&
          description_ml == other.description_ml &&
          ((intervention == null && other.intervention == null) ||
              (intervention != null &&
                  other.intervention != null &&
                  intervention!.id == other.intervention!.id)) &&
          listEquals(questions, other.questions) &&
          schemeVersion == other.schemeVersion &&
          unpopulatedListsEqual(tagConnections, other.tagConnections) &&
          surveyType == other.surveyType &&
          archived == other.archived;
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
