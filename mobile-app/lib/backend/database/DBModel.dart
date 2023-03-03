import 'package:amplify_flutter/amplify_flutter.dart';

abstract class DBModel {
  String? id;
  bool isPopulated = true;

  DBModel();
}
