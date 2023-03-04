import 'package:mobile_app/backend/callableModels/ColorTheme.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class Config extends DBModel {
  String? id;
  late String name;
  ColorTheme? colorTheme;
  int? schemeVersion;

  DateTime? createdAt;
  DateTime? updatedAt;

  Config(
      {this.id,
      required this.name,
      this.colorTheme,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Config.fromAmplifyModel(amp.Config config) {
    id = config.id;
    name = config.name;
    colorTheme = config.colorTheme == null
        ? null
        : ColorTheme.fromAmplifyModel(config.colorTheme!);

    schemeVersion = config.schemeVersion;
    createdAt = config.createdAt?.getDateTimeInUtc();
    updatedAt = config.updatedAt?.getDateTimeInUtc();
  }

  amp.Config toAmplifyModel() {
    return (amp.Config(
        name: name,
        colorTheme: colorTheme?.toAmplifyModel(),
        id: id,
        schemeVersion: schemeVersion));
  }

  Config.unpopulated(this.id);
  @override
  DBModel getUnpopulated() {
    return Config.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Config) {
      return name == other.name &&
          colorTheme == other.colorTheme &&
          schemeVersion == other.schemeVersion &&
          id == other.id &&
          createdAt == other.createdAt &&
          updatedAt == other.updatedAt;
    } else {
      return false;
    }
  }
}
