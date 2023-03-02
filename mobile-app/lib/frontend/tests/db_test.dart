import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDB.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import '../../backend/database/Query.dart';

class TO implements DBObject {
  String? name;
  int age;

  TO([this.name, this.age = 0, this.id]);

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

class LocalDBTest extends StatelessWidget {
  LocalDBTest({Key? key}) : super(key: key);

  late DB db;

  Future<void> _initLocalDB() async {
    print("DBTest: Initializing LocalDB");
    db = LocalDB();
    await (db as LocalDB).initLocalDB();
    (db as LocalDB).registerModel(
        TO,
        LocalDBModelRegistration(
          fromDBModel: (DBObject object) {
            TO to = object as TO;
            return {"name": to.name, "age": to.age, "id": to.id};
          },
          toDBModel: (model) {
            return TO(model["name"] as String?, model["age"] as int,
                model["id"] as String);
          },
        ));
    print("DBTest: DB initialized");
    return Future.value();
  }

  Future<void> _initRemoteDB() async {
    print("DBTest: Initializing RemoteDB");
    db = RemoteDB();
    (db as RemoteDB).registerModel(
        TO,
        RemoteDBModelRegistration(
            modelType: amp.TestObject.classType,
            fromDBModel: (DBObject object) {
              TO to = object as TO;
              return amp.TestObject(
                id: to.id,
                name: to.name,
                age: to.age,
              );
            },
            toDBModel: (model) {
              amp.TestObject testObject = model as amp.TestObject;
              return TO(testObject.name, testObject.age, testObject.id);
            },
            predicatesTranslations: {
              QPredicate.EQ: (Query query) {
                if (query.key == "name") {
                  return amp.TestObject.NAME.eq(query.attr1);
                }
                if (query.key == "age") {
                  return amp.TestObject.AGE.eq(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.NE: (Query query) {
                if (query.key == "name") {
                  return amp.TestObject.NAME.ne(query.attr1);
                }
                if (query.key == "age") {
                  return amp.TestObject.AGE.ne(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.GT: (Query query) {
                if (query.key == "age") {
                  return amp.TestObject.AGE.gt(query.attr1);
                }
                if (query.key == "name") {
                  return amp.TestObject.NAME.gt(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.LT: (Query query) {
                if (query.key == "age") {
                  return amp.TestObject.AGE.lt(query.attr1);
                }
                if (query.key == "name") {
                  return amp.TestObject.NAME.lt(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.GE: (Query query) {
                if (query.key == "age") {
                  return amp.TestObject.AGE.ge(query.attr1);
                }
                if (query.key == "name") {
                  return amp.TestObject.NAME.ge(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.LE: (Query query) {
                if (query.key == "age") {
                  return amp.TestObject.AGE.le(query.attr1);
                }
                if (query.key == "name") {
                  return amp.TestObject.NAME.le(query.attr1);
                }
                throw "Unknown key";
              },
              QPredicate.BETWEEN: (Query query) {
                if (query.key == "age") {
                  return amp.TestObject.AGE
                      .between(query.attr1 as int, query.attr2 as int);
                }
                if (query.key == "name") {
                  return amp.TestObject.NAME
                      .between(query.attr1 as String, query.attr2 as String);
                }
                throw "Unknown key";
              },
              QPredicate.CONTAINS: (Query query) {
                if (query.key == "name") {
                  return amp.TestObject.NAME.contains(query.attr1);
                }
                throw "Unknown key";
              },
            }));
    print("DBTest: DB initialized");
  }

  Future<void> _dbTest() async {
    TO testObject1 = TO("Test1", 1);
    TO testObject2 = TO("Test2", 2);
    TO testObject3 = TO("Test3", 3);

    // Test Create
    await db.create(testObject1);
    if (testObject1.id == null) {
      throw "TestObject1 has no ID. Probably, testObject1 has not been created";
    }
    print("Test Create: OK");

    // Test GetByID
    TO? receivedObject1 = await db.getById(TO, testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been created";
    }
    if (receivedObject1.id != testObject1.id) {
      throw "ID Mismatch. Probably, testObject1 has not been created";
    }

    print("Test GetByID: OK");

    List<TO> receivedObjects =
        await db.get<TO>(TO, Query(QPredicate.EQ, "name", "Test2"));
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
    receivedObject1 = await db.getById<TO>(TO, testObject1.id!);
    if (receivedObject1 == null) {
      throw "testObject1 has not been received. Probably, testObject1 has not been updated";
    }
    if (receivedObject1.name != "Test1Updated") {
      throw "testObject1 has not been updated";
    }
    print("Test Update: OK");

    // Test Predicates

    //Query 1
    receivedObjects =
        await db.get<TO>(TO, Query(QPredicate.NE, "name", "Test2"));
    List<int> ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 3])) {
      throw "Query 1 failed";
    }

    //Query 2
    receivedObjects = await db.get<TO>(TO, Query(QPredicate.GT, "age", 1));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [2, 3])) {
      throw "Query 2 failed";
    }

    //Query 3
    receivedObjects = await db.get<TO>(TO, Query(QPredicate.GE, "age", 2));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [2, 3])) {
      throw "Query 3 failed";
    }

    //Query 4
    receivedObjects = await db.get<TO>(TO, Query(QPredicate.LT, "age", 3));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 2])) {
      throw "Query 4 failed";
    }

    //Query 5
    receivedObjects = await db.get<TO>(TO, Query(QPredicate.LE, "age", 2));
    ages = _getAges(receivedObjects);
    if (!listElementsEqual(ages, [1, 2])) {
      throw "Query 5 failed";
    }

    //Query 6
    /*receivedObjects = await db.get<TO>(Query(QPredicate.BETWEEN, "age", 1, 2));
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
    receivedObject1 = await db.getById<TO>(TO, testObject1Id);
    if (receivedObject1 != null) {
      throw "testObject1 has not been deleted";
    }

    print("Test Delete: OK");
  }

  Future<void> _clearDB() async {
    List<TO> objectList = await db.get<TO>(TO);
    for (TO object in objectList) {
      await db.delete(object);
    }
    print(objectList.length.toString() + " objects deleted");
  }

  List<int> _getAges(List<TO> objects) {
    List<int> ages = [];
    for (TO object in objects) {
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
                onPressed: _initLocalDB,
                child: const Text("Init LocalDB"),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _initRemoteDB,
                child: const Text("Init RemoteDB"),
              ),
              SizedBox(height: 20),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startTest,
                child: const Text("Start DB Test"),
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
