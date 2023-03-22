import 'dart:io';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';

enum InternetConnectionType { WIFI, MOBILE, OFFLINE }

Future<bool> isThereInternetConnection() async {
  InternetConnectionType internetConnectionType =
      await currentInternetConnectionType();

  if (internetConnectionType == InternetConnectionType.WIFI) {
    return true;
  } else if (internetConnectionType == InternetConnectionType.MOBILE) {
    return !LocalDataRepository.instance.wifiOnly;
  } else {
    return false;
  }
}

Future<InternetConnectionType> currentInternetConnectionType() async {
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
