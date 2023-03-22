import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueue.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueueObject.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDBModelRegistration.dart';
import 'package:mobile_app/frontend/models_auto_registration.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDB.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:sembast/sembast.dart';

import '../../backend/callableModels/TestObject.dart';
import '../../backend/database/Query.dart';

class TestRegisteredModelsQueries extends StatelessWidget {
  TestRegisteredModelsQueries({Key? key}) : super(key: key);

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
