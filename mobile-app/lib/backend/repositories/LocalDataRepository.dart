import 'package:hive/hive.dart';
import 'package:mobile_app/frontend/strings.dart';
import 'package:mobile_app/utils/hive_db_helper.dart';

import '../callableModels/User.dart';

class LocalDataRepository {
  static final LocalDataRepository instance = LocalDataRepository();

  Box get _table => HiveDBHelper.instance.getBox(HiveDBBoxNames.localData);

  String? get locale => _table.get("locale");
  set locale(String? value) => _table.put("locale", value);

  bool get wifiOnly => _table.get("wifiOnly", defaultValue: true);
  bool? get wifiOnlyRawValue => _table.get("wifiOnly");
  set wifiOnly(bool value) => _table.put("wifiOnly", value);

  String get organizationID {
    String? result = _table.get("organizationID");
    if (result == null) {
      // TODO: throw an exception and log out
      print('exception because organizationID is null');
      return "unknown";
    }
    return result;
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

  User? get user {
    try {
      return User.fromMap(_table.get("user"));
    } catch (e) {
      return null;
    }
  }

  set user(User? value) => _table.put("user", value?.toMap());
}
