import 'package:flutter/foundation.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQLDB.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDB.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

import '../../backend/callableModels/TestObject.dart';
import '../../backend/database/Query.dart';
import '../../backend/database/db_implementations/graphql_db/GraphQGDBModelRegistration.dart';

class GraphQLQueryTest extends StatelessWidget {
  GraphQLQueryTest({Key? key}) : super(key: key);

  late DB db;

  Future<void> _initLocalDB() async {
    print("DBTest: Initializing LocalDB");
    db = GraphQLDB();
    db.registerModel(
        TestObject,
        GraphQLDBModelRegistration(
            toDBModel: TestObject.fromJson,
            queryFields: TestObject.queryFields(),
            createMutation: "createTestObject",
            updateMutation: "updateTestObject",
            deleteMutation: "deleteTestObject",
            getQuery: "getTestObject",
            listQuery: "listTestObjects"));

    print("DBTest: DB initialized");
    return Future.value();
  }

  Future<void> _dbTest() async {
    TestObject testObject = TestObject(
      "MyTestObject 1234",
      345,
      "IloveNisaba and Kazakhstan",
    );

    TestObject? testObject2 = await db.getById(TestObject, testObject.id!);
    print("DBTest: TestObject gotten: $testObject2");
    if (testObject2 != null) {
      print(testObject2.toJson());
    }

    /*print("DBTest: Creating TestObject");
    await db.create(testObject);
    print("DBTest: TestObject created");*/

    /*print("DBTest: Getting TestObject");
    TestObject? testObject2 =
        await db.getById<TestObject>(TestObject, testObject.id!);
    print("DBTest: TestObject gotten: $testObject2");

    print("DBTest: Updating TestObject");
    testObject2!.name = "TestObject 1234";
    await db.update(testObject2);
    print("DBTest: TestObject updated");

    print("DBTest: Getting TestObject");
    TestObject? testObject3 =
        await db.getById<TestObject>(TestObject, testObject.id!);
    print("DBTest: TestObject gotten: $testObject3");

    print("DBTest: Deleting TestObject");
    await db.delete(testObject3!);
    print("DBTest: TestObject deleted");

    print("DBTest: Getting TestObject");
    TestObject? testObject4 =
        await db.getById<TestObject>(TestObject, testObject.id!);
    print("DBTest: TestObject gotten: $testObject4");*/
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of Queries and Mutations on GraphQL DB"),
        ),
        body: Scrollbar(
          child: ListView(
            padding: EdgeInsets.all(defaultPadding(context)),
            children: [
              ElevatedButton(
                onPressed: _initLocalDB,
                child: const Text("Init GraphQL DB"),
              ),
              SizedBox(height: 20),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _startTest,
                child: const Text("Start DB Test"),
              ),
              SizedBox(height: 20),
            ],
          ),
        ));
  }
}
