import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class SurveyTag extends DBModel {
  String? id;
  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<Relation<Survey, SurveyTag>> surveys; // unpopulated allowed

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  SurveyTag(
      {this.id,
      required this.text_ml,
      this.schemeVersion,
      required this.surveys,
      this.createdAt,
      this.updatedAt});

  SurveyTag.fromAmplifyModel(amp.SurveyTag tag) {
    id = tag.id;
    text_ml = I18nString.fromAmplifyModel(tag.text);
    schemeVersion = tag.schemeVersion;
    createdAt = tag.createdAt?.getDateTimeInUtc();
    updatedAt = tag.updatedAt?.getDateTimeInUtc();
    surveys = tag.surveys
        .map((e) => Relation(
            id: e.id,
            first: Survey.fromAmplifyModel(e.survey),
            second: SurveyTag.fromAmplifyModel(e.surveyTag)))
        .toList();
  }

  amp.SurveyTag toAmplifyModel() {
    return amp.SurveyTag(
        text: text_ml.toAmplifyModel(),
        id: id,
        schemeVersion: schemeVersion,
        surveys: surveys
            .map((e) => amp.SurveySurveyTagRelation(
                id: e.id,
                survey: e.first.toAmplifyModel(),
                surveyTag: e.second.toAmplifyModel()))
            .toList());
  }

  SurveyTag.unpopulated(this.id) {
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
