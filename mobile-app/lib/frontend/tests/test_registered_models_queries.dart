import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/frontend/models_auto_registration.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';


class TestRegisteredModelsQueries extends StatelessWidget {
  const TestRegisteredModelsQueries({super.key});

  Future<void> _startListQueries() async {
    var registeredModels = SyncedDB.instance
        .getRegisteredModelTypes()
        .where((element) =>
            SyncedDB.instance.getRegisteredModel(element).haveToSyncDownstream)
        .toList();

    for (var modelType in registeredModels) {
      print("Model type: $modelType");
      var modelRegistration = await SyncedDB.instance.remoteDB.get(modelType);
    }

    print("Done");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of DB"),
        ),
        body: Scrollbar(
          child: ListView(
            padding: EdgeInsets.all(defaultPadding(context)),
            children: [
              const ElevatedButton(
                onPressed: registerModels,
                child: Text("Re-register models"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startListQueries,
                child: const Text("List queries to all models"),
              ),
            ],
          ),
        ));
  }
}
