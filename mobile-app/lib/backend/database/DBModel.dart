import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:json_annotation/json_annotation.dart';

/// Child classes have to implement following methods besides the
/// offered by abstract class DBModel:
/// - constructor unpopulated(String? id)
/// - operator ==(Object other)
/// - DBModel getUnpopulated()
///

abstract class DBModel {
  // TODO: change Sting? to String
  String id = UUID.getUUID();

  @JsonKey(includeFromJson: false, includeToJson: false)
  bool isPopulated = true;

  // This has to return a new instance of the class with only the id set
  DBModel getUnpopulated();

  DBModel(String? id) {
    this.id = id ?? this.id;
  }

  bool operator ==(Object other) {
    throw UnimplementedError();
  }

  Map<String, dynamic> toJson();

  bool unpopulatedListsEqual(List<DBModel> a, List<DBModel> b) {
    List<DBModel> aUnpopulated = a.map((e) => e.getUnpopulated()).toList();
    List<DBModel> bUnpopulated = b.map((e) => e.getUnpopulated()).toList();

    return listEquals(aUnpopulated, bUnpopulated);
  }
}

class DBModelConverter implements JsonConverter<DBModel, Map<String, Object?>> {
  const DBModelConverter._internal();
  static const DBModelConverter instance = DBModelConverter._internal();

  // TODO: Implement this method
  @override
  DBModel fromJson(Map<String, Object?> json) =>
      throw UnsupportedError("DBModelConverter supports only `toJson` method");

  @override
  Map<String, Object?> toJson(DBModel object) => object.toJson();
}
