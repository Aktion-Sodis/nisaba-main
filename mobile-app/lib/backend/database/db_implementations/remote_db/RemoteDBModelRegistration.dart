import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';

import '../../DBObject.dart';
import '../../QPredicate.dart';
import '../../Query.dart';

class RemoteDBModelRegistration
    extends DBModelRegistration<Model, QueryPredicate> {
  final ModelType modelType;

  RemoteDBModelRegistration(
      {required Map<QPredicate, QueryPredicate<Model>? Function(Query p1)>
          predicatesTranslations,
      required Model Function(DBObject object) fromDBModel,
      required DBObject Function(Model amplifyModel) toDBModel,
      required this.modelType})
      : super(predicatesTranslations, fromDBModel, toDBModel);
}
