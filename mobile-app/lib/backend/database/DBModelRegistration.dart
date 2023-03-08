import 'package:amplify_flutter/amplify_flutter.dart';

import 'DBModel.dart';
import 'QPredicate.dart';
import 'Query.dart';

/// Represents a model type and implements both all the query predicates traslation
/// and the translation from and to the DBModel
///
/// You can find all the predicates to be implemented in QPredicate.dart
///
/// `G` is the type of the model in the used DB
/// `Q` is the type of the query predicate in the used DB
abstract class DBModelRegistration<G, Q> {
  final Map<QPredicate, Q? Function(Query)> _predicatesTranslations;

  final G Function(DBModel object,
          DBModelRegistration<G, Q> Function(Type type) getRegisteredModel)
      _fromDBModel;
  final DBModel Function(
      G object, DBModelRegistration<G, Q> Function(Type type)) _toDBModel;

  final DBModel Function(String id)? _getUnpopulated;

  late final DBModelRegistration<G, Q> Function(Type type) getRegisteredModel;

  DBModelRegistration(this._getUnpopulated, this._predicatesTranslations,
      this._fromDBModel, this._toDBModel);

  G? fromDBModel(DBModel? object) {
    if (object == null) return null;
    return _fromDBModel(object, getRegisteredModel);
  }

  DBModel? toDBModel(G? object) {
    if (object == null) return null;
    return _toDBModel(object, getRegisteredModel);
  }

  Q? queryPredicateTranslation(Query query) {
    return _predicatesTranslations[query.predicate]!(query);
  }

  bool predicateIsSupported(QPredicate predicate) {
    return _predicatesTranslations.containsKey(predicate);
  }

  List<G> fromDBModelList(List<DBModel> objects) {
    return objects.map((e) => fromDBModel(e)!).toList();
  }

  List<DBModel> toDBModelList<T>(List<G> objects) {
    return objects.map((e) => toDBModel(e)!).toList();
  }

  /// Returns a new instance of the model with only the given id.
  ///
  /// This method is used to save only the refeneces of the models in the DB
  /// in order to avoid overloading the DB with data that are not needed.
  /*T getUnpopulatedByID<T extends DBModel>(String id) {
    if (_getUnpopulated == null)
      throw Exception("getUnpopulated() is not given");

    var object = _getUnpopulated!(id);
    object.isPopulated = false;

    return object as T;
  }

  T getUnpopulated<T extends DBModel>(G object) {
    if (_getUnpopulated == null)
      throw Exception("getUnpopulated() is not given");

    String id = getID(object);
    return getUnpopulatedByID<T>(id);
  }

  String getID(G object);*/
}
