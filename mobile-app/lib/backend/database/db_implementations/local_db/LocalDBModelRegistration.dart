import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/DBObject.dart';
import 'package:sembast/sembast.dart';

class LocalDBModelRegistration
    extends DBModelRegistration<Map<String, Object?>, Finder> {
  @override
  static final Map<QPredicate, Finder Function(Query)>
      _predefinedPredicatesTranslations = {
    QPredicate.EQ: (Query query) => Finder(
          filter: Filter.equals(query.key, query.attr1),
        ),
    QPredicate.NE: (Query query) => Finder(
          filter: Filter.notEquals(query.key, query.attr1),
        ),
    QPredicate.GT: (Query query) => Finder(
          filter: Filter.greaterThan(query.key, query.attr1),
        ),
    QPredicate.GE: (Query query) => Finder(
          filter: Filter.greaterThanOrEquals(query.key, query.attr1),
        ),
    QPredicate.LT: (Query query) => Finder(
          filter: Filter.lessThan(query.key, query.attr1),
        ),
    QPredicate.LE: (Query query) => Finder(
          filter: Filter.lessThanOrEquals(query.key, query.attr1),
        ),
    QPredicate.BETWEEN: (Query query) => Finder(
          filter: Filter.and([
            Filter.greaterThanOrEquals(query.key, query.attr1),
            Filter.lessThanOrEquals(query.key, query.attr1)
          ]),
        ),
  };

  LocalDBModelRegistration(
      {required Map<String, Object?> Function(DBObject) fromDBModel,
      required DBObject Function(Map<String, Object?>) toDBModel})
      : super(_predefinedPredicatesTranslations, fromDBModel, toDBModel);
}