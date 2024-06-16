import 'dart:io';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/services.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_events.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/utils/connectivity.dart';
import 'package:path_provider/path_provider.dart';

import 'dataStorePaths.dart';

class StorageRepository {
  static SyncBloc? syncBloc;

  static Future<bool> hasConnectivity() async {
    if (_last_connectivity_check != null) {
      if (_last_connectivity_check!.difference(DateTime.now()).inSeconds < 2) {
        if (_had_connectivity != null) {
          return Future.value(_had_connectivity);
        }
      }
    }

    try {
      final result = await InternetAddress.lookup('google.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
        _had_connectivity = true;
      } else {
        _had_connectivity = false;
      }
    } on SocketException catch (_) {
      _had_connectivity = false;
    }
    _last_connectivity_check = DateTime.now();
    return _had_connectivity!;
  }

  static bool? _had_connectivity;
  static DateTime? _last_connectivity_check;

  static Future<void> downloadFile(File toDownload, String path,
      {bool checkConnection = true, DateTime? lastModifiedOnline}) async {
    try {
      //print("trying to get file: $path");
      if (checkConnection) {
        InternetConnectionType internetConnectionType =
            await StorageRepository.currentInternetConnectionType();
        if (LocalDataRepository.instance.wifiOnly &&
            internetConnectionType != InternetConnectionType.WIFI) {
          return;
        }
      }

      syncBloc?.add(StartLoadingFileEvent());

      //check internet connection
      if (!await hasConnectivity()) {
        syncBloc?.add(CancelSyncEvent());
        return;
      }

      await Amplify.Storage.downloadFile(key: path, local: toDownload);
      //set local last changed to onlyine last changed
      syncBloc?.add(LoadedFileEvent());

      if (lastModifiedOnline != null) {
        await toDownload.setLastModified(lastModifiedOnline);
      } else {
        try {
          ListResult listResult = await Amplify.Storage.list(path: path);
          if (listResult.items.isNotEmpty) {
            lastModifiedOnline = listResult.items.first.lastModified;
            if (lastModifiedOnline != null) {
              await toDownload.setLastModified(lastModifiedOnline);
            }
          }
        } catch (e) {
          print('Error in catching last modified online');
        }
      }

      print("file for $path successfully downloaded");
    } catch (e) {
      syncBloc?.add(LoadedFileEvent());
      //todo: handle with sync bloc
      print("not found $path");
      print(e.toString());
    }
  }

  static Future<String> uploadFile(File file, String dataStorePath,
      {bool checkConnection = true}) async {
    try {
      if (checkConnection) {
        bool wifiOnly = LocalDataRepository.instance.wifiOnly;

        InternetConnectionType internetConnectionType =
            await StorageRepository.currentInternetConnectionType();
        if (wifiOnly && internetConnectionType != InternetConnectionType.WIFI) {
          return dataStorePath;
        }
      }

      //add to sync bloc
      syncBloc?.add(StartLoadingFileEvent());

      if (!await hasConnectivity()) {
        syncBloc?.add(CancelSyncEvent());
        return dataStorePath;
      }

      final result = await Amplify.Storage.uploadFile(
        local: file,
        key: dataStorePath,
      );

      //remove from sync bloc
      syncBloc?.add(LoadedFileEvent());

      return result.key;
    } catch (e) {
      syncBloc?.add(LoadedFileEvent());
      //remove from sync bloc
      return dataStorePath;
    }
  }

  static Future<String> getUrlForFile(String path) async {
    try {
      final result = await Amplify.Storage.getUrl(key: path);
      return result.url;
    } catch (e) {
      rethrow;
    }
  }

  static Future<String> removeFile(String path) async {
    try {
      // RemoveOptions options =
      // RemoveOptions(accessLevel: StorageAccessLevel.guest);

      //send to sync bloc
      syncBloc?.add(StartLoadingFileEvent());

      if (!await hasConnectivity()) {
        syncBloc?.add(CancelSyncEvent());
        return path;
      }

      final result = await Amplify.Storage.remove(
        key: path,
        // options: options
      );

      syncBloc?.add(LoadedFileEvent());

      return result.key;
    } catch (e) {
      //remove from sync bloc
      syncBloc?.add(LoadedFileEvent());
      rethrow;
    }
  }

  static Future<InternetConnectionType> currentInternetConnectionType() async {
    try {
      final result = await InternetAddress.lookup('example.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
        //connection, now checking wether wifi or mobile
        var connectivityResult = await Connectivity().checkConnectivity();
        if (connectivityResult == ConnectivityResult.mobile) {
          return InternetConnectionType.MOBILE;
        } else if (connectivityResult == ConnectivityResult.wifi) {
          return InternetConnectionType.WIFI;
        } else {
          return InternetConnectionType.OFFLINE;
        }
      } else {
        //no connection
        return InternetConnectionType.OFFLINE;
      }
    } on SocketException catch (_) {
      //no connection
      return InternetConnectionType.OFFLINE;
    }
  }

  static Future<bool> dbObjectSave(
      Map<String, dynamic> values, String id) async {
    String path = dataStorePath(DataStorePaths.failedDBObject, [id]);

    try {
      //upload json files from values

      //create a file in cache from values without a constant path -> will be deleted afterwards
      Directory appDocDir = await getApplicationDocumentsDirectory();
      File localCacheFile = File('${appDocDir.path}/$path.json');
      await localCacheFile.writeAsString(values.toString(), flush: true);
      await Amplify.Storage.uploadFile(
        local: localCacheFile,
        key: path,
      );
      await localCacheFile.delete();
      return true;
    } catch (e) {
      print('error in db save operation');
      print(e.toString());
      return false;
    }
  }
}
