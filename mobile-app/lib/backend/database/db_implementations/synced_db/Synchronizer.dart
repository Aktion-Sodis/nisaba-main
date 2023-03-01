import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueue.dart';

import '../../DB.dart';
import '../../DBErrorType.dart';
import 'SyncStatus.dart';

class Synchronizer {
  final DB localDB;
  final DB remoteDB;
  final DBQueue queue;

  SyncStatus downstreamSyncStatus = SyncStatus.UP_TO_DATE;

  SyncStatus upstreamSyncStatus = SyncStatus.UP_TO_DATE;

  Synchronizer(this.localDB, this.remoteDB, this.queue);

  Future<void> syncUpstream() {
    throw UnimplementedError();
  }

  Future<void> syncDownstream() {
    throw UnimplementedError();
  }

  void subscribeErrorStream(Function(DBErrorType errorType) onError) {
    throw UnimplementedError();
  }
}
