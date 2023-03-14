import 'package:flutter/material.dart';
import 'package:mobile_app/backend/callableModels/InterventionTag.dart';
import 'package:mobile_app/backend/callableModels/Organization.dart';
import 'package:mobile_app/backend/callableModels/Relation.dart';
import 'package:mobile_app/backend/callableModels/SurveyTag.dart';
import 'package:mobile_app/backend/callableModels/TestObject.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDB.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueueObject.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDBModelRegistration.dart';
import 'package:mobile_app/frontend/models_auto_registration.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await syncedDBModelsIntegrationTest();
}

Future<void> syncedDBModelsIntegrationTest() async {
  print("DBTest: Starting syncedDBModelsIntegrationTest");

  SyncedDB syncedDB = SyncedDB.instance;
  await syncedDB.localDB.initLocalDB();
  registerModels();

  List<Type> registeredTypes = syncedDB.getRegisteredModelTypes();

  for (Type type in registeredTypes) {
    print("--------------------");
    print("DBTest: Testing model: $type");
    testModel(type);
  }

  print("DBTest: syncedDBModelsIntegrationTest finished");
}

void testModel(Type type) {
  print("Starting test for " + type.toString());
  assert(_instances[type] != null);
  testEqualsOperation(type);
  testModelTransformations(type);
  print("Test for " + type.toString() + " finished");
}

void testEqualsOperation(Type type) {
  SyncedDBModelRegistration modelRegistration =
      SyncedDB.instance.getRegisteredModel(type);

  DBModel instance1 = _instances[type]!("object1");
  DBModel instance2 = _instances[type]!("object2");
  DBModel instance3 = _instances[type]!("object1");

  assert(instance1 != instance2);
  assert(instance1 == instance3);
}

void testModelTransformations(Type type) {
  SyncedDBModelRegistration modelRegistration =
      SyncedDB.instance.getRegisteredModel(type);

  testModelTransformationOnRegistration(
      type, modelRegistration.localDBModelRegistration);
  testModelTransformationOnRegistration(
      type, modelRegistration.remoteDBModelRegistration);
}

void testModelTransformationOnRegistration(
    Type type, DBModelRegistration modelRegistration) {
  // Check if the model can be transformed withouth errors
  DBModel instance1 = _instances[type]!("object1");
  var map = modelRegistration.fromDBModel(instance1);
  DBModel? instance2 = modelRegistration.toDBModel(map);

  // Check if the model is the same after transformation
  assert(instance1 == instance2);

  // Check if null is returned when the input is null
  DBModel? instance3 = modelRegistration.toDBModel(null);
  DBModel? instance4 = modelRegistration.fromDBModel(null);
  assert(instance3 == null);
  assert(instance4 == null);
}

final Map<Type, DBModel Function(String id)> _instances = {
  TestObject: (id) => TestObject("Name", 1, id),
  I18nString: (id) => I18nString(languageKeys: ["en"], languageTexts: [id]),
  AppliedCustomData: (id) => AppliedCustomData(
      customDataID: id,
      type: CustomDataType.STRING,
      name_ml:
          I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
      stringValue: "string value",
      intValue: 1),
  AppliedIntervention: (id) => AppliedIntervention(
        id: id,
        whoDidIt: User.unpopulated("user id"),
        intervention: Intervention.unpopulated("intervention id"),
        entity: Entity.unpopulated("entity id"),
        location: Location(latitude: 1, longitude: 2),
        schemeVersion: 3,
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        isOkay: true,
        executedSurveys: [],
      ),
  ColorTheme: (id) => ColorTheme(
        backgroundOneDark: "backgroundOneDark" + id,
        backgroundOneLight: "backgroundOneLight",
        backgroundTwoDark: "backgroundTwoDark",
        backgroundTwoLight: "backgroundTwoLight",
        highlight: "highlight",
        secondaryHighlight: "secondaryHighlight",
      ),
  Config: (id) => Config(
        id: id,
        name: "name",
        colorTheme: ColorTheme(
            backgroundOneDark: "backgroundOneDark",
            backgroundOneLight: "backgroundOneLight",
            backgroundTwoDark: "backgroundTwoDark",
            backgroundTwoLight: "backgroundTwoLight",
            highlight: "highlight",
            secondaryHighlight: "secondaryHighlight"),
        schemeVersion: 1,
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
      ),
  Content: (id) => Content(
        id: id,
        schemeVersion: 1,
        interventions: [
          InterventionContentRelation(
              first: Intervention.unpopulated("intervention1"),
              second: Content.unpopulated("content1")),
          InterventionContentRelation(
              first: Intervention.unpopulated("intervention2"),
              second: Content.unpopulated("content2")),
        ],
        tagConnections: [
          ContentContentTagRelation(
              first: Content.unpopulated("content1"),
              second: ContentTag.unpopulated("contenttag1")),
        ],
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        description_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
      ),
  ContentContentTagRelation: (id) => ContentContentTagRelation(
      id: id,
      first: Content.unpopulated("survey1"),
      second: ContentTag.unpopulated("surveyTag1")),
  ContentTag: (id) => ContentTag(
        id: id,
        schemeVersion: 1,
        text_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        contents: [
          ContentContentTagRelation(
              id: "relation id1",
              first: Content.unpopulated("content1"),
              second: ContentTag.unpopulated("contenttag1")),
          ContentContentTagRelation(
              id: "relation id2",
              first: Content.unpopulated("content2"),
              second: ContentTag.unpopulated("contenttag1")),
        ],
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
      ),
  CustomData: (id) => CustomData(
        id: id,
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        type: CustomDataType.STRING,
      ),
  Entity: (id) => Entity(
        id: id,
        schemeVersion: 1,
        parentEntityID: "parentEntityID",
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        description_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
        location: Location(latitude: 1, longitude: 2),
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        customData: [
          AppliedCustomData(
              customDataID: "customDataID",
              type: CustomDataType.STRING,
              name_ml: I18nString(
                  languageKeys: ["en"], languageTexts: ["language text"]),
              stringValue: "string value",
              intValue: 1),
        ],
        appliedInterventions: [
          AppliedIntervention(
            id: "appliedInterventionID",
            whoDidIt: User.unpopulated("user id"),
            intervention: Intervention.unpopulated("intervention id"),
            entity: Entity.unpopulated("entity id"),
            location: Location(latitude: 1, longitude: 2),
            schemeVersion: 3,
            createdAt: DateTime(1999, 21, 12),
            updatedAt: DateTime(1999, 22, 12),
            isOkay: true,
            executedSurveys: [],
          ),
        ],
        level: Level.unpopulated("level id"),
      ),
  ExecutedSurvey: (id) => ExecutedSurvey(
        id: id,
        schemeVersion: 1,
        survey: Survey.unpopulated("survey id"),
        whoExecutedIt: User.unpopulated("user id"),
        date: DateTime(1999, 23, 12),
        location: Location(latitude: 1, longitude: 2),
        appliedIntervention:
            AppliedIntervention.unpopulated("appliedIntervention id"),
        answers: [
          QuestionAnswer(
              questionID: "questionID",
              date: DateTime(1999, 24, 12),
              type: QuestionType.AUDIO)
        ],
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
      ),
  Intervention: (id) => Intervention(
        id: id,
        schemeVersion: 1,
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        description_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        interventionContentRelations: [
          InterventionContentRelation(
              first: Intervention.unpopulated("intervention1"),
              second: Content.unpopulated("content1")),
          InterventionContentRelation(
              first: Intervention.unpopulated("intervention2"),
              second: Content.unpopulated("content2")),
        ],
        interventionType: InterventionType.EDUCATION,
        levelConnections: [],
        surveys: [],
        tagConnections: [],
      ),
  InterventionContentRelation: (id) => InterventionContentRelation(
      id: id,
      first: Intervention.unpopulated("survey1"),
      second: Content.unpopulated("surveyTag1")),
  InterventionInterventionTagRelation: (id) =>
      InterventionInterventionTagRelation(
          id: id,
          first: Intervention.unpopulated("survey1"),
          second: InterventionTag.unpopulated("surveyTag1")),
  Level: (id) => Level(
        id: id,
        parentLevelID: "parentLevelID",
        interventionsAreAllowed: true,
        allowedInterventions: [
          LevelInterventionRelation(
              id: "relation id1",
              first: Level.unpopulated("level1"),
              second: Intervention.unpopulated("intervention1")),
        ],
        schemeVersion: 1,
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        description_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        customData: [
          CustomData(
              id: "customDataID",
              name_ml: I18nString(
                  languageKeys: ["en"], languageTexts: ["language text"]),
              type: CustomDataType.STRING),
        ],
      ),
  Location: (id) => Location(
        latitude: double.parse(id),
        longitude: 2,
      ),
  Marking: (id) => Marking(
        x: 1,
        y: 2,
        rx: 3,
        ry: 4,
        text: id,
      ),
  Permission: (id) => Permission(
        permissionType: PermissionType.ADMIN,
        allowedEntities: ["entity1", "entity2" + id],
      ),
  Organization: (id) => Organization(
      id: id,
      nameCamelCase: "nameCamelCase",
      nameKebabCase: "nameKebabCase",
      nameVerbose: "nameVerbose"),
  Question: (id) => Question(
        id: id,
        questionOptions: [
          QuestionOption(
              id: "questionOptionID",
              text_ml: I18nString(
                  languageKeys: ["en"], languageTexts: ["language text1"]))
        ],
        type: QuestionType.AUDIO,
        isFollowUpQuestion: true,
        text_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
      ),
  QuestionAnswer: (id) => QuestionAnswer(
        id: id,
        questionID: "questionID",
        date: DateTime(1999, 24, 12),
        type: QuestionType.AUDIO,
        intValue: 1,
        doubleValue: 2,
        rating: 3,
        text: "text",
        markings: [Marking(x: 1, y: 2, rx: 3, ry: 4, text: "marking text")],
        questionOptions: [
          QuestionOption(
              id: "questionOptionID",
              text_ml: I18nString(
                  languageKeys: ["en"], languageTexts: ["language text1"]))
        ],
      ),
  QuestionOption: (id) => QuestionOption(
        id: id,
        text_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text1"]),
        followUpQuestionIDs: ["followUpQuestionID"],
      ),
  Survey: (id) => Survey(
        id: id,
        schemeVersion: 1,
        name_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text"]),
        description_ml:
            I18nString(languageKeys: ["en"], languageTexts: ["language text2"]),
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        questions: [
          Question(
              id: "questionID",
              questionOptions: [
                QuestionOption(
                    id: "questionOptionID",
                    text_ml: I18nString(
                        languageKeys: ["en"],
                        languageTexts: ["language text1"]))
              ],
              type: QuestionType.AUDIO,
              isFollowUpQuestion: true,
              text_ml: I18nString(
                  languageKeys: ["en"], languageTexts: ["language text2"]))
        ],
        tagConnections: [],
        surveyType: SurveyType.INITIAL,
        archived: true,
        intervention: Intervention.unpopulated("intervention id"),
      ),
  SurveySurveyTagRelation: (id) => SurveySurveyTagRelation(
      id: id,
      first: Survey.unpopulated("survey1"),
      second: SurveyTag.unpopulated("surveyTag1")),
  SurveyTag: (id) => SurveyTag(
          id: id,
          schemeVersion: 1,
          createdAt: DateTime(1999, 21, 12),
          updatedAt: DateTime(1999, 22, 12),
          text_ml: I18nString(
              languageKeys: ["en"], languageTexts: ["language text"]),
          surveys: [
            SurveySurveyTagRelation(
                id: "relation id1",
                first: Survey.unpopulated("survey1"),
                second: SurveyTag.unpopulated("surveyTag1")),
          ]),
  User: (id) => User(
        id: id,
        schemeVersion: 1,
        firstName: "firstName",
        lastName: "lastName",
        permissions: [
          Permission(
              permissionType: PermissionType.ADMIN,
              allowedEntities: ["entity1", "entity2"])
        ],
        createdAt: DateTime(1999, 21, 12),
        updatedAt: DateTime(1999, 22, 12),
        bio: "bio",
      ),
};
