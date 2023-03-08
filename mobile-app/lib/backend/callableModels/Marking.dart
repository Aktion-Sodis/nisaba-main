import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:json_annotation/json_annotation.dart';

import '../../db_model_generator.dart';

part 'Marking.g.dart';
part 'Marking.db_model.dart';

@DBModelAnnotation()
@JsonSerializable()
class Marking extends DBModel {
  // JsonSerializable factory and toJson methods
  factory Marking.fromJson(Map<String, dynamic> json) =>
      _$MarkingFromJson(json);

  Map<String, dynamic> toJson() => _$MarkingToJson(this);

  late double x;
  late double y;
  late double rx;
  late double ry;
  late String text;

  Marking(
      {required this.x,
      required this.y,
      required this.rx,
      required this.ry,
      required this.text});

  amp.Marking toAmplifyModel() =>
      amp.Marking(x: x, y: y, rx: rx, ry: ry, text: text);

  Marking.fromAmplifyModel(amp.Marking marking) {
    x = marking.x;
    y = marking.y;
    rx = marking.rx;
    ry = marking.ry;
    text = marking.text;
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
    if (other is Marking) {
      return x == other.x &&
          y == other.y &&
          rx == other.rx &&
          ry == other.ry &&
          text == other.text;
    } else {
      return false;
    }
  }
}
