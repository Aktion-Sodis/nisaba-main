import 'package:geolocator/geolocator.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../database/DBModel.dart';

class Location extends DBModel {
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
