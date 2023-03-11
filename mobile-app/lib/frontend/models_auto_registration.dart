import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/TestObject.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQGDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDBModelRegistration.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../backend/callableModels/Organization.dart';
import '../backend/callableModels/SurveyTag.dart';
import '../backend/callableModels/callableModels.dart';
import '../backend/database/db_implementations/synced_db/SyncedDB.dart';

/// User this file to register all models in the database

SyncedDB _db = SyncedDB.instance;

/*T? enumFromString<T>(Iterable<T> values, String value) {
  return (values as Iterable<T?>).firstWhere(
    (type) {
      String typeString = describeEnum(type!);
      bool isSame = typeString == value;
      return isSame;
    },
  );
}

String describeEnum<T>(T value) {
  String description = value.toString();
  if (description.contains(".")) {
    description = description.split(".").last;
  }
  return description;
}

T? translateEnum<T, G>(List<T> enumValues, G toTranslate) {
  String toTranslateString = describeEnum(toTranslate);
  return enumFromString(enumValues, toTranslateString);
}*/

void _register({
  required Type type,
  required bool haveToSyncDownstream,
  required ToDBModelConverter<Map<String, Object?>> toDBModel,
  required String createMutation,
  required String deleteMutation,
  required String updateMutation,
  required String getQuery,
  required String listQuery,
}) {
  _db.registerModel(
      type,
      SyncedDBModelRegistration(
          haveToSyncDownstream: haveToSyncDownstream,
          localDBModelRegistration:
              LocalDBModelRegistration(toDBModel: toDBModel),
          remoteDBModelRegistration: GraphQLDBModelRegistration(
              createMutation: createMutation,
              updateMutation: updateMutation,
              deleteMutation: deleteMutation,
              getQuery: getQuery,
              listQuery: listQuery,
              queryFields: TestObject.queryFields(),
              toDBModel: toDBModel)));
}

void registerModels() {
  // TestObject
  _register(
      type: TestObject,
      haveToSyncDownstream: true,
      toDBModel: TestObject.fromJson,
      createMutation: "createTestObject",
      deleteMutation: "deleteTestObject",
      updateMutation: "updateTestObject",
      getQuery: "getTestObject",
      listQuery: "listTestObjects");
}
