import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/utils/amplify.dart';

import '../../backend/callableModels/Entity.dart';
import '../../backend/callableModels/Relation.dart';

class AmplifyApiTest extends StatelessWidget {
  const AmplifyApiTest({Key? key}) : super(key: key);

  Future<void> _createOrganization() async {
    try {
      final response = await Amplify.API
          .mutate(
              request: ModelMutations.create(amp.Organization(
                  nameCamelCase: "nisaba",
                  nameKebabCase: "nisaba",
                  nameVerbose: "Nisaba")))
          .response;
      print("SUCCESSFUL");
    } on ApiException catch (e) {
      safePrint('Mutation failed: $e');
    }
  }

  Future<void> _createLevel() async {
    try {
      final response = await Amplify.API
          .mutate(
              request: ModelMutations.create(amp.Level(
                  name: amp.I18nString(
                      languageKeys: ["en"], languageTexts: ["name"]),
                  description: amp.I18nString(
                      languageKeys: ["en"], languageTexts: ["description"]),
                  interventionsAreAllowed: true,
                  customData: [])))
          .response;
      print("SUCCESSFUL");
      print(response.errors);
    } on ApiException catch (e) {
      safePrint('Mutation failed: $e');
    }
  }

  Future<void> _createLevelAndIntervention() async {
    try {
      final createLevelResponse = await Amplify.API
          .mutate(
              request: ModelMutations.create(amp.Level(
            name: amp.I18nString(
                languageKeys: ["en"], languageTexts: ["My test level"]),
            description: amp.I18nString(
                languageKeys: ["en"], languageTexts: ["description"]),
            interventionsAreAllowed: true,
            customData: [],
          )))
          .response;

      final createInterventionResponse = await Amplify.API
          .mutate(
              request: ModelMutations.create(amp.Intervention(
                  name: amp.I18nString(
                      languageKeys: ["en"],
                      languageTexts: ["My test intervention"]),
                  description: amp.I18nString(
                      languageKeys: ["en"], languageTexts: ["description"]),
                  interventionType: amp.InterventionType.EDUCATION,
                  contents: [],
                  surveys: [],
                  tags: [],
                  levels: [])))
          .response;

      // Print the level id and intervention id
      print("Level: " + createLevelResponse.data!.id);
      print("Intervention: " + createInterventionResponse.data!.id);

      // Fetch the level and intervention we just created
      final fetchLevelResponse = await Amplify.API
          .query(
              request: ModelQueries.get(
                  amp.Level.classType, createLevelResponse.data!.id))
          .response;
      final fetchInterventionResponse = await Amplify.API
          .query(
              request: ModelQueries.get(amp.Intervention.classType,
                  createInterventionResponse.data!.id))
          .response;

      final amp.LevelInterventionRelation levelInterventionRelation =
          amp.LevelInterventionRelation(
              id: UUID.getUUID(),
              level: fetchLevelResponse.data!,
              intervention: fetchInterventionResponse.data!);

      final updatedLevel = fetchLevelResponse.data!
          .copyWith(allowedInterventions: [levelInterventionRelation]);

      // Update the level with the relation

      final updateLevelResponse = await Amplify.API
          .mutate(request: ModelMutations.update(updatedLevel))
          .response;

      var query = ModelMutations.create(levelInterventionRelation);

      print(query.variables);
      print(query.document);

      print(query);

      /*// Create a relation between the level and the intervention
      final createRelationResponse = await Amplify.API
          .mutate(request: ModelMutations.create(levelInterventionRelation))
          .response;*/

      // Fetch a list of interventions, which have the level
      // we just created
      final fetchResponse = await Amplify.API
          .query(
              request: ModelQueries.list(
            amp.LevelInterventionRelation.classType,
            /*where: amp.LevelInterventionRelation.ALLOWEDINTERVENTIONS.contains(
              createInterventionResponse.data!.id,
            ),*/
          ))
          .response;

      print(fetchResponse);

      print("SUCCESSFUL");
    } on ApiException catch (e) {
      safePrint('Mutation failed: $e');
    }
  }

  Future<void> _createMutationManually() async {
    try {
      var document =
          "mutation createLevelInterventionRelation(\$input: CreateLevelInterventionRelationInput!, \$condition:  ModelLevelInterventionRelationConditionInput) { createLevelInterventionRelation(input: \$input, condition: \$condition) { id createdAt updatedAt level { id name { languageKeys languageTexts } description { languageKeys languageTexts } parentLevelID interventionsAreAllowed customData { id name { languageKeys languageTexts } type } schemeVersion createdAt updatedAt } intervention { id name { languageKeys languageTexts } description { languageKeys languageTexts } interventionType schemeVersion createdAt updatedAt } } }";

      String levelID = "8a9d5b7b-729f-4fd6-850e-b227e567f5b7";
      String interventionID = "6829220d-35d5-4b19-9eef-f1a1cbdd9b9c";

      var variables = {
        "input": {
          "id": "a1b2c3d4",
          "levelId": levelID,
          "interventionId": interventionID
        }
      };

      var request = GraphQLRequest(document: document, variables: variables);

      final response = await Amplify.API.mutate(request: request).response;

      print(response.data);
    } on ApiException catch (e) {
      safePrint('Mutation failed: $e');
    }
  }

  Future<void> _getMyOrganizationData() async {
    String organizationID = LocalDataRepository.instance.organizationID;
    print("My organization ID: " + organizationID);

    try {
      final posts = await Amplify.DataStore.query(amp.Organization.classType);
      print('Organizations: $posts');
    } on DataStoreException catch (e) {
      print('Query failed: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of Amplify API"),
        ),
        body: Scrollbar(
          child: ListView(
            padding: EdgeInsets.all(defaultPadding(context)),
            children: [
              ElevatedButton(
                onPressed: _createOrganization,
                child: const Text("Create organization"),
              ),
              SizedBox(
                height: 20,
              ),
              ElevatedButton(
                onPressed: _getMyOrganizationData,
                child: const Text("Get my organization data"),
              ),
              SizedBox(
                height: 20,
              ),
              ElevatedButton(
                onPressed: _createLevel,
                child: const Text("Create level"),
              ),
              SizedBox(
                height: 40,
              ),
              ElevatedButton(
                onPressed: _createLevelAndIntervention,
                child: const Text("Create level and intervention"),
              ),
              SizedBox(
                height: 40,
              ),
              ElevatedButton(
                onPressed: _createMutationManually,
                child: const Text("Create mutation manually"),
              ),
            ],
          ),
        ));
  }
}
