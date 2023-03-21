import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/ExecutedSurvey.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/User.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

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

  static Map<String, dynamic> queryFields() => _$AppliedIntervention;

  Map<String, dynamic> toJson() => _$AppliedInterventionToJson(this);

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late User whoDidIt; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late Intervention intervention; // Unpopulated allowed

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  late Entity entity; // Unpopulated allowe

  late String appliedInterventionInterventionId;
  late String entityAppliedInterventionsId;
  late String appliedInterventionWhoDidItId;

  Location? location;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  List<ExecutedSurvey> executedSurveys = []; // Unpopulated allowed
  late bool isOkay;

  AppliedIntervention(
      {String? id,
      this.location,
      required this.appliedInterventionInterventionId,
      required this.entityAppliedInterventionsId,
      required this.appliedInterventionWhoDidItId,
      required this.isOkay})
      : super(id);

  AppliedIntervention.unpopulated(String? id) : super(id) {
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
          isOkay == other.isOkay;
    } else {
      return false;
    }
  }

  //todo: integrate working boolean
}
