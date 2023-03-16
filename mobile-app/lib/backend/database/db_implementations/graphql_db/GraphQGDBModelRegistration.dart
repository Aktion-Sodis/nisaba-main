import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';

typedef _TranslatedModelType = Map<String, Object?>;
typedef _TranslatedPredicateType = Object;

class GraphQLDBModelRegistration extends DBModelRegistration<
    _TranslatedModelType, _TranslatedPredicateType> {
  static final Map<QPredicate, _TranslatedPredicateType? Function(Query p1)>
      _predicatesTranslations = {
    QPredicate.EQ: (p1) => {
          p1.key: {"eq": p1.attr1}
        },
    QPredicate.NE: (p1) => {
          p1.key: {"ne": p1.attr1}
        },
    QPredicate.GT: (p1) => {
          p1.key: {"gt": p1.attr1}
        },
    QPredicate.GE: (p1) => {
          p1.key: {"ge": p1.attr1}
        },
    QPredicate.LT: (p1) => {
          p1.key: {"lt": p1.attr1}
        },
    QPredicate.LE: (p1) => {
          p1.key: {"le": p1.attr1}
        },
    /*QPredicate.BETWEEN: (p1) => {
          "filter": {
            p1.key: {
              "between": [p1.attr1, p1.attr2]
            }
          }
        },*/
    QPredicate.CONTAINS: (p1) => {
          p1.key: {"contains": p1.attr1}
        }
  };

  static _TranslatedModelType _fromDBModel(DBModel object) {
    return object.toJson();
  }

  final Map<String, dynamic> queryFields;

  final String createMutation;
  final String updateMutation;
  final String deleteMutation;
  final String getQuery;
  final String listQuery;

  GraphQLDBModelRegistration(
      //DBModel Function(String id)? getUnpopulated,
      {required ToDBModelConverter<_TranslatedModelType> toDBModel,
      _TranslatedModelType Function(_TranslatedModelType)?
          toDBModelPreprocessor,
      required this.queryFields,
      required this.createMutation,
      required this.updateMutation,
      required this.deleteMutation,
      required this.getQuery,
      required this.listQuery})
      : super(
            predicatesTranslations: _predicatesTranslations,
            fromDBModel: _fromDBModel,
            toDBModel: (input) {
              if (toDBModelPreprocessor != null) {
                return toDBModel(toDBModelPreprocessor(input));
              } else {
                return toDBModel(input);
              }
            });

  @override
  String getID(Map<String, Object?> object) {
    return object["id"] as String;
  }
}
