import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/AppliedCustomData.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'CustomData.g.dart';
part 'CustomData.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class CustomData extends DBModel {
  // JsonSerializable factory and toJson methods
  factory CustomData.fromJson(Map<String, dynamic> json) =>
      _$CustomDataFromJson(json);

  Map<String, dynamic> toJson() => _$CustomDataToJson(this);

  late I18nString name_ml;
  late CustomDataType type;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  CustomData({required String? id, required this.name_ml, required this.type})
      : super(id);

  CustomData.fromAmplifyModel(amp.CustomData customData)
      : super(customData.id) {
    id = customData.id;
    name_ml = I18nString.fromAmplifyModel(customData.name);
    type = customDataTypeByAmplifyType(customData.type);
  }

  amp.CustomData toAmplifyModel() {
    return (amp.CustomData(
        name: name_ml.toAmplifyModel(),
        type: ampDataTypeByCustomDataType(type),
        id: id));
  }

  CustomData.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return CustomData.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is CustomData) {
      return name_ml == other.name_ml && type == other.type && id == other.id;
    }
    return false;
  }
}
