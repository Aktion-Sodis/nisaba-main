import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:path_provider/path_provider.dart';

class HiveDBHelper {
  static final HiveDBHelper instance = HiveDBHelper();

  final Map<HiveDBBoxNames, Box> _openedBoxes = {};

  Future<void> init() async {
    String appDir = (await getApplicationDocumentsDirectory()).path;
    Hive.init(appDir);

    await openBox(HiveDBBoxNames.localData);
  }

  Box getBox(HiveDBBoxNames name) {
    return _openedBoxes[name]!;
  }

  Future<Box> openBox(HiveDBBoxNames name) async {
    Box result = await Hive.openBox(name.toString());

    if (!_openedBoxes.containsKey(name)) {
      _openedBoxes[name] = result;
    }

    return Future.value(result);
  }

  Future<void> close() async {
    var copy = _openedBoxes.keys.toSet();
    for (HiveDBBoxNames key in copy) {
      await _openedBoxes[key]!.close();
      _openedBoxes.remove(key);
    }
  }
}

enum HiveDBBoxNames {
  localData,
}
