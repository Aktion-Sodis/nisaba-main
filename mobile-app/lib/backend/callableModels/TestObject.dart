import 'package:mobile_app/backend/database/DBModel.dart';

class TestObject implements DBModel {
  @override
  String? id;

  @override
  bool isPopulated = true;

  @override
  int version = 0;

  String? name;
  int age;

  TestObject(this.name, this.age, [this.id]);
}
