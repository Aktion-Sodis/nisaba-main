import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:mobile_app/backend/callableModels/AppliedIntervention.dart';
import 'package:mobile_app/backend/callableModels/Entity.dart';
import 'package:mobile_app/backend/callableModels/ExecutedSurvey.dart';
import 'package:mobile_app/backend/callableModels/Location.dart';
import 'package:mobile_app/backend/callableModels/User.dart';
import 'package:mobile_app/backend/database/DBModel.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

/// DO NOT NEED TO IMPLEMENT
class Task extends DBModel {
  late String title;
  String? text;
  DateTime? dueDate;
  DateTime? finishedDate;
  Location? location;
  late User user;
  Entity? entity;
  AppliedIntervention? appliedIntervention;
  ExecutedSurvey? executedSurvey;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  late List<int> audioList;
  late List<int> picList;

  Task(
      {String? id,
      required this.title,
      this.text,
      this.dueDate,
      this.finishedDate,
      this.location,
      required this.user,
      this.entity,
      this.appliedIntervention,
      this.executedSurvey,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt,
      required this.audioList,
      required this.picList})
      : super(id);

  Task.unpopulated(String? id) : super(id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Task.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Task &&
        other.id == id &&
        other.title == title &&
        other.text == text &&
        other.dueDate == dueDate &&
        other.finishedDate == finishedDate &&
        other.location == location &&
        other.user == user &&
        other.entity == entity &&
        other.appliedIntervention == appliedIntervention &&
        other.executedSurvey == executedSurvey &&
        other.schemeVersion == schemeVersion;
  }

  @override
  Map<String, dynamic> toJson() {
    // TODO: implement toJson
    throw UnimplementedError();
  }
}
