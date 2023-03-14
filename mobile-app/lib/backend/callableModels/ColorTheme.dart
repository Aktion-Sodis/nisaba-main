import 'package:db_model_generator/db_model_annotations.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'package:json_annotation/json_annotation.dart';

part 'ColorTheme.g.dart';
part 'ColorTheme.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class ColorTheme extends DBModel {
  // JsonSerializable factory and toJson methods
  factory ColorTheme.fromJson(Map<String, dynamic> json) =>
      _$ColorThemeFromJson(json);

  Map<String, dynamic> toJson() => _$ColorThemeToJson(this);

  String? highlight;
  String? secondaryHighlight;
  String? backgroundOneLight;
  String? backgroundTwoLight;
  String? backgroundOneDark;
  String? backgroundTwoDark;

  ColorTheme(
      {this.highlight,
      this.secondaryHighlight,
      this.backgroundOneLight,
      this.backgroundTwoLight,
      this.backgroundOneDark,
      this.backgroundTwoDark})
      : super(null);

  ColorTheme.fromAmplifyModel(amp.ColorTheme colorTheme) : super(null) {
    highlight = colorTheme.highlight;
    secondaryHighlight = colorTheme.secondaryHighlight;
    backgroundOneLight = colorTheme.backgroundOneLight;
    backgroundTwoLight = colorTheme.backgroundTwoLight;
    backgroundOneDark = colorTheme.backgroundOneDark;
    backgroundTwoDark = colorTheme.backgroundTwoDark;
  }

  amp.ColorTheme toAmplifyModel() {
    return amp.ColorTheme(
        highlight: highlight,
        secondaryHighlight: secondaryHighlight,
        backgroundOneLight: backgroundOneLight,
        backgroundTwoLight: backgroundTwoLight,
        backgroundOneDark: backgroundOneDark,
        backgroundTwoDark: backgroundTwoDark);
  }

  @override
  DBModel getUnpopulated() {
    // Do not need to implement this method
    throw UnimplementedError();
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is ColorTheme) {
      return highlight == other.highlight &&
          secondaryHighlight == other.secondaryHighlight &&
          backgroundOneLight == other.backgroundOneLight &&
          backgroundTwoLight == other.backgroundTwoLight &&
          backgroundOneDark == other.backgroundOneDark &&
          backgroundTwoDark == other.backgroundTwoDark;
    } else {
      return false;
    }
  }
}
