import 'package:amplify_flutter/amplify_flutter.dart';

abstract class DBObject {
  String? id;
  bool isPopulated = false;
  int version = 0;

  DBObject();

  Map<String, dynamic> toMap();
  void fromMap(Map<String, dynamic> map);
}
