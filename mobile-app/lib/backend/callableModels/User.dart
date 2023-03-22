import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/Permission.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'User.g.dart';
part 'User.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class User extends DBModel {
  // JsonSerializable factory and toJson methods
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);

  static Map<String, dynamic> queryFields() => _$User;

  late String firstName;
  late String lastName;
  String? bio;

  @DBModelIgnore()
  @JsonKey(includeFromJson: false, includeToJson: true)
  List<Permission> permissions = [];

  User({
    required String? id,
    required this.firstName,
    required this.lastName,
    this.bio,
    //this.permissions,
  }) : super(id);

  User.fromAmplifyModel(amp.User user) : super(user.id) {
    id = user.id;
    firstName = user.firstName;
    lastName = user.lastName;
    bio = user.bio;
    permissions = List.generate(user.permissions.length,
        (index) => Permission.fromAmplifyModel(user.permissions[index]));
  }

  amp.User toAmplifyModel() {
    return (amp.User(
      firstName: firstName,
      lastName: lastName,
      permissions: List.generate(
          permissions.length, (index) => permissions[index].toAmplifyModel()),
      bio: bio,
      id: id,
    ));
  }

  User.fromMap(Map<dynamic, dynamic> map) : super(null) {
    id = map['id'];
    firstName = map['firstName'];
    lastName = map['lastName'];
    bio = map['bio'];
    /*permissions = List.generate(map['permissions'].length,
        (index) => Permission.fromMap(map['permissions'][index]));*/
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'bio': bio,
      // 'permissions': permissions.map((e) => e.toMap()).toList(),
    };
  }

  User.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return User.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is User) {
      return firstName == other.firstName &&
          lastName == other.lastName &&
          bio == other.bio &&
          id == other.id &&
          listEquals(permissions, other.permissions);
    }
    return false;
  }
}
