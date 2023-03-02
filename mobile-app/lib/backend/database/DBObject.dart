import 'package:amplify_flutter/amplify_flutter.dart';

abstract class DBObject {
  String? id;
  bool isPopulated = true;
  int version = 0;

  DBObject();
}
