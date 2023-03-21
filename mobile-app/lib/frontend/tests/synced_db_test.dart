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

class SyncedDBTest extends StatelessWidget {
  SyncedDBTest({Key? key}) : super(key: key);

  late SyncedDB db;

  Future<void> _initDB() async {
    print("DBTest: Initializing SyncedDB");
    db = SyncedDB(LocalDB(), RemoteDB());
    (db as SyncedDB).syncUpstreamAutomatically = false;

    RemoteDBModelRegistration remoteDBModelRegistration =
        RemoteDBModelRegistration(
            modelType: amp.TestObject.classType,
            fromDBModel: (DBModel object) {
              TestObject to = object as TestObject;
              return amp.TestObject(
                id: to.id,
                name: to.name,
                age: to.age,
              );
            },
            toDBModel: (model) {
              amp.TestObject testObject = model as amp.TestObject;
              return TestObject(
                testObject.name,
                testObject.age,
                testObject.id,
              );
            },
            modelAttributes: [
          amp.TestObject.NAME,
          amp.TestObject.AGE,
        ]);

    LocalDBModelRegistration localDBModelRegistration =
        LocalDBModelRegistration(
      toDBModel: (model) {
        return TestObject(model["name"] as String?, model["age"] as int,
            model["id"] as String);
      },
    );

    /*db.registerModel(
        TestObject,
        SyncedDBModelRegistration(
            haveToSyncDownstream: true,
            localDBModelRegistration: localDBModelRegistration,
            remoteDBModelRegistration: RemoteDBModelRegistration(
              fromDBModel: (object) {
                return TestObject("fdsf", 1);
              },
              modelType: amp.TestObject.classType,
              modelAttributes: [amp.TestObject.NAME, amp.TestObject.AGE],
              toDBModel: (Object amplifyModel) {
                return TestObject("fdsf", 1);
              },
            )));

    db.registerModel(
        TestObject,
        SyncedDBModelRegistration(
            haveToSyncDownstream: true,
            localDBModelRegistration: localDBModelRegistration,
            remoteDBModelRegistration: remoteDBModelRegistration));*/

    throw UnimplementedError();

    (db.localDB as LocalDB).initLocalDB("LocalDB_Test");

    print("DBTest: DB initialized");
    return Future.value();
  }

  Future<void> _startUpstreamSyncTest() async {
    print("DBTest: Starting Upstream Sync Test");
    TestObject testObject1 = TestObject("Test1", 1);
    TestObject testObject2 = TestObject("Test2", 2);
    TestObject testObject3 = TestObject("Test3", 3);

    await db.create(testObject1);

    List<TestObject> testObject1Received =
        await db.remoteDB.get<TestObject>(TestObject);
    if (testObject1Received.isNotEmpty) {
      throw "DBTest: TestObject1 received from remoteDB before sync";
    }

    await db.synchronizer.syncUpstream();

    List<TestObject> testObject1ReceivedAfterSync =
        await db.remoteDB.get<TestObject>(TestObject);
    if (testObject1ReceivedAfterSync.isEmpty) {
      throw "DBTest: TestObject1 not received from remoteDB after sync";
    }

    await db.create(testObject2);
    await db.create(testObject3);
    await db.delete(testObject1);

    await db.synchronizer.syncUpstream();

    List<TestObject> objectsReceivedAfterSync =
        await db.remoteDB.get<TestObject>(TestObject);
    if (!listElementsEqual(_getAges(objectsReceivedAfterSync), [2, 3])) {
      throw "DBTest: Wrong objects received from remoteDB after the second sync";
    }

    testObject2.age = 4;
    await db.update(testObject2);
    await db.create(testObject1);

    await db.synchronizer.syncUpstream();

    List<TestObject> objectsReceivedAfterSecondSync =
        await db.remoteDB.get<TestObject>(TestObject);
    if (!listElementsEqual(
        _getAges(objectsReceivedAfterSecondSync), [1, 3, 4])) {
      throw "DBTest: Wrong objects received from remoteDB after the third sync";
    }

    print("DBTest: Upstream Sync Test Passed");

    _clearDB();
  }

  Future<void> _startDownstreamSyncTest() async {
    print("DBTest: Starting Downstream Sync Test");
    TestObject testObject1 = TestObject("Test1", 1);
    TestObject testObject2 = TestObject("Test2", 2);
    TestObject testObject3 = TestObject("Test3", 3);

    await db.remoteDB.create(testObject1);
    await db.remoteDB.create(testObject2);
    await db.remoteDB.create(testObject3);

    // Test 1: test unsynced objects
    List<TestObject> receivedObjectsFromRemoteDB =
        await db.remoteDB.get<TestObject>(
      TestObject,
    );
    List<TestObject> receivedObjectsFromLocalDB =
        await db.localDB.get<TestObject>(
      TestObject,
    );
    List<int> agesFromRemoteDB = _getAges(receivedObjectsFromRemoteDB);
    List<int> agesFromLocalDB = _getAges(receivedObjectsFromLocalDB);
    if (!listElementsEqual(agesFromRemoteDB, [1, 2, 3]) ||
        !listElementsEqual(agesFromLocalDB, [])) {
      throw "Test 1 failed";
    }

    // Test 2: test synced objects
    await (db as SyncedDB).synchronizer.syncDownstream();
    receivedObjectsFromRemoteDB = await db.remoteDB.get<TestObject>(
      TestObject,
    );
    receivedObjectsFromLocalDB = await db.localDB.get<TestObject>(
      TestObject,
    );
    agesFromRemoteDB = _getAges(receivedObjectsFromRemoteDB);
    agesFromLocalDB = _getAges(receivedObjectsFromLocalDB);
    if (!listElementsEqual(agesFromRemoteDB, [1, 2, 3]) ||
        !listElementsEqual(agesFromLocalDB, [1, 2, 3])) {
      throw "Test 2 failed";
    }

    // Test 3: test updated objects
    testObject1.age = 4;
    await db.remoteDB.update(testObject1);
    await (db as SyncedDB).synchronizer.syncDownstream();
    receivedObjectsFromRemoteDB = await db.remoteDB.get<TestObject>(
      TestObject,
    );
    receivedObjectsFromLocalDB = await db.localDB.get<TestObject>(
      TestObject,
    );
    agesFromRemoteDB = _getAges(receivedObjectsFromRemoteDB);
    agesFromLocalDB = _getAges(receivedObjectsFromLocalDB);
    if (!listElementsEqual(agesFromRemoteDB, [2, 3, 4]) ||
        !listElementsEqual(agesFromLocalDB, [2, 3, 4])) {
      throw "Test 3 failed";
    }

    print("DBTest: Downstream Sync Test Finished");

    _clearDB();
  }

  Future<void> _dbTest() async {
    TestObject testObject1 = TestObject("Test1", 1);
    TestObject testObject2 = TestObject("Test2", 2);
    TestObject testObject3 = TestObject("Test3", 3);

    // Test Create
    await db.create(testObject1);
    if (testObject1.id == null) {
      throw "TestObject1 has no ID. Probably, testObject1 has not been created";
    }
    print("Test Create: OK");

    // Test GetByID
    TestObject? receivedObject1 =
        await db.getById<TestObject>(TestObject, testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been created";
    }
    if (receivedObject1.id != testObject1.id) {
      throw "ID Mismatch. Probably, testObject1 has not been created";
    }

    print("Test GetByID: OK");

    List<TestObject> receivedObjects = await db.get<TestObject>(
        TestObject, Query(QPredicate.EQ, "name", "Test2"));
    if (receivedObjects.isNotEmpty) {
      throw "testObject2 has been received. Probably, the query is not working";
    }

    await db.create(testObject2);
    if (testObject2.id == null) {
      throw "TestObject2 has no ID. Probably, testObject2 has not been created";
    }

    await db.create(testObject3);
    if (testObject3.id == null) {
      throw "TestObject3 has no ID. Probably, testObject3 has not been created";
    }

    // Test Update
    testObject1.name = "Test1Updated";
    await db.update(testObject1);
    receivedObject1 = await db.getById<TestObject>(TestObject, testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been updated";
    }
    if (receivedObject1.name != "Test1Updated") {
      throw "testObject1 has not been updated";
    }
    print("Test Update: OK");

    // Test Predicates

    //Query 1
    receivedObjects = await db.get<TestObject>(
        TestObject, Query(QPredicate.NE, "name", "Test2"));
    List<int> ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 3])) {
      throw "Query 1 failed";
    }

    //Query 2
    receivedObjects =
        await db.get<TestObject>(TestObject, Query(QPredicate.GT, "age", 1));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [2, 3])) {
      throw "Query 2 failed";
    }

    //Query 3
    receivedObjects =
        await db.get<TestObject>(TestObject, Query(QPredicate.GE, "age", 2));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [2, 3])) {
      throw "Query 3 failed";
    }

    //Query 4
    receivedObjects =
        await db.get<TestObject>(TestObject, Query(QPredicate.LT, "age", 3));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 2])) {
      throw "Query 4 failed";
    }

    //Query 5
    receivedObjects =
        await db.get<TestObject>(TestObject, Query(QPredicate.LE, "age", 2));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 2])) {
      throw "Query 5 failed";
    }

    //Query 6
    /*receivedObjects = await db.get<TestObject>(Query(QPredicate.BETWEEN, "age", 1, 2));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 2])) {
      throw "Query 6 failed";
    }*/
    print(
        "Attention: Query 6 is a test of the 'contains' predicate. It has to be tested manually");

    //Query 7
    print(
        "Attention: Query 7 is a test of the 'contains' predicate. It has to be tested manually");

    print("Test Predicates: OK");

    // Test Delete
    String testObject1Id = testObject1.id!;
    await db.delete(testObject1);
    receivedObject1 = await db.getById<TestObject>(TestObject, testObject1Id);
    if (receivedObject1 != null) {
      throw "testObject1 has not been deleted";
    }

    print("Test Delete: OK");

    _clearDB();
  }

  Future<void> _clearDB() async {
    List<TestObject> objectList1 = await db.localDB.get<TestObject>(
      TestObject,
    );
    for (TestObject object in objectList1) {
      await db.localDB.delete(object);
    }
    print(objectList1.length.toString() + " objects deleted from the local DB");

    List<TestObject> objectList2 = await db.remoteDB.get<TestObject>(
      TestObject,
    );
    for (TestObject object in objectList2) {
      await db.remoteDB.delete(object);
    }
    print(
        objectList2.length.toString() + " objects deleted from the remote DB");

    /*DBQueueObject? queueObject = await db.queue.get();
    while (queueObject != null) {
      await db.queue.delete(queueObject);
      queueObject = await db.queue.get();
    }*/

    // Clear the queue
    var store = stringMapStoreFactory.store(DBQueue.queueStoreName);
    await store.delete(db.localDB.db,
        finder: Finder(filter: Filter.custom((record) => true)));

    print("DB cleared");
  }

  List<int> _getAges(List<TestObject> objects) {
    List<int> ages = [];
    for (TestObject object in objects) {
      ages.add(object.age);
    }
    return ages;
  }

  Future<void> _startTest() async {
    try {
      print("STARTING TEST");
      await _dbTest();
      print("TEST FINISHED");
    } catch (e) {
      print("ERROR: $e");
    }
  }

  bool listElementsEqual(List<int> list1, List<int> list2) {
    return setEquals(list1.toSet(), list2.toSet());
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
              ElevatedButton(
                onPressed: _initDB,
                child: const Text("Init DB"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startTest,
                child: const Text("Start DB Test (like in the other test)"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startDownstreamSyncTest,
                child: const Text("Start downstream sync test"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startUpstreamSyncTest,
                child: const Text("Start upstream sync test"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _clearDB,
                child: const Text("Clear DB"),
              ),
            ],
          ),
        ));
  }
}
