import 'dart:math';

import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/callableModels/Level.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import '../../backend/callableModels/CallableModels.dart';

///
class AmplifyDatastoreSyncTest extends StatelessWidget {
  const AmplifyDatastoreSyncTest({Key? key}) : super(key: key);

  Future<void> _createEntity() async {
    // Generate random int
    int randomInt = Random().nextInt(1000000);

    List<Level> levels = await LevelRepository.instance.getAllLevels();
    Level rootLevel =
        levels.firstWhere((element) => element.parentLevelID == null);

    Entity entity1 = Entity(
      appliedInterventions: [],
      customData: [],
      description: I18nString(
          languageKeys: ["en-US"], languageTexts: ["Description $randomInt"]),
      level: rootLevel,
      name: I18nString(
          languageKeys: ["en-US"], languageTexts: ["Entity $randomInt"]),
    );
    String id1 = await EntityRepository.instance.createEntity(entity1);

    print(
        "[Amplify Datastore Sync Test] Created entity ${entity1.name} with id: $id1");
  }

  Future<void> _restartDataStore() async {
    await Amplify.DataStore.stop();
    await Amplify.DataStore.start();
  }

  Future<void> _clearDatastore() async {
    await Amplify.DataStore.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of Amplify Datastore Sync"),
        ),
        body: Scrollbar(
          child: ListView(
            padding: EdgeInsets.all(defaultPadding(context)),
            children: [
              ElevatedButton(
                onPressed: _createEntity,
                child: const Text("Create entity"),
              ),
              SizedBox(height: defaultPadding(context)),
              ElevatedButton(
                onPressed: _clearDatastore,
                child: const Text("Clear datastore"),
              ),
              SizedBox(height: defaultPadding(context)),
              ElevatedButton(
                onPressed: _restartDataStore,
                child: const Text("Restart datastore"),
              ),
            ],
          ),
        ));
  }
}
