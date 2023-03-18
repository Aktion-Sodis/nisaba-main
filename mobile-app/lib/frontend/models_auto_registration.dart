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
  required Map<String, dynamic> queryFields,
  Map<String, Object?> Function(Map<String, Object?>)? toDBModelPreprocessor,
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
              queryFields: queryFields,
              toDBModel: toDBModel,
              toDBModelPreprocessor: toDBModelPreprocessor)));
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
      listQuery: "listTestObjects",
      queryFields: TestObject.queryFields());

  // Level
  _register(
      type: Level,
      haveToSyncDownstream: true,
      toDBModel: Level.fromJson,
      createMutation: "createLevel",
      deleteMutation: "deleteLevel",
      updateMutation: "updateLevel",
      getQuery: "getLevel",
      listQuery: "listLevels",
      queryFields: Level.queryFields());

  // Entity
  _register(
      type: Entity,
      haveToSyncDownstream: true,
      toDBModel: Entity.fromJson,
      createMutation: "createEntity",
      deleteMutation: "deleteEntity",
      updateMutation: "updateEntity",
      getQuery: "getEntity",
      listQuery: "listEntities",
      queryFields: Entity.queryFields());

  // Intervention
  _register(
      type: Intervention,
      haveToSyncDownstream: true,
      toDBModel: Intervention.fromJson,
      createMutation: "createIntervention",
      deleteMutation: "deleteIntervention",
      updateMutation: "updateIntervention",
      getQuery: "getIntervention",
      listQuery: "listInterventions",
      queryFields: Intervention.queryFields(),
      toDBModelPreprocessor: (p0) {
        p0["surveys"] = (p0["surveys"] as Map)["items"];
        return p0;
      });

  // Survey
  /*_register(
      type: Survey,
      haveToSyncDownstream: true,
      toDBModel: Survey.fromJson,
      createMutation: "createSurvey",
      deleteMutation: "deleteSurvey",
      updateMutation: "updateSurvey",
      getQuery: "getSurvey",
      listQuery: "listSurveys",
      queryFields: Survey.queryFields());*/

  // AppliedIntervention
  _register(
      type: AppliedIntervention,
      haveToSyncDownstream: true,
      toDBModel: AppliedIntervention.fromJson,
      createMutation: "createAppliedIntervention",
      deleteMutation: "deleteAppliedIntervention",
      updateMutation: "updateAppliedIntervention",
      getQuery: "getAppliedIntervention",
      listQuery: "listAppliedInterventions",
      queryFields: AppliedIntervention.queryFields());

  // LevelInterventionRelation
  _register(
      type: LevelInterventionRelation,
      haveToSyncDownstream: true,
      toDBModel: LevelInterventionRelation.fromJson,
      createMutation: "createLevelInterventionRelation",
      deleteMutation: "deleteLevelInterventionRelation",
      updateMutation: "updateLevelInterventionRelation",
      getQuery: "getLevelInterventionRelation",
      listQuery: "listLevelInterventionRelations",
      queryFields: LevelInterventionRelation.queryFields());

  // ExecutedSurvey
  _register(
      type: ExecutedSurvey,
      haveToSyncDownstream: true,
      toDBModel: ExecutedSurvey.fromJson,
      createMutation: "createExecutedSurvey",
      deleteMutation: "deleteExecutedSurvey",
      updateMutation: "updateExecutedSurvey",
      getQuery: "getExecutedSurvey",
      listQuery: "listExecutedSurveys",
      queryFields: ExecutedSurvey.queryFields());
}
