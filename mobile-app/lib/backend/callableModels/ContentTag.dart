import 'package:mobile_app/backend/callableModels/I18nString.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import 'Content.dart';
import 'Relation.dart';

class ContentTag extends DBModel {
  String? id;
  late I18nString text_ml;
  int? schemeVersion;
  DateTime? createdAt;
  DateTime? updatedAt;
  late List<Relation<Content, ContentTag>> contents;

  String get text => text_ml.text;

  set text(String text) => text_ml.text = text;

  ContentTag(
      {this.id,
      required this.text_ml,
      this.schemeVersion,
      required this.contents,
      this.createdAt,
      this.updatedAt});

  ContentTag.fromAmplifyModel(amp.ContentTag tag) {
    id = tag.id;
    text_ml = I18nString.fromAmplifyModel(tag.text);
    schemeVersion = tag.schemeVersion;
    createdAt = tag.createdAt?.getDateTimeInUtc();
    updatedAt = tag.updatedAt?.getDateTimeInUtc();
    contents = tag.contents
        .map((e) => Relation(
            id: e.id,
            first: Content.fromAmplifyModel(e.content),
            second: ContentTag.fromAmplifyModel(e.contentTag)))
        .toList();
  }

  amp.ContentTag toAmplifyModel() {
    return amp.ContentTag(
        text: text_ml.toAmplifyModel(),
        id: id,
        schemeVersion: schemeVersion,
        contents: contents
            .map((e) => amp.ContentContentTagRelation(
                id: e.id,
                content: e.first.toAmplifyModel(),
                contentTag: e.second.toAmplifyModel()))
            .toList());
  }

  ContentTag.unpopulated(this.id) {
    isPopulated = false;
  }
  @override
  DBModel getUnpopulated() {
    return ContentTag.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is ContentTag) {
      return text_ml == other.text_ml &&
          schemeVersion == other.schemeVersion &&
          id == other.id &&
          createdAt == other.createdAt &&
          updatedAt == other.updatedAt &&
          unpopulatedListsEqual(contents, other.contents);
    } else {
      return false;
    }
  }
}
