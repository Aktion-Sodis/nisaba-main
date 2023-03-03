import 'package:mobile_app/backend/database/DBObject.dart';

class TestObject implements DBObject {
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
