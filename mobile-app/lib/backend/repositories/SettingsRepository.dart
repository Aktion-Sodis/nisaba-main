import 'package:hive/hive.dart';
import 'package:mobile_app/frontend/strings.dart';
import 'package:mobile_app/services/hive_db_helper.dart';

class SettingsRepository {
  static final SettingsRepository instance = SettingsRepository();

  Box get _table => HiveDBHelper.instance.getBox("settings");

  String? get locale => _table.get("locale");
  set locale(String? value) => _table.put("locale", value);

  bool get wifiOnly => _table.get("wifiOnly", defaultValue: true);
  bool? get wifiOnlyRawValue => _table.get("wifiOnly");
  set wifiOnly(bool value) => _table.put("wifiOnly", value);

  String get organizationID {
    String? result = _table.get("organizationID");
    if (result == null) {
      // TODO: throw an exception and log out
      return "unknown";
    }
    return result!;
  }

  set organizationID(String? value) => _table.put("organizationID", value);

  String? get organizationNameVerbose => _table.get("organizationNameVerbose");
  set organizationNameVerbose(String? value) =>
      _table.put("organizationNameVerbose", value);

  String? get organizationNameCamelCase =>
      _table.get("organizationNameCamelCase");
  set organizationNameCamelCase(String? value) =>
      _table.put("organizationNameCamelCase", value);

  String? get organizationNameKebabCase =>
      _table.get("organizationNameKebabCase");
  set organizationNameKebabCase(String? value) =>
      _table.put("organizationNameKebabCase", value);
}
