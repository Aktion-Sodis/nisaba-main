class GraphQLJsonConverter {
  static String dateToJson(DateTime date) {
    return date.toUtc().toIso8601String();
  }

  static DateTime dateFromJson(String dateAsString) {
    return DateTime.parse(dateAsString).toLocal();
  }

  static Map<String, Object?> enumToJson(Object enumValue) {
    String value = enumValue.toString().split('.').last;
    return {
      "__isEnum": true,
      "value": value,
    };
  }

  static Object? readEnumValue(Map<dynamic, dynamic> map, String input) {
    if (map[input] is Map && map[input]["__isEnum"] == true) {
      return map[input]["value"];
    } else {
      return map[input];
    }
  }
}
