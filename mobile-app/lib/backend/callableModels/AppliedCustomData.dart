import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'AppliedCustomData.g.dart';
part 'AppliedCustomData.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class AppliedCustomData extends DBModel {
  // JsonSerializable factory and toJson methods
  factory AppliedCustomData.fromJson(Map<String, dynamic> json) =>
      _$AppliedCustomDataFromJson(json);

  Map<String, dynamic> toJson() => _$AppliedCustomDataToJson(this);

  late String customDataID;
  late CustomDataType type;
  late I18nString name;
  int? intValue;
  String? stringValue;
  String get displayName => name.text;

  set displayName(String name) => this.name.text = name;

  AppliedCustomData(
      {required this.customDataID,
      required this.type,
      required this.name,
      this.intValue,
      this.stringValue})
      : super(null);

  AppliedCustomData.fromAmplifyModel(amp.AppliedCustomData appliedCustomData)
      : super(null) {
    customDataID = appliedCustomData.customDataID;
    type = customDataTypeByAmplifyType(appliedCustomData.type);
    name = I18nString.fromAmplifyModel(appliedCustomData.name);
    intValue = appliedCustomData.intValue;
    stringValue = appliedCustomData.stringValue;
  }

  amp.AppliedCustomData toAmplifyModel() {
    return (amp.AppliedCustomData(
        customDataID: customDataID,
        type: ampDataTypeByCustomDataType(type),
        name: name.toAmplifyModel(),
        intValue: intValue,
        stringValue: stringValue));
  }

  AppliedCustomData.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return AppliedCustomData.unpopulated(id);
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AppliedCustomData &&
          runtimeType == other.runtimeType &&
          customDataID == other.customDataID &&
          type == other.type &&
          name == other.name &&
          intValue == other.intValue &&
          stringValue == other.stringValue;
}

enum CustomDataType { INT, STRING }

CustomDataType customDataTypeByAmplifyType(amp.Type type) {
  switch (type) {
    case amp.Type.INT:
      return CustomDataType.INT;
      break;
    case amp.Type.STRING:
      return CustomDataType.STRING;
      break;
  }
}

amp.Type ampDataTypeByCustomDataType(CustomDataType customDataType) {
  switch (customDataType) {
    case CustomDataType.INT:
      return amp.Type.INT;
      break;
    case CustomDataType.STRING:
      return amp.Type.STRING;
      break;
  }
}
