import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/callableModels/Intervention.dart';
import 'package:mobile_app/backend/callableModels/ContentTag.dart';
import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ContentContentTagRelation.dart';
import 'package:mobile_app/models/InterventionContentRelation.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;

class Content extends DBModel {
  String? id;
  late I18nString name_ml;
  late I18nString description_ml;
  late List<Relation<Intervention, Content>>
      interventions; //many to many -> maybe change
  late List<Relation<Content, ContentTag>> tagConnections;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;

  String get name => name_ml.text;

  set name(String name) => name_ml.text = name;

  String get description => description_ml.text;

  set description(String description) => description_ml.text = description;

  List<ContentTag> get tags => tagConnections.map((e) => e.second).toList();

  void addContentTag(ContentTag contentTag) {
    tagConnections.add(Relation(first: this, second: contentTag));
  }

  void updateContentTag(ContentTag contentTag) {
    int index = tagConnections
        .indexWhere((element) => element.second.id == contentTag.id);
    if (index >= 0) {
      tagConnections[index].second = contentTag;
    } else {
      addContentTag(contentTag);
    }
  }

  Content(
      {required this.id,
      required this.name_ml,
      required this.description_ml,
      required this.interventions,
      required this.tagConnections,
      this.schemeVersion,
      this.createdAt,
      this.updatedAt});

  Content.fromAmplifyModel(amp.Content content) {
    id = content.id;
    name_ml = I18nString.fromAmplifyModel(content.name);
    description_ml = I18nString.fromAmplifyModel(content.description);
    interventions = content.interventions
        .map((e) => Relation(
            id: e.id,
            first: Intervention.fromAmplifyModel(e.intervention),
            second: Content.fromAmplifyModel(e.content)))
        .toList();
    tagConnections = content.tags
        .map((e) => Relation(
            id: e.id,
            first: Content.fromAmplifyModel(e.content),
            second: ContentTag.fromAmplifyModel(e.contentTag)))
        .toList();
    schemeVersion = content.schemeVersion;
    createdAt = content.createdAt?.getDateTimeInUtc();
    updatedAt = content.updatedAt?.getDateTimeInUtc();
  }

  amp.Content toAmplifyModel() {
    return (amp.Content(
        id: id,
        name: name_ml.toAmplifyModel(),
        description: description_ml.toAmplifyModel(),
        interventions: interventions
            .map((e) => InterventionContentRelation(
                id: e.id,
                intervention: e.first.toAmplifyModel(),
                content: e.second.toAmplifyModel()))
            .toList(),
        tags: tagConnections
            .map((e) => ContentContentTagRelation(
                id: e.id,
                content: e.first.toAmplifyModel(),
                contentTag: e.second.toAmplifyModel()))
            .toList(),
        schemeVersion: schemeVersion));
  }

  Content.unpopulated(this.id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return Content.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Content) {
      return name_ml == other.name_ml &&
          description_ml == other.description_ml &&
          id == other.id &&
          schemeVersion == other.schemeVersion &&
          createdAt == other.createdAt &&
          updatedAt == other.updatedAt &&
          listEquals(interventions.map((e) => e.getUnpopulated()).toList(),
              other.interventions.map((e) => e.getUnpopulated()).toList()) &&
          listEquals(tagConnections.map((e) => e.getUnpopulated()).toList(),
              other.tagConnections.map((e) => e.getUnpopulated()).toList());
    } else {
      return false;
    }
  }
}
