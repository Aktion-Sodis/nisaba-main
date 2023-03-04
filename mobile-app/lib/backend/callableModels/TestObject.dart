import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

class TestObject extends DBModel {
  @override
  String? id;

  String? name;
  int age;

  TestObject(this.name, this.age, [this.id]);

  TestObject.unpopulated(this.id, [this.age = 0]) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return TestObject.unpopulated(id);
  }

  @override
  bool operator ==(Object other) {
    if (other is TestObject) {
      return name == other.name && age == other.age && id == other.id;
    } else {
      return false;
    }
  }
}
