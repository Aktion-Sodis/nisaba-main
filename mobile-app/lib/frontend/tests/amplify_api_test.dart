import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/utils/amplify.dart';

import '../../backend/callableModels/Entity.dart';

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
            ],
          ),
        ));
  }
}
