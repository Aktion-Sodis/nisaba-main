import 'dart:io';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/utils/connectivity.dart';

import 'dataStorePaths.dart';

class StorageRepository {
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

      await Amplify.Storage.downloadFile(key: path, local: toDownload);
      //set local last changed to onlyine last changed

      if(lastModifiedOnline!=null) {
        await toDownload.setLastModified(lastModifiedOnline);
      }
      else {
        try {
          ListResult listResult = await Amplify.Storage.list(path: path);
          if(listResult.items.isNotEmpty) {
            lastModifiedOnline = listResult.items.first.lastModified;
            if(lastModifiedOnline!=null) {
              await toDownload.setLastModified(lastModifiedOnline);
            }
          }
        } catch(e) {
          print('Error in catching last modified online');
        }
      }


      print("file for $path successfully downloaded");
    } catch (e) {
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
      final result = await Amplify.Storage.uploadFile(
        local: file,
        key: dataStorePath,
      );

      return result.key;
    } catch (e) {
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
      final result = await Amplify.Storage.remove(
        key: path,
        // options: options
      );
      return result.key;
    } catch (e) {
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
}
