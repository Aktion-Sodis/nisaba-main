import 'dart:async';

import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/DBExceptions.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueue.dart';
import 'package:synchronized/synchronized.dart';
import '../../../../frontend/tests/synced_db_test.dart';
import '../../DB.dart';
import '../../DBErrorType.dart';
import 'DBQueueObject.dart';
import 'SyncStatus.dart';

class Synchronizer {
  final DB localDB;
  final DB remoteDB;
  final Set<Type> modelsToSyncDownstream;
  final List<Type> registeredTypes;
  final DBQueue queue;

  final Lock _downstreamSyncLock = Lock();
  final Lock _upstreamSyncLock = Lock();

  Synchronizer(this.localDB, this.remoteDB, this.queue,
      this.modelsToSyncDownstream, this.registeredTypes);

  Future<void> syncUpstream() async {
    await _upstreamSyncLock.synchronized(() async {
      if (upstreamSyncStatus == SyncStatus.STOPPED) {
        return;
      }

      upstreamSyncStatus = SyncStatus.SYNCING;
      try {
        DBQueueObject? queueObject = await queue.get();
        while (queueObject != null) {
          print('[Sync] processing queue object ' + queueObject.action.toString());

        if((queueObject.action == DBAction.CREATE || queueObject.action == DBAction.UPDATE) && queueObject.modelType == 'Entity') {
          print('Entity gets created or updated');
          //remove level from json paiload
        }  

          if (queueObject.action == DBAction.DELETE) {
            await remoteDB.delete(queueObject.object);
          } else if (queueObject.action == DBAction.CREATE) {
            await remoteDB.create(queueObject.object);
          } else if (queueObject.action == DBAction.UPDATE) {
            await remoteDB.update(queueObject.object);
          }
          
          await queue.delete(queueObject);
          queueObject = await queue.get();
        }
        upstreamSyncStatus = SyncStatus.UP_TO_DATE;
      } on NoConnectionException catch (e) {
        upstreamSyncStatus = SyncStatus.WAITING;
      } catch (e) {
        print('[Sync] Error in DB Upstream Sync:');
        print(e);
        upstreamSyncStatus = SyncStatus.STOPPED;
      }
    });
  }

  Type _getRegisteredTypeByString(String typeString) {
    for (Type type in registeredTypes) {
      if (type.toString() == typeString) {
        return type;
      }
    }
    throw Exception('Type $typeString not registered');
  }

  Future<void> syncDownstream() async {
    await _downstreamSyncLock.synchronized(() async {
      downstreamSyncStatus = SyncStatus.SYNCING;
      try {
        // Download all entries from remoteDB
        List<DBModel> entries = [];
        for (Type modelType in modelsToSyncDownstream) {
          List<DBModel> modelEntries = await remoteDB.get(modelType);
          entries.addAll(modelEntries);
        }

        // Delete all entries from localDB
        await localDB.clear();

        // Insert all entries into localDB
        for (DBModel entry in entries) {
          await localDB.update(entry);
        }

        // TODO: consistency check
      } catch (e) {
        print('Error in DB Downstream Sync:');
        print(e);
        downstreamSyncStatus = SyncStatus.UP_TO_DATE;
        rethrow;
      }
    });
  }

  SyncStatus _downstreamSyncStatus = SyncStatus.UP_TO_DATE;

  final StreamController<SyncStatus> _downstreamSyncStatusStreamController =
      StreamController.broadcast();

  SyncStatus get downstreamSyncStatus => _downstreamSyncStatus;

  set downstreamSyncStatus(SyncStatus value) {
    _downstreamSyncStatus = value;
    _downstreamSyncStatusStreamController.add(value);
  }

  void subscribeDownstreamSyncStatusStream(
      Function(SyncStatus syncStatus) onSyncStatus) {
    _downstreamSyncStatusStreamController.stream.listen(onSyncStatus);
  }

  SyncStatus _upstreamSyncStatus = SyncStatus.UP_TO_DATE;

  SyncStatus get upstreamSyncStatus => _upstreamSyncStatus;
  set upstreamSyncStatus(SyncStatus value) {
    _upstreamSyncStatus = value;
    _upstreamSyncStatusStreamController.add(value);
  }

  final StreamController<SyncStatus> _upstreamSyncStatusStreamController =
      StreamController.broadcast();

  void subscribeUpstreamSyncStatusStream(
      Function(SyncStatus syncStatus) onSyncStatus) {
    _upstreamSyncStatusStreamController.stream.listen(onSyncStatus);
  }
}
