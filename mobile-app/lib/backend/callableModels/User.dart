import 'package:mobile_app/backend/callableModels/Permission.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class User {
  String? id;
  late String firstName;
  late String lastName;
  String? bio;
  late List<Permission> permissions;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  User(
      {required this.id,
      required this.firstName,
      required this.lastName,
      this.bio,
      required this.permissions,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  User.fromAmplifyModel(amp.User user) {
    id = user.id;
    firstName = user.firstName;
    lastName = user.lastName;
    bio = user.bio;
    permissions = List.generate(user.permissions.length,
        (index) => Permission.fromAmplifyModel(user.permissions[index]));
    schemeVersion = user.schemeVersion;
    createdAt = user.createdAt?.getDateTimeInUtc();
    updatedAt = user.updatedAt?.getDateTimeInUtc();
  }

  amp.User toAmplifyModel() {
    return (amp.User(
      firstName: firstName,
      lastName: lastName,
      permissions: List.generate(
          permissions.length, (index) => permissions[index].toAmplifyModel()),
      bio: bio,
      schemeVersion: schemeVersion,
      id: id,
    ));
  }

  User.fromMap(Map<dynamic, dynamic> map) {
    id = map['id'];
    firstName = map['firstName'];
    lastName = map['lastName'];
    bio = map['bio'];
    /*permissions = List.generate(map['permissions'].length,
        (index) => Permission.fromMap(map['permissions'][index]));*/
    schemeVersion = map['schemeVersion'];
    createdAt = map['createdAt'];
    updatedAt = map['updatedAt'];
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'bio': bio,
      // 'permissions': permissions.map((e) => e.toMap()).toList(),
      'schemeVersion': schemeVersion,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }
}
