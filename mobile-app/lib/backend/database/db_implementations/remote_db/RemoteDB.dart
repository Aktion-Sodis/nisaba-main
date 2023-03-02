import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/DBExceptions.dart';
import 'package:mobile_app/backend/database/DBModelCollection.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';
import 'package:mobile_app/utils/connectivity.dart';

import '../../../../models/ModelProvider.dart' as amp;
import '../../../callableModels/CallableModels.dart';
import '../../DB.dart';

class RemoteDB extends DB<RemoteDBModelRegistration> {
  QueryPredicate _createAmplifyQuery(Type type, Query query) {
    if (getRegisteredModel(type) == null) {
      throw "Model not registered";
    }

    DBModelRegistration modelRegistration = getRegisteredModel(type);
    QueryPredicate? queryPredicate =
        modelRegistration.queryPredicateTranslation(query);
    if (queryPredicate == null) {
      throw "Predicate not registered";
    }
    return queryPredicate;
  }

  @override
  Future<void> create(DBObject object) async {
    Type modelType = object.runtimeType;
    try {
      DBModelRegistration modelRegistration = getRegisteredModel(modelType);
      Model amplifyModel = modelRegistration.fromDBModel(object);
      final request = ModelMutations.create(amplifyModel);
      final response = await Amplify.API.mutate(request: request).response;

      final dynamic createdObject = response.data;
      if (createdObject == null || createdObject == null) {
        throw "Error creating object";
      }

      object.id = createdObject.id;
    } on ApiException catch (e) {
      bool connected = await isThereInternetConnection();
      if (!connected) {
        throw NoConnectionException();
      }
      rethrow;
    }
  }

  @override
  Future<void> delete(DBObject object) async {
    Type modelType = object.runtimeType;
    try {
      Model amplifyObject = getRegisteredModel(modelType).fromDBModel(object);
      final request = ModelMutations.delete(amplifyObject);
      final response = await Amplify.API.mutate(request: request).response;

      object.id = null;
    } on ApiException catch (e) {
      bool connected = await isThereInternetConnection();
      if (!connected) {
        throw NoConnectionException();
      }
      rethrow;
    }
  }

  @override
  Future<List<G>> get<G extends DBObject>(Type type, [Query? query]) async {
    try {
      ModelType modelType = getRegisteredModel(type).modelType;

      //TODO: Implement limit and offset
      final whereQuery =
          query != null ? _createAmplifyQuery(type, query) : null;
      final request = ModelQueries.list(modelType, where: whereQuery);
      final response = await Amplify.API.query(request: request).response;

      final data = response.data;
      if (data == null) {
        return Future.value([]);
      }
      final List<G> dbObjects = data.items
          .where((element) => element != null)
          .map((e) => _modelToDBObject(type, e!) as G)
          .toList();
      return Future.value(dbObjects);
    } on ApiException catch (e) {
      bool connected = await isThereInternetConnection();
      if (!connected) {
        throw NoConnectionException();
      }
      rethrow;
    }
  }

  @override
  Future<G?> getById<G extends DBObject>(Type type, String id) async {
    try {
      ModelType modelType = getRegisteredModel(type).modelType;
      final request = ModelQueries.get(modelType, id);
      final response = await Amplify.API.query(request: request).response;
      final data = response.data;
      if (data == null) {
        return Future.value(null);
      }
      final G dbObject = _modelToDBObject(type, data) as G;
      return Future.value(dbObject);
    } on ApiException catch (e) {
      bool connected = await isThereInternetConnection();
      if (!connected) {
        throw NoConnectionException();
      }
      rethrow;
    }
  }

  @override
  Future<void> update(DBObject object) async {
    Type modelType = object.runtimeType;
    try {
      Model amplifyObject = getRegisteredModel(modelType).fromDBModel(object);
      final request = ModelMutations.update(amplifyObject);
      final response = await Amplify.API.mutate(request: request).response;
    } on ApiException catch (e) {
      bool connected = await isThereInternetConnection();
      if (!connected) {
        throw NoConnectionException();
      }
      rethrow;
    }
  }

  DBObject _modelToDBObject(Type type, Model model) {
    return getRegisteredModel(type).toDBModel(model);
  }
}
