import 'package:mobile_app/backend/callableModels/AppliedCustomData.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class CustomData extends DBModel {
  String? id;
  late I18nString name_ml;
  late CustomDataType type;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  CustomData({required this.id, required this.name_ml, required this.type});

  CustomData.fromAmplifyModel(amp.CustomData customData) {
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

  CustomData.unpopulated(this.id) {
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
