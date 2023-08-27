import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart' as gql_flutter;
import 'package:mobile_app/backend/callableModels/TestObject.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/ConfigGraphQL.dart';
import 'package:mobile_app/backend/database/db_implementations/graphql_db/GraphQGDBModelRegistration.dart';
import "package:gql/language.dart" as lang;
import "package:gql/ast.dart" as ast;
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueueObject.dart';

class GraphQLDB extends DB<GraphQLDBModelRegistration> {
  // If an entry has a list or map value, it works recursively.
  ast.ValueNode _toValueNode(dynamic entry) {
    if (entry == null) {
      return ast.NullValueNode();
    }

    if (entry is String) {
      return ast.StringValueNode(value: entry, isBlock: true);
    } else if (entry is int) {
      return ast.IntValueNode(value: entry.toString());
    } else if (entry is double) {
      return ast.FloatValueNode(value: entry.toString());
    } else if (entry is bool) {
      return ast.BooleanValueNode(value: entry);
    } else if (entry is List) {
      return ast.ListValueNode(
          values: entry.map((e) => _toValueNode(e)).toList());
    } else if (entry is Map) {
      if (entry.containsKey("__isEnum") && entry["__isEnum"] == true) {
        return ast.EnumValueNode(name: ast.NameNode(value: entry["value"]));
      } else {
        return ast.ObjectValueNode(
            fields: entry.entries
                .map((e) => ast.ObjectFieldNode(
                    name: ast.NameNode(value: e.key),
                    value: _toValueNode(e.value)))
                .toList());
      }
    } else {
      throw Exception("Unknown type");
    }
  }

  String _mutation(DBModel object, DBAction dbAction) {
    Map<String, dynamic> input = object.toJson();

    List<ast.ObjectFieldNode> fields = input.entries
        .map((e) => ast.ObjectFieldNode(
            name: ast.NameNode(value: e.key), value: _toValueNode(e.value)))
        .toList();

    //hacky workaround for sync issues -> todo: adress properly @arthur-becker
    if ((dbAction == DBAction.UPDATE || dbAction == DBAction.CREATE) && object.runtimeType.toString() == 'Entity') {
      print('[GQL] removing level from query');
      fields.removeWhere((element) => element.name.value == 'level');
      fields.removeWhere((element) => element.name.value == 'createdAt');
      fields.removeWhere(((element) => element.name.value == 'updatedAt'));
    }

    String mutationName = "";
    switch (dbAction) {
      case DBAction.CREATE:
        mutationName = getRegisteredModel(object.runtimeType).createMutation;
        break;
      case DBAction.UPDATE:
        mutationName = getRegisteredModel(object.runtimeType).updateMutation;
        break;
      case DBAction.DELETE:
        mutationName = getRegisteredModel(object.runtimeType).deleteMutation;
        break;
    }

    ast.DocumentNode document2 = ast.DocumentNode(
      definitions: [
        ast.OperationDefinitionNode(
          type: ast.OperationType.mutation,
          selectionSet: ast.SelectionSetNode(selections: [
            ast.FieldNode(
              name: ast.NameNode(value: mutationName),
              arguments: [
                // Argument 'input' of type 'map', which is required.
                ast.ArgumentNode(
                  name: ast.NameNode(value: "input"),
                  value: ast.ObjectValueNode(fields: fields),
                ),
              ],
              selectionSet: const ast.SelectionSetNode(selections: [
                ast.FieldNode(
                  name: ast.NameNode(value: "id"),
                ),
              ]),
            ),
          ]),
        ),
      ],
    );

    String documentString = lang.printNode(document2);
    return documentString;
  }

  ast.SelectionSetNode _generateSelectionSet(
      Map<dynamic, dynamic> selectionSet) {
    List<ast.SelectionNode> selections = [];
    selections =
        selectionSet.entries.map((entry) => _generateFieldNode(entry)).toList();
    return ast.SelectionSetNode(selections: selections);
  }

  ast.FieldNode _generateFieldNode(MapEntry<dynamic, dynamic> entry) {
    if (entry.value == null) {
      return ast.FieldNode(
        name: ast.NameNode(value: entry.key),
      );
    } else {
      return ast.FieldNode(
        name: ast.NameNode(value: entry.key),
        selectionSet: _generateSelectionSet(entry.value),
      );
    }
  }

  String _listQuery(Type type, Query? query) {
    GraphQLDBModelRegistration modelRegistration = getRegisteredModel(type);

    Map<String, dynamic>? gqlQuery = query != null
        ? modelRegistration.queryPredicateTranslation(query)!
            as Map<String, dynamic>
        : null;

    Map<String, dynamic> selectionSet = modelRegistration.queryFields;

    ast.DocumentNode document2 = ast.DocumentNode(
      definitions: [
        ast.OperationDefinitionNode(
          type: ast.OperationType.query,
          selectionSet: ast.SelectionSetNode(selections: [
            ast.FieldNode(
              name: ast.NameNode(value: modelRegistration.listQuery),
              arguments: gqlQuery != null
                  ? [
                      ast.ArgumentNode(
                        name: ast.NameNode(value: "filter"),
                        value: _toValueNode(gqlQuery),
                      ),
                    ]
                  : [],
              selectionSet: ast.SelectionSetNode(selections: [
                ast.FieldNode(
                  name: ast.NameNode(value: "items"),
                  selectionSet: _generateSelectionSet(selectionSet),
                ),
              ]),
            ),
          ]),
        ),
      ],
    );

    String documentString = lang.printNode(document2);
    return documentString;
  }

  String _getQuery(Type type, String id) {
    GraphQLDBModelRegistration modelRegistration = getRegisteredModel(type);

    Map<String, dynamic> selectionSet = modelRegistration.queryFields;

    ast.DocumentNode document2 = ast.DocumentNode(
      definitions: [
        ast.OperationDefinitionNode(
          type: ast.OperationType.query,
          selectionSet: ast.SelectionSetNode(selections: [
            ast.FieldNode(
              name: ast.NameNode(value: modelRegistration.getQuery),
              arguments: [
                ast.ArgumentNode(
                  name: ast.NameNode(value: "id"),
                  value: ast.StringValueNode(value: id, isBlock: false),
                ),
              ],
              selectionSet: _generateSelectionSet(selectionSet),
            ),
          ]),
        ),
      ],
    );

    String documentString = lang.printNode(document2);
    return documentString;
  }

  @override
  Future<void> create(DBModel object) async {
    print('[GQL] Create operation');
    String query = _mutation(object, DBAction.CREATE);

    print('[GQL] Query: ' + query);

    ConfigGraphQL config = ConfigGraphQL();
    var response = await config.client!
        .mutate(gql_flutter.MutationOptions(document: gql_flutter.gql(query)));

    if (response.hasException) {
      debugPrint('[GQL] Exception: ' + response.exception.toString(), wrapWidth: 1024);
      throw response.exception!;
    }

    String createMutationName =
        getRegisteredModel(object.runtimeType).createMutation;

    object.id = response.data![createMutationName]!["id"];
  }

  @override
  Future<void> delete(DBModel object) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<List<G>> get<G extends DBModel>(Type modelType, [Query? query]) async {
    String gqlQuery = _listQuery(modelType, query);

    ConfigGraphQL config = ConfigGraphQL();
    var response = await config.client!
        .query(gql_flutter.QueryOptions(document: gql_flutter.gql(gqlQuery)));

    if (response.hasException) {
      throw response.exception!;
    }

    String listQueryName = getRegisteredModel(modelType).listQuery;

    List<dynamic> items = response.data![listQueryName]!["items"];

    GraphQLDBModelRegistration modelRegistration =
        getRegisteredModel(modelType);
    List<G> result =
        items.map((e) => modelRegistration.toDBModel(e)).toList().cast<G>();

    return Future.value(result);
  }

  @override
  Future<G?> getById<G extends DBModel>(Type modelType, String id) async {
    String gqlQuery = _getQuery(modelType, id);

    ConfigGraphQL config = ConfigGraphQL();
    var response = await config.client!
        .query(gql_flutter.QueryOptions(document: gql_flutter.gql(gqlQuery)));

    if (response.hasException) {
      throw response.exception!;
    }

    String getQueryName = getRegisteredModel(modelType).getQuery;

    dynamic item = response.data![getQueryName];

    if (item == null) {
      return Future.value(null);
    }

    GraphQLDBModelRegistration modelRegistration =
        getRegisteredModel(modelType);

    G? result = modelRegistration.toDBModel(item) as G?;

    return Future.value(result);
  }

  @override
  Future<void> update(DBModel object) async {
    print('[GQL] Update operation');
    String query = _mutation(object, DBAction.UPDATE);

    print('[GQL] Query: ' + query);

    ConfigGraphQL config = ConfigGraphQL();
    var response = await config.client!
        .mutate(gql_flutter.MutationOptions(document: gql_flutter.gql(query)));

    if (response.hasException) {
      debugPrint('[GQL] Exception: ' + response.exception.toString(), wrapWidth: 1024);
      throw response.exception!;
    }

    String updateMutationName =
        getRegisteredModel(object.runtimeType).updateMutation;

    object.id = response.data![updateMutationName]!["id"];
  }
}
