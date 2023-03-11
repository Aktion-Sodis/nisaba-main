import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDBModelRegistration.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/RemoteDBModelRegistration.dart';

class SyncedDBModelRegistration extends DBModelRegistration<Object?, Object?> {
  final bool haveToSyncDownstream;

  late final LocalDBModelRegistration localDBModelRegistration;
  late final DBModelRegistration remoteDBModelRegistration;

  /// Actually, this is not used in the synced db, but it is required by the
  /// [DBModelRegistration] class
  ///
  ///
  static final Map<QPredicate, Object? Function(Query<dynamic>)>
      _predicatesTranlation = {
    QPredicate.EQ: (query) => query,
    QPredicate.GT: (query) => query,
    QPredicate.GE: (query) => query,
    QPredicate.LT: (query) => query,
    QPredicate.LE: (query) => query,
    QPredicate.NE: (query) => query,
    // TODO: Implement these in LocalDB and RemoteDB
    // QPredicate.BETWEEN: (query) => query,
    // QPredicate.CONTAINS: (query) => query,
  };

  SyncedDBModelRegistration(
      {required this.haveToSyncDownstream,
      required this.localDBModelRegistration,
      required this.remoteDBModelRegistration})
      : super(
          predicatesTranslations: _predicatesTranlation,
          fromDBModel: (model) => throw UnimplementedError(),
          toDBModel: (object) => throw UnimplementedError(),
        );

  @override
  String getID(Object? object) {
    // Unnecessary, as this is not used in the synced db
    throw UnimplementedError();
  }
}
