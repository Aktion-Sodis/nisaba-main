import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';

import '../../DBModel.dart';
import '../../QPredicate.dart';
import '../../Query.dart';

class RemoteDBModelRegistration
    extends DBModelRegistration<Object, QueryPredicate> {
  final ModelType? modelType;
  late final String Function(Object)? _getID;

  RemoteDBModelRegistration(
      {required List<QueryField> modelAttributes,
      required DBModel Function(String id)? getUnpopulated,
      required String Function(Object)? getID,
      required Object Function(
              DBModel object,
              DBModelRegistration<Object, QueryPredicate> Function(Type)
                  getRegisteredModes)
          fromDBModel,
      required DBModel Function(
              Object amplifyModel,
              DBModelRegistration<Object, QueryPredicate> Function(Type)
                  getRegisteredModes)
          toDBModel,
      required this.modelType})
      : super(getUnpopulated, generatePredicatesTranslations(modelAttributes),
            fromDBModel, toDBModel) {
    _getID = getID;
  }

  static Map<QPredicate, QueryPredicate<Model>? Function(Query p1)>
      generatePredicatesTranslations(List<QueryField> attributesInput) {
    Map<QPredicate, QueryPredicate<Model>? Function(Query p1)>
        predicatesTranslations = {};

    List<QueryField> attributes = attributesInput.toList();

    predicatesTranslations[QPredicate.EQ] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.eq(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.NE] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.ne(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.LE] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.le(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.LT] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.lt(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.GE] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.ge(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.GT] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.gt(query.attr1);
        }
      }
    };

    predicatesTranslations[QPredicate.BETWEEN] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.between(query.attr1, query.attr2);
        }
      }
    };

    /*predicatesTranslations[QPredicate.CONTAINS] = (Query query) {
      for (var attribute in attributes) {
        if (query.key == attribute.fieldName) {
          return attribute.contains(query.attr1);
        }
      }
    };*/

    return predicatesTranslations;
  }

  @override
  String getID(Object object) {
    if (_getID == null) throw Exception("getID() is not provided!");

    return _getID!(object);
  }
}
