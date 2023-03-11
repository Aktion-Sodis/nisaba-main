import 'package:amplify_flutter/amplify_flutter.dart';

import 'DBModel.dart';
import 'QPredicate.dart';
import 'Query.dart';

typedef FromDBModelConverter<G> = G Function(DBModel object);

typedef ToDBModelConverter<G> = DBModel Function(G object);

typedef GetUnpopulated = DBModel Function(String id);

typedef GetRegisteredModel<G, Q> = DBModelRegistration<G, Q> Function(
    Type type);

/// Represents a model type and implements both all the query predicates traslation
/// and the translation from and to the DBModel
///
/// You can find all the predicates to be implemented in QPredicate.dart
///
/// `G` is the type of the model in the used DB
/// `Q` is the type of the query predicate in the used DB
abstract class DBModelRegistration<G, Q> {
  late final Map<QPredicate, Q? Function(Query)> _predicatesTranslations;

  late final FromDBModelConverter<G> _fromDBModel;
  late final ToDBModelConverter<G> _toDBModel;

  DBModelRegistration(
      {required Map<QPredicate, Q? Function(Query)> predicatesTranslations,
      required FromDBModelConverter<G> fromDBModel,
      required ToDBModelConverter<G> toDBModel}) {
    _predicatesTranslations = predicatesTranslations;
    _fromDBModel = fromDBModel;
    _toDBModel = toDBModel;
  }

  G? fromDBModel(DBModel? object) {
    if (object == null) return null;
    return _fromDBModel(object);
  }

  DBModel? toDBModel(G? object) {
    if (object == null) return null;
    return _toDBModel(object);
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
