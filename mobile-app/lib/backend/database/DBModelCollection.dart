import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/DBObject.dart';

import 'QPredicate.dart';
import 'Query.dart';

class DBModelCollection<R extends DBModelRegistration> {
  final Map<Type, R> _registeredModels = {};

  R getRegisteredModel<G>() {
    if (_registeredModels[G] == null) {
      throw Exception("Model not registered");
    }
    return _registeredModels[G]!;
  }

  void registerModel(Type type, R registration) {
    if (!checkRequiredPredicates(registration)) {
      throw Exception(
          "Required predicates are not registered for ${type.toString()}");
    }
    _registeredModels[type] = registration;
  }

  /// Returns true if the model is registered and has all required predicates
  ///
  /// Required predicates are:
  /// - QPredicate.EQ
  /// - QPredicate.NE
  /// - QPredicate.GT
  /// - QPredicate.GE
  /// - QPredicate.LT
  /// - QPredicate.LE
  ///
  /// Optional predicates are:
  /// - QPredicate.BETWEEN
  /// - QPredicate.CONTAINS
  bool checkRequiredPredicates(DBModelRegistration registration) {
    if (!registration.predicatesTranslations.containsKey(QPredicate.EQ)) {
      return false;
    }
    if (!registration.predicatesTranslations.containsKey(QPredicate.NE)) {
      return false;
    }
    if (!registration.predicatesTranslations.containsKey(QPredicate.GT)) {
      return false;
    }
    if (!registration.predicatesTranslations.containsKey(QPredicate.GE)) {
      return false;
    }
    if (!registration.predicatesTranslations.containsKey(QPredicate.LT)) {
      return false;
    }
    if (!registration.predicatesTranslations.containsKey(QPredicate.LE)) {
      return false;
    }
    /* if(!registration.predicatesTranslations.containsKey(QPredicate.BETWEEN)){
      return false;
    }
    if(!registration.predicatesTranslations.containsKey(QPredicate.CONTAINS)){
      return false;
    } */

    return true;
  }
}
