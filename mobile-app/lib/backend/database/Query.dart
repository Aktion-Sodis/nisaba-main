import 'package:mobile_app/backend/database/QPredicate.dart';

class Query<G> {
  final QPredicate predicate;
  final String key;
  final G attr1;
  final G? attr2;

  Query(this.predicate, this.key, this.attr1, this.attr2);
}
