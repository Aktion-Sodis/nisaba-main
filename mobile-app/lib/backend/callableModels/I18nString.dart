import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/frontend/strings.dart' as str;
import 'package:path/path.dart';

import 'package:json_annotation/json_annotation.dart';

part 'I18nString.g.dart';
part 'I18nString.db_model.dart';

@DBModelAnnotation(true)
@JsonSerializable()
class I18nString extends DBModel {
  // JsonSerializable factory and toJson methods
  factory I18nString.fromJson(Map<String, dynamic> json) =>
      _$I18nStringFromJson(json);

  Map<String, dynamic> toJson() => _$I18nStringToJson(this);

  late List<String> languageKeys;
  late List<String> languageTexts;

  @override
  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: false)
  String id = "";

  @JsonKey(includeFromJson: false, includeToJson: false)
  @DBModelIgnore()
  String get text {
    if (languageKeys.contains(str.currentLanguage)) {
      int index = languageKeys.indexOf(str.currentLanguage);
      if (languageTexts[index] != "") {
        return languageTexts[index];
      } else {
        String toReturn = languageTexts.firstWhere((element) => element != "",
            orElse: () => "");
        return toReturn;
      }
    } else {
      String toReturn = languageTexts.firstWhere((element) => element != "",
          orElse: () => "");
      return toReturn;
    }
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @DBModelIgnore()
  set text(String text) {
    if (languageKeys.contains(str.currentLanguage)) {
      int index = languageKeys.indexOf(str.currentLanguage);
      languageTexts[index] = text;
    } else {
      List<String> languageKeysToSet = List.from(languageKeys);
      List<String> languageTextesToSet = List.from(languageKeys);
      languageKeysToSet.add(str.currentLanguage);
      languageTextesToSet.add(text);
      languageKeys = languageKeysToSet;
      languageTexts = languageTextesToSet;
    }
  }

  I18nString({required this.languageKeys, required this.languageTexts})
      : super(null);

  I18nString.fromString({String? string}) : super(null) {
    languageKeys = [str.currentLanguage];
    languageTexts = [string ?? ""];
  }

  I18nString.fromAmplifyModel(amp.I18nString I18nString) : super(null) {
    languageKeys = I18nString.languageKeys;
    languageTexts = I18nString.languageTexts;
  }

  amp.I18nString toAmplifyModel() {
    List<String> sortedkeys =
        List.generate(languageKeys.length, (index) => languageKeys[index]);
    sortedkeys.sort();
    List<String> sortedLanguageTextes = [];
    for (String key in sortedkeys) {
      int index = languageKeys.indexOf(key);
      sortedLanguageTextes.add(languageTexts[index]);
    }
    return amp.I18nString(
        languageKeys: sortedkeys, languageTexts: sortedLanguageTextes);
  }

  @override
  DBModel getUnpopulated() {
    // Unnecessary
    throw UnimplementedError();
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is I18nString) {
      return listEquals(languageKeys, other.languageKeys) &&
          listEquals(languageTexts, other.languageTexts);
    } else {
      return false;
    }
  }
}
