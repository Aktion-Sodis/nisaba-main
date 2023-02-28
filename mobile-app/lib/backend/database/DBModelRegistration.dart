import 'package:amplify_flutter/amplify_flutter.dart';

import 'DBObject.dart';
import 'QPredicate.dart';
import 'Query.dart';

/// Represents a model type and implements both all the query predicates traslation
/// and the translation from and to the DBObject
///
/// You can find all the predicates to be implemented in QPredicate.dart
class DBModelRegistration {
  final ModelType modelType;
  final Map<QPredicate, QueryPredicate? Function(Query)> predicatesTranslations;

  final Model Function(DBObject) fromDBModel;
  final DBObject Function(Model) toDBModel;

  DBModelRegistration(
      {required this.modelType,
      required this.predicatesTranslations,
      required this.fromDBModel,
      required this.toDBModel});
}
