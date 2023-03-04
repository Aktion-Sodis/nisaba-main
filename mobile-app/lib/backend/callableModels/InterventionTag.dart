import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'Intervention.dart';
import 'Relation.dart';

class InterventionTag extends DBModel {
  String? id;
  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<Relation<Intervention, InterventionTag>> interventions;

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  InterventionTag(
      {this.id,
      required this.text_ml,
      this.schemeVersion,
      required this.interventions,
      this.createdAt,
      this.updatedAt});

  InterventionTag.fromAmplifyModel(amp.InterventionTag tag) {
    id = tag.id;
    text_ml = I18nString.fromAmplifyModel(tag.text);
    schemeVersion = tag.schemeVersion;
    createdAt = tag.createdAt?.getDateTimeInUtc();
    updatedAt = tag.updatedAt?.getDateTimeInUtc();
    interventions = tag.interventions
        .map((e) => Relation<Intervention, InterventionTag>(
            id: e.id,
            first: Intervention.fromAmplifyModel(e.intervention),
            second: this))
        .toList();
  }

  amp.InterventionTag toAmplifyModel() {
    return amp.InterventionTag(
        text: text_ml.toAmplifyModel(),
        id: id,
        schemeVersion: schemeVersion,
        interventions: interventions
            .map((e) => amp.InterventionInterventionTagRelation(
                intervention: e.first.toAmplifyModel(),
                interventionTag: e.second.toAmplifyModel()))
            .toList());
  }

  InterventionTag.unpopulated(this.id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return InterventionTag.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is InterventionTag) {
      return text_ml == other.text_ml &&
          schemeVersion == other.schemeVersion &&
          id == other.id &&
          createdAt == other.createdAt &&
          updatedAt == other.updatedAt;
    }
    return false;
  }
}
