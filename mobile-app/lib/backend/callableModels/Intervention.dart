import 'package:mobile_app/backend/callableModels/Content.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Survey.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

class Intervention {
  String? id;
  late I18nString name_ml;
  late I18nString description_ml;
  late InterventionType interventionType;
  late List<amp.InterventionContentRelation> interventionContentRelations;
  late List<Survey> surveys;
  late List<amp.InterventionInterventionTagRelation> tagConnections;
  late List<amp.LevelInterventionRelation> levelConnections;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  List<InterventionTag> get tags => List.generate(
      tagConnections.length,
      (index) => InterventionTag.fromAmplifyModel(
          tagConnections[index].interventionTag));

  void addInterventionTag(InterventionTag interventionTag) {
    tagConnections.add(amp.InterventionInterventionTagRelation(
        intervention: toAmplifyModel(),
        interventionTag: interventionTag.toAmplifyModel()));
  }

  void updateInterventionTag(InterventionTag interventionTag) {
    int index = tagConnections.indexWhere(
        (element) => element.interventionTag.id == interventionTag.id);
    if (index >= 0) {
      tagConnections[index] = tagConnections[index]
          .copyWith(interventionTag: interventionTag.toAmplifyModel());
    } else {
      addInterventionTag(interventionTag);
    }
  }

  Intervention(
      {this.id,
      required this.name_ml,
      required this.description_ml,
      required this.interventionType,
      required this.interventionContentRelations,
      required this.surveys,
      required this.tagConnections,
      required this.levelConnections,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Intervention.fromAmplifyModel(amp.Intervention intervention) {
    id = intervention.id;
    name_ml = I18nString.fromAmplifyModel(intervention.name);
    description_ml = I18nString.fromAmplifyModel(intervention.description);
    interventionType = interventionTypeFromAmplifyInterventionType(
        intervention.interventionType);
    interventionContentRelations = intervention.contents;
    surveys = List.generate(intervention.surveys.length,
        (index) => Survey.fromAmplifyModel(intervention.surveys[index]));
    tagConnections = intervention.tags;
    schemeVersion = intervention.schemeVersion;
    createdAt = intervention.createdAt?.getDateTimeInUtc();
    updatedAt = intervention.updatedAt?.getDateTimeInUtc();
    levelConnections = intervention.levels;
  }

  amp.Intervention toAmplifyModel() {
    return (amp.Intervention(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        interventionType:
            amplifyInterventionTypeFromInterventionType(interventionType),
        contents: interventionContentRelations,
        tags: tagConnections,
        surveys: List.generate(
            surveys.length, (index) => surveys[index].toAmplifyModel()),
        levels: levelConnections,
        schemeVersion: schemeVersion));
  }
}

enum InterventionType { TECHNOLOGY, EDUCATION }

amp.InterventionType amplifyInterventionTypeFromInterventionType(
    InterventionType interventionType) {
  switch (interventionType) {
    case InterventionType.TECHNOLOGY:
      return amp.InterventionType.TECHNOLOGY;
      break;
    case InterventionType.EDUCATION:
      return amp.InterventionType.EDUCATION;
      break;
  }
}

InterventionType interventionTypeFromAmplifyInterventionType(
    amp.InterventionType interventionType) {
  switch (interventionType) {
    case amp.InterventionType.TECHNOLOGY:
      return InterventionType.TECHNOLOGY;
      break;
    case amp.InterventionType.EDUCATION:
      return InterventionType.EDUCATION;
      break;
  }
}
