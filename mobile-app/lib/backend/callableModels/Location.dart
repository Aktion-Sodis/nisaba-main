import 'package:db_model_generator/db_model_annotations.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../database/DBModel.dart';
import 'package:json_annotation/json_annotation.dart';

part 'Location.g.dart';
part 'Location.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Location extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Location.fromJson(Map<String, dynamic> json) =>
      _$LocationFromJson(json);

  Map<String, dynamic> toJson() => _$LocationToJson(this);

  double? latitude;
  double? longitude;

  Location({this.latitude, this.longitude});

  Location.fromAmplifyModel(amp.Location location) {
    latitude = location.latitude;
    longitude = location.longitude;
  }

  Location.fromPosition(Position position) {
    latitude = position.latitude;
    longitude = position.longitude;
  }

  amp.Location toAmplifyModel() {
    return (amp.Location(latitude: latitude, longitude: longitude));
  }

  @override
  String? id;

  @override
  bool isPopulated = true;

  @override
  DBModel getUnpopulated() {
    throw UnimplementedError();
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Location) {
      return latitude == other.latitude && longitude == other.longitude;
    } else {
      return false;
    }
  }
}
