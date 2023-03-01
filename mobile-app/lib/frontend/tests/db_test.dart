import 'package:flutter/material.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/RemoteDB.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import '../../backend/database/Query.dart';
import '../../backend/database/db_implementations/SyncedDB.dart';

class TestObject implements DBObject {
  String? name;
  int age = 0;

  TestObject(this.name, this.age);

  @override
  bool isPopulated = false;

  @override
  int version = 0;

  @override
  Map<String, dynamic> toMap() {
    return {
      "name": name,
      "age": age,
    };
  }

  @override
  String? id;

  @override
  void fromMap(Map<String, dynamic> map) {
    // TODO: implement fromMap
  }
}

class DBTest extends StatelessWidget {
  DBTest({Key? key}) : super(key: key);

  final DB db = LocalDB();

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
    TestObject? receivedObject1 = await db.getById(testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been created";
    }
    if (receivedObject1.id != testObject1.id) {
      throw "ID Mismatch. Probably, testObject1 has not been created";
    }

    print("Test GetByID: OK");

    List<TestObject> receivedObjects =
        await db.get(Query(QPredicate.EQ, "name", "Test2"));
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
    receivedObject1 = await db.getById<TestObject>(testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been updated";
    }
    if (receivedObject1.name != "Test1Updated") {
      throw "testObject1 has not been updated";
    }
    print("Test Update: OK");

    // Test Predicates

    //Query 1
    receivedObjects = await db.get(Query(QPredicate.NE, "name", "Test2"));
    if (_getAges(receivedObjects) != [1, 3]) {
      throw "Query 1 failed";
    }

    //Query 2
    receivedObjects = await db.get(Query(QPredicate.GT, "age", 1));
    if (_getAges(receivedObjects) != [2, 3]) {
      throw "Query 2 failed";
    }

    //Query 3
    receivedObjects = await db.get(Query(QPredicate.GE, "age", 2));
    if (_getAges(receivedObjects) != [2, 3]) {
      throw "Query 3 failed";
    }

    //Query 4
    receivedObjects = await db.get(Query(QPredicate.LT, "age", 3));
    if (_getAges(receivedObjects) != [1, 2]) {
      throw "Query 4 failed";
    }

    //Query 5
    receivedObjects = await db.get(Query(QPredicate.LE, "age", 2));
    if (_getAges(receivedObjects) != [1, 2]) {
      throw "Query 5 failed";
    }

    //Query 6
    receivedObjects = await db.get(Query(QPredicate.BETWEEN, "age", 1, 2));
    if (_getAges(receivedObjects) != [1, 2]) {
      throw "Query 6 failed";
    }

    //Query 7
    print(
        "Attention: Query 7 is a test of the 'contains' predicate. It has to be tested manually");

    print("Test Predicates: OK");

    // Test Delete
    await db.delete(testObject1);
    receivedObject1 = await db.getById<TestObject>(testObject1.id!);
    if (receivedObject1 != null) {
      throw "testObject1 has not been deleted";
    }

    print("Test Delete: OK");
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

  Future<void> _initDB() async {
    await (db as LocalDB).initLocalDB();
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
              SizedBox(
                height: defaultPadding(context),
              ),
              ElevatedButton(
                onPressed: _startTest,
                child: const Text("Start DB Test"),
              ),
            ],
          ),
        ));
  }
}
