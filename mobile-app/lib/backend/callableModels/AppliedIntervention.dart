import 'package:mobile_app/backend/callableModels/ExecutedSurvey.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/User.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../../db_model_generator.dart';
import '../database/DBModel.dart';
import 'Entity.dart';

import 'package:json_annotation/json_annotation.dart';

part 'AppliedIntervention.g.dart';
part 'AppliedIntervention.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class AppliedIntervention extends DBModel {
  // JsonSerializable factory and toJson methods
  factory AppliedIntervention.fromJson(Map<String, dynamic> json) =>
      _$AppliedInterventionFromJson(json);

  Map<String, dynamic> toJson() => _$AppliedInterventionToJson(this);

  String? id;
  late User whoDidIt; // Unpopulated allowed
  late Intervention intervention; // Unpopulated allowed

  @JsonKey(includeToJson: false)
  late Entity entity; // Unpopulated allowe

  Location? location;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<ExecutedSurvey> executedSurveys; // Unpopulated allowed
  late bool isOkay;

  AppliedIntervention(
      {this.id,
      required this.whoDidIt,
      required this.intervention,
      required this.entity,
      this.location,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt,
      required this.executedSurveys,
      required this.isOkay});

  AppliedIntervention.fromAmplifyModel(
      amp.AppliedIntervention appliedIntervention) {
    id = appliedIntervention.id;
    whoDidIt = User.fromAmplifyModel(appliedIntervention.whoDidIt);
    intervention =
        Intervention.fromAmplifyModel(appliedIntervention.intervention);
    location = appliedIntervention.location == null
        ? null
        : Location.fromAmplifyModel(appliedIntervention.location!);
    schemeVersion = appliedIntervention.schemeVersion;
    executedSurveys = List.generate(
        appliedIntervention.executedSurveys.length,
        (index) => ExecutedSurvey.fromAmplifyModel(
            appliedIntervention.executedSurveys[index]));
    isOkay = appliedIntervention.isOkay;
  }

  amp.AppliedIntervention toAmplifyModel() {
    return (amp.AppliedIntervention(
        id: id,
        whoDidIt: whoDidIt.toAmplifyModel(),
        intervention: intervention.toAmplifyModel(),
        location: location?.toAmplifyModel(),
        schemeVersion: schemeVersion,
        executedSurveys: List.generate(executedSurveys.length,
            (index) => executedSurveys[index].toAmplifyModel()),
        appliedInterventionInterventionId: intervention.id!,
        appliedInterventionWhoDidItId: whoDidIt.id!,
        isOkay: isOkay));
  }

  AppliedIntervention.unpopulated(this.id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return AppliedIntervention.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is AppliedIntervention) {
      return id == other.id &&
          whoDidIt.id == other.whoDidIt.id &&
          intervention.id == other.intervention.id &&
          entity.id == other.entity.id &&
          location == other.location &&
          schemeVersion == other.schemeVersion &&
          isOkay == other.isOkay;
    } else {
      return false;
    }
  }

  //todo: integrate working boolean
}
