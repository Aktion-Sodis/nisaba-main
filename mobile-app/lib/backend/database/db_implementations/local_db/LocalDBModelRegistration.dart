import 'package:flutter/material.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:sembast/sembast.dart';

typedef _TranslatedModelType = Map<String, Object?>;
typedef _TranslatedPredicateType = Finder;

class LocalDBModelRegistration extends DBModelRegistration<_TranslatedModelType,
    _TranslatedPredicateType> {
  @override
  static final Map<QPredicate, _TranslatedPredicateType Function(Query)>
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

  LocalDBModelRegistration({
    required ToDBModelConverter<_TranslatedModelType> toDBModel,
  }) : super(
            fromDBModel: _fromDBModel,
            toDBModel: toDBModel,
            predicatesTranslations: _predefinedPredicatesTranslations);

  static _TranslatedModelType _fromDBModel(
    DBModel model,
  ) {
    return model.toJson();
  }
}
