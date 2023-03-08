import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';

class GraphQLDBModelRegistration
    extends DBModelRegistration<Map<String, Object?>, Object> {
  static final Map<QPredicate, Object? Function(Query p1)>
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

  static Map<String, Object?> _fromDBModel(
      DBModel object,
      DBModelRegistration<Map<String, Object?>, Object> Function(Type type)
          getRegisteredModel) {
    return object.toJson();
  }

  static DBModel _toDBModel(
      Map<String, Object?> object,
      DBModelRegistration<Map<String, Object?>, Object> Function(Type type)
          p1) {
    throw UnimplementedError();
  }

  final DBModel Function(Map<String, dynamic> map) modelFactory;

  final Map<String, dynamic> queryFields;

  final String createMutation;
  final String updateMutation;
  final String deleteMutation;
  final String getQuery;
  final String listQuery;

  GraphQLDBModelRegistration(
      //DBModel Function(String id)? getUnpopulated,
      this.modelFactory,
      this.queryFields,
      this.createMutation,
      this.updateMutation,
      this.deleteMutation,
      this.getQuery,
      this.listQuery)
      : super(null, _predicatesTranslations, _fromDBModel, _toDBModel);

  @override
  String getID(Map<String, Object?> object) {
    return object["id"] as String;
  }
}
