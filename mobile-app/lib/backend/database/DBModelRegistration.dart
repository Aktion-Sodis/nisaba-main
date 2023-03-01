import 'package:amplify_flutter/amplify_flutter.dart';

import 'DBObject.dart';
import 'QPredicate.dart';
import 'Query.dart';

/// Represents a model type and implements both all the query predicates traslation
/// and the translation from and to the DBObject
///
/// You can find all the predicates to be implemented in QPredicate.dart
///
/// `G` is the type of the model in the used DB
/// `Q` is the type of the query predicate in the used DB
abstract class DBModelRegistration<G, Q> {
  final Map<QPredicate, Q? Function(Query)> _predicatesTranslations;

  final G Function(DBObject) fromDBModel;
  final DBObject Function(G) toDBModel;

  DBModelRegistration(
      this._predicatesTranslations, this.fromDBModel, this.toDBModel);

  Q? queryPredicateTranslation(Query query) {
    return _predicatesTranslations[query.predicate]!(query);
  }

  bool predicateIsSupported(QPredicate predicate) {
    return _predicatesTranslations.containsKey(predicate);
  }
}
