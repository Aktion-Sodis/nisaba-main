import 'package:amplify_flutter/amplify_flutter.dart';

import 'DBObject.dart';
import 'QPredicate.dart';
import 'Query.dart';

/// Represents a model type and implements both all the query predicates traslation
/// and the translation from and to the DBObject
///
/// You can find all the predicates to be implemented in QPredicate.dart
abstract class DBModelRegistration<G, Q> {
  final Map<QPredicate, Q? Function(Query)> predicatesTranslations;

  final G Function(DBObject) fromDBModel;
  final DBObject Function(G) toDBModel;

  DBModelRegistration(
      this.predicatesTranslations, this.fromDBModel, this.toDBModel);
}
