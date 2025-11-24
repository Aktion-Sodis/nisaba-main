import 'dart:io';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:path_provider/path_provider.dart';

import 'storage_repository.dart';

class SyncedFile {
  SyncedFile(this.path) {
    key = ValueKey(DateTime.now().toIso8601String());
  }

  String path;

  late Key key;

  Future<File?> file() async {
    File localCacheFile = await getCachePath();
    bool initiallyCached = await localCacheFile.exists();
    if (!initiallyCached) {
      try {
        print("file not in cache, loading it");
        await StorageRepository.downloadFile(localCacheFile, path);
        key = ValueKey(DateTime.now().toIso8601String());
        print("download finished: $key");
      }
      catch(e) {
        print("error downloading file: $e");
      }
    } else {
      print("found in cache: $path");
    }

    bool cached = await localCacheFile.exists();

    if (!cached) {
      print('not found file: return null');
      return null;
    }
    
    // Only update key if file was successfully loaded and this is the first time
    if (!initiallyCached) {
      key = ValueKey(DateTime.now().toIso8601String());
      print("returning file: $key");
    }
    return localCacheFile;
  }

  Future<File> getCachePath() async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    File targetFile = File('${appDocDir.path}/$path');
    if (!targetFile.parent.existsSync()) {
      targetFile.parent.createSync(recursive: true);
    }
    return targetFile;
  }

  Future<void> update(String utf8String) async {
    File localCacheFile = await getCachePath();
    await localCacheFile.writeAsString(utf8String, flush: true);
    StorageRepository.uploadFile(localCacheFile, path);
    key = ValueKey(DateTime.now().toIso8601String());
  }

  Future<File?> updateAsBytes(File file) async {
    var bytes = await file.readAsBytes();
    File localCacheFile = await getCachePath();
    await localCacheFile.writeAsBytes(bytes, flush: true);
    key = ValueKey(DateTime.now().toIso8601String());
    StorageRepository.uploadFile(localCacheFile, path);
    print("pic update finished: $key");
    return localCacheFile;
  }

  Future<File?> updateAsPic(XFile xfile) async {
    var bytes = await xfile.readAsBytes();
    File localCacheFile = await getCachePath();
    await localCacheFile.writeAsBytes(bytes, flush: true);
    key = ValueKey(DateTime.now().toIso8601String());
    print("pic update finished: $key");
    StorageRepository.uploadFile(localCacheFile, path);
    return localCacheFile;
  }

  Future<File?> updateAsAudio(File file) async {
    File localCacheFile = await getCachePath();
    await localCacheFile.writeAsBytes(file.readAsBytesSync(), flush: true);
    key = ValueKey(DateTime.now().toIso8601String());
    print("audio update finished: $key");
    StorageRepository.uploadFile(localCacheFile, path);
    return localCacheFile;
  }

  Future<void> delete() async {
    File localCacheFile = await getCachePath();
    await localCacheFile.delete();
    await StorageRepository.removeFile(path);
    key = ValueKey(DateTime.now().toIso8601String());
    print("delete finished: $key");
  }

  Future<bool> sync(SyncBloc syncBloc, {bool onlyUpload = false}) async {
    try {
      File localCacheFile = await getCachePath();
      bool cached = await localCacheFile.exists();
      if (!cached) {
        if (!onlyUpload) {
          await StorageRepository.downloadFile(localCacheFile, path,
              checkConnection: false);
          key = ValueKey(DateTime.now().toIso8601String());
          print("download finished: $key");
        }
      } else {
        StorageListResult listResult = await Amplify.Storage.list(path: StoragePath.fromString(path)).result;
        if (listResult.items.isEmpty) {
          StorageRepository.uploadFile(await getCachePath(), path,
              checkConnection: false);
        } else {
          DateTime? lastModifiedLocal;
          try {
            lastModifiedLocal = await localCacheFile.lastModified();
          } catch (e) {}
          DateTime? lastModifiedOnline = listResult.items.first.lastModified;
          if (lastModifiedOnline == null) {
            await StorageRepository.uploadFile(localCacheFile, path,
                checkConnection: false);
          } else if (lastModifiedLocal == null) {
            await StorageRepository.downloadFile(localCacheFile, path,
                checkConnection: false, lastModifiedOnline: lastModifiedOnline);
            key = ValueKey(DateTime.now().toIso8601String());
            print("download finished: $key");
          } else if (lastModifiedLocal.isAfter(lastModifiedOnline)) {
            await StorageRepository.uploadFile(localCacheFile, path,
                checkConnection: false);
          } else if (lastModifiedLocal.isBefore(lastModifiedOnline)) {
            await StorageRepository.downloadFile(localCacheFile, path,
                checkConnection: false, lastModifiedOnline: lastModifiedOnline);
            key = ValueKey(DateTime.now().toIso8601String());
            print("download finished: $key");
          }
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
