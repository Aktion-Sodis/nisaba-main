import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:mobile_app/db_model_generator.dart';

part 'Organization.g.dart';
part 'Organization.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Organization extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Organization.fromJson(Map<String, dynamic> json) =>
      _$OrganizationFromJson(json);

  Map<String, dynamic> toJson() => _$OrganizationToJson(this);

  String? id;
  late String nameCamelCase;
  late String nameKebabCase;
  late String nameVerbose;

  Organization(
      {required this.id,
      required this.nameCamelCase,
      required this.nameKebabCase,
      required this.nameVerbose});

  Organization.unpopulated(this.id);

  @override
  DBModel getUnpopulated() {
    return Organization.unpopulated(id);
  }

  @override
  bool operator ==(Object other) {
    if (other is Organization) {
      return id == other.id &&
          nameCamelCase == other.nameCamelCase &&
          nameKebabCase == other.nameKebabCase &&
          nameVerbose == other.nameVerbose;
    } else {
      return false;
    }
  }
}
