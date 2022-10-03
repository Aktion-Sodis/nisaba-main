import 'package:hive/hive.dart';
import 'package:mobile_app/backend/callableModels/localModels/upload_queue_item.dart';
import 'package:mobile_app/services/hive_db_helper.dart';

class UploadQueue {
  static Box get _table => HiveDBHelper.instance.getBox("settings");

  static Future<void> add(String localPath, String remotePath) async {
    await _table.add({"localPath": localPath, "remotePath": remotePath});
  }

  static List<UploadQueueItem> get() {
    List<UploadQueueItem> list = [];
    Iterable<dynamic> keys = _table.keys;

    for (dynamic key in keys) {
      UploadQueueItem item = UploadQueueItem(
          key, _table.get(key)["localPath"], _table.get(key)["remotePath"]);

      list.add(item);
    }

    return list;
  }

  static Future<void> remove(dynamic key) async {
    await _table.delete(key);
  }
}
