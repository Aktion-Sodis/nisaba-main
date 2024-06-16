import 'dart:async';

import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_events.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/DBModelRegistration.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/remote_db/DBExceptions.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueue.dart';
import 'package:mobile_app/backend/storage/storage_repository.dart';
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
  final SyncBloc syncBloc;

  final Lock _downstreamSyncLock = Lock();
  final Lock _upstreamSyncLock = Lock();

  Synchronizer(this.localDB, this.remoteDB, this.queue,
      this.modelsToSyncDownstream, this.registeredTypes, this.syncBloc) {
    queue.getNumberOfQueuedEntries().then((value) =>
        syncBloc.add(InitEntityAndSurveyCountEvent(value[1], value[0])));
  }

  Future<void> syncUpstream() async {
    print('[SYNC] sync upstream');
    await _upstreamSyncLock.synchronized(() async {
      print('[Sync] Syncing Upstream not locked');
      /*if (upstreamSyncStatus == SyncStatus.STOPPED) {
        print('[Sync] Syncing Upstream stopped status');
        return;
      }*/

      upstreamSyncStatus = SyncStatus.SYNCING;
      try {
        DBQueueObject? queueObject = await queue.get();
        while (queueObject != null) {
          try {
            print('[Sync] processing queue object ' +
                queueObject.action.toString());
            print('[Sync] processing queue object ' +
                queueObject.toJson().toString());

            if (queueObject.action == DBAction.DELETE) {
              print('[Sync] now deletes');
              await remoteDB.delete(queueObject.object);
            } else if (queueObject.action == DBAction.CREATE) {
              print('[Sync] now creates');
              await remoteDB.create(queueObject.object);
            } else if (queueObject.action == DBAction.UPDATE) {
              print('[Sync] now updates');
              await remoteDB.update(queueObject.object);
            }

            print('[Sync] now deletes queue object');
            await queue.delete(queueObject);

            if (queueObject.object is ExecutedSurvey) {
              syncBloc.add(UploadedSurveyEvent());
            } else {
              syncBloc.add(UploadedOtherEntityEvent());
            }

            queueObject = await queue.get();
          } on NoConnectionException catch (e) {
            //rethrow exception to stop sync process
            rethrow;
          } on OperationException catch (e) {
            if (e.graphqlErrors.isEmpty && e.linkException is ServerException) {
              //no graph ql error but server exception
              ServerException serverException =
                  e.linkException! as ServerException;
              if (serverException.statusCode == null) {
                throw (NoConnectionException());
              }
            } else if (e.graphqlErrors.isEmpty &&
                e.linkException is UnknownException) {
              UnknownException unknownException =
                  e.linkException! as UnknownException;
              if (unknownException.message
                  .contains('SessionExpiredException')) {
                throw (NoConnectionException());
              }
            }

            //only called if no internet exception
            if (queueObject!.object is ExecutedSurvey) {
              syncBloc.add(FailedSurveyEvent());
            } else {
              syncBloc.add(FailedOtherEntityEvent());
            }

            //todo: handle other error in upload -> upload in s3 bucket
            print('[Sync] Error in DB Upstream Sync:');
            print(e);

            Map<String, dynamic> objectJson = queueObject!.object.toJson();

            bool hasBeenSaved = await StorageRepository.dbObjectSave(
                objectJson, objectJson['id']);

            if (hasBeenSaved) {
              if (queueObject.object is Survey) {
                syncBloc.add(SavedFailedSurveyEvent());
              } else {
                syncBloc.add(SavedFailedOtherEntityEvent());
              }
              //remove from queue
              await queue.delete(queueObject);
            } else {
              throw (NoConnectionException());
            }

            //then set queueObject
            queueObject = await queue.get();
          } catch (e) {
            if (queueObject!.object is ExecutedSurvey) {
              syncBloc.add(FailedSurveyEvent());
            } else {
              syncBloc.add(FailedOtherEntityEvent());
            }

            //todo: handle other error in upload -> upload in s3 bucket
            print('[Sync] Error in DB Upstream Sync:');
            print(e);

            Map<String, dynamic> objectJson = queueObject!.object.toJson();

            bool hasBeenSaved = await StorageRepository.dbObjectSave(
                objectJson, objectJson['id']);

            if (hasBeenSaved) {
              if (queueObject.object is Survey) {
                syncBloc.add(SavedFailedSurveyEvent());
              } else {
                syncBloc.add(SavedFailedOtherEntityEvent());
              }
              //remove from queue
              await queue.delete(queueObject);
            } else {
              throw (NoConnectionException());
            }

            //then set queueObject
            queueObject = await queue.get();
          }
        }
        upstreamSyncStatus = SyncStatus.UP_TO_DATE;
      } on NoConnectionException catch (e) {
        syncBloc.add(CancelSyncEvent());
        upstreamSyncStatus = SyncStatus.WAITING;
      } catch (e) {
        print('[Sync] Error in DB Upstream Sync:');
        print(e);
        syncBloc.add(CancelSyncEvent());
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
      print('[Sync] Syncing Downstream');
      downstreamSyncStatus = SyncStatus.SYNCING;
      try {
        // Download all entries from remoteDB
        List<DBModel> entries = [];
        for (Type modelType in modelsToSyncDownstream) {
          print('getting model type: ' + modelType.toString());
          List<DBModel> modelEntries = await remoteDB.get(modelType);
          entries.addAll(modelEntries);
        }
        print('[LocalDB] now clearing due to downstream sync');
        // Delete all entries from localDB
        await localDB.clear();

        // Insert all entries into localDB
        for (DBModel entry in entries) {
          await localDB.update(entry);
        }

        // TODO: consistency check
      } on NoConnectionException catch (e) {
        downstreamSyncStatus = SyncStatus.WAITING;
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
