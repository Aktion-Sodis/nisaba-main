import 'package:db_model_generator/db_model_annotations.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

part 'Permission.g.dart';
part 'Permission.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Permission extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Permission.fromJson(Map<String, dynamic> json) =>
      _$PermissionFromJson(json);

  Map<String, dynamic> toJson() => _$PermissionToJson(this);

  late PermissionType permissionType;
  late List<String> allowedEntities;

  Permission({required this.permissionType, required this.allowedEntities});

  Permission.fromAmplifyModel(amp.Permission permission) {
    permissionType =
        permissionTypeFromAmplifyPermissionType(permission.permissionType);
    allowedEntities = permission.allowedEntities;
  }

  amp.Permission toAmplifyModel() {
    return (amp.Permission(
        allowedEntities: allowedEntities,
        permissionType:
            amplifyPermissionTypeFromPermissionType(permissionType)));
  }

  @override
  DBModel getUnpopulated() {
    throw UnimplementedError();
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Permission) {
      return permissionType == other.permissionType &&
          listEquals(allowedEntities, other.allowedEntities);
    } else {
      return false;
    }
  }
}

enum PermissionType {
  READ,
  CHANGEMASTERDATA,
  CREATEINTERVENTIONS,
  EXECUTESURVEYS,
  CREATESUBENTITIES,
  ADMIN
}

PermissionType permissionTypeFromAmplifyPermissionType(
    amp.PermissionType permissionType) {
  switch (permissionType) {
    case amp.PermissionType.READ:
      return PermissionType.READ;
      break;
    case amp.PermissionType.CHANGEMASTERDATA:
      return PermissionType.CHANGEMASTERDATA;
      break;
    case amp.PermissionType.CREATEINTERVENTIONS:
      return PermissionType.CREATEINTERVENTIONS;
      break;
    case amp.PermissionType.EXECUTESURVEYS:
      return PermissionType.EXECUTESURVEYS;
      break;
    case amp.PermissionType.CREATESUBENTITIES:
      return PermissionType.CREATESUBENTITIES;
      break;
    case amp.PermissionType.ADMIN:
      return PermissionType.ADMIN;
      break;
  }
}

amp.PermissionType amplifyPermissionTypeFromPermissionType(
    PermissionType permissionType) {
  switch (permissionType) {
    case PermissionType.READ:
      return amp.PermissionType.READ;
      break;
    case PermissionType.CHANGEMASTERDATA:
      return amp.PermissionType.CHANGEMASTERDATA;
      break;
    case PermissionType.CREATEINTERVENTIONS:
      return amp.PermissionType.CREATEINTERVENTIONS;
      break;
    case PermissionType.EXECUTESURVEYS:
      return amp.PermissionType.EXECUTESURVEYS;
      break;
    case PermissionType.CREATESUBENTITIES:
      return amp.PermissionType.CREATESUBENTITIES;
      break;
    case PermissionType.ADMIN:
      return amp.PermissionType.ADMIN;
      break;
  }
}
