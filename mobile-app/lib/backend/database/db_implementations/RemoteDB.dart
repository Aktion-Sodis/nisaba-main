import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/frontend/tests/db_test.dart';

import '../../../models/ModelProvider.dart' as amp;
import '../../callableModels/CallableModels.dart';
import '../DB.dart';

class RemoteDB extends DB {
  final DBModelCollection _modelCollection = DBModelCollection();

  void registerModel(Type type, DBModelRegistration registration) {
    _modelCollection.registerModel(type, registration);
  }

  QueryPredicate _createAmplifyQuery<G>(Query query) {
    if (_modelCollection.getRegisteredModel<G>() == null) {
      throw "Model not registered";
    }

    DBModelRegistration modelRegistration =
        _modelCollection.getRegisteredModel<G>();
    QueryPredicate? queryPredicate =
        modelRegistration.predicatesTranslations[query.predicate]!(query);
    if (queryPredicate == null) {
      throw "Predicate not registered";
    }
    return queryPredicate;
  }

  @override
  Future<void> create<G extends DBObject>(G object) async {
    try {
      DBModelRegistration modelRegistration =
          _modelCollection.getRegisteredModel<G>();
      Model amplifyModel = modelRegistration.fromDBModel(object);
      final request = ModelMutations.create(amplifyModel);
      final response = await Amplify.API.mutate(request: request).response;

      final dynamic createdObject = response.data;
      if (createdObject == null || createdObject == null) {
        throw "Error creating object";
      }

      object.id = createdObject.id;
    } on ApiException catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> delete<G extends DBObject>(G object) async {
    try {
      Model amplifyObject =
          _modelCollection.getRegisteredModel<G>().fromDBModel(object);
      final request = ModelMutations.delete(amplifyObject);
      final response = await Amplify.API.mutate(request: request).response;

      object.id = null;
    } on ApiException catch (e) {
      rethrow;
    }
  }

  @override
  Future<List<G>> get<G extends DBObject>(Query query) {
    try {
      ModelType modelType = _modelCollection.getRegisteredModel<G>().modelType;

      //TODO: Implement limit and offset
      final request =
          ModelQueries.list(modelType, where: _createAmplifyQuery<G>(query));
      final response = Amplify.API.query(request: request).response;
      return response.then((value) {
        final data = value.data;
        if (data == null) {
          return Future.value([]);
        }
        final List<G> dbObjects = data.items
            .where((element) => element != null)
            .map((e) => _modelToDBObject<G>(e!) as G)
            .toList();
        return Future.value(dbObjects);
      });
    } on ApiException catch (e) {
      rethrow;
    }
  }

  @override
  Future<G?> getById<G extends DBObject>(String id) async {
    try {
      ModelType modelType = _modelCollection.getRegisteredModel<G>().modelType;
      final request = ModelQueries.get(modelType, id);
      final response = await Amplify.API.query(request: request).response;
      final data = response.data;
      if (data == null) {
        return Future.value(null);
      }
      final DBObject dbObject = _modelToDBObject<G>(data);
      return Future.value(dbObject as G);
    } on ApiException catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> update<G extends DBObject>(G object) async {
    try {
      Model amplifyObject =
          _modelCollection.getRegisteredModel<G>().fromDBModel(object);
      final request = ModelMutations.update(amplifyObject);
      final response = await Amplify.API.mutate(request: request).response;
      print(response.data);
    } on ApiException catch (e) {
      rethrow;
    }
  }

  DBObject _modelToDBObject<G extends DBObject>(Model model) {
    return _modelCollection.getRegisteredModel<G>().toDBModel(model);
  }
}
