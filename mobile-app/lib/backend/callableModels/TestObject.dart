import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/db_model_generator.dart';

part 'TestObject.g.dart';

part 'TestObject.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class TestObject extends DBModel {
  static Map<String, dynamic> queryFields() => _$TestObject;

  String? name;
  int age;

  TestObject(this.name, this.age, [String? id]) {
    this.id = id ?? this.id;
  }

  TestObject.unpopulated(String id, [this.age = 0]) {
    this.id = id;
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return TestObject.unpopulated(id!);
  }

  @override
  bool operator ==(Object other) {
    if (other is TestObject) {
      return name == other.name && age == other.age && id == other.id;
    } else {
      return false;
    }
  }

  factory TestObject.fromJson(Map<String, dynamic> json) =>
      _$TestObjectFromJson(json);

  Map<String, dynamic> toJson() => _$TestObjectToJson(this);
}
