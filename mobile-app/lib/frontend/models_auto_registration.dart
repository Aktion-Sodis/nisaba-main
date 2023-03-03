import 'package:mobile_app/backend/callableModels/TestObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDBModelRegistration.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../backend/database/db_implementations/synced_db/SyncedDB.dart';

/// User this file to register all models in the database

SyncedDB _db = SyncedDB.instance;

void registerModels() {
  _db.registerModel(
      TestObject,
      SyncedDBModelRegistration(
          haveToSyncDownstream: true,
          localDBModelRegistration: LocalDBModelRegistration(
            fromDBModel: (p0) {
              TestObject testObject = p0 as TestObject;
              return {
                'name': testObject.name,
                'age': testObject.age,
                'id': testObject.id,
              };
            },
            toDBModel: (Map<String, Object?> map) {
              return TestObject(
                map['name'] as String?,
                map['age'] as int,
                map['id'] as String?,
              );
            },
          ),
          remoteDBModelRegistration: RemoteDBModelRegistration(
            modelType: amp.TestObject.classType,
            fromDBModel: (p0) {
              TestObject testObject = p0 as TestObject;
              return amp.TestObject(
                  name: testObject.name,
                  age: testObject.age,
                  id: testObject.id);
            },
            toDBModel: (p0) {
              amp.TestObject testObject = p0 as amp.TestObject;
              return TestObject(testObject.name, testObject.age, testObject.id);
            },
            modelAttributes: [
              amp.TestObject.NAME,
              amp.TestObject.AGE,
            ],
          )));
}
