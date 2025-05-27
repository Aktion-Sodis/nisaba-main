import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/widgets.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_app/utils/exceptions/CameraError.dart';

abstract class CameraFunctionality {
  static const int maxSize = 500 * 1000; // 500MB

  static Future<XFile> takePicture({required BuildContext context}) async {
    final ImagePicker imagePicker = ImagePicker();
    final XFile? picture = await imagePicker.pickImage(
        source: ImageSource.camera, imageQuality: 80, maxWidth: 2000);
    debugPrint("Photo has been taken");

    if (picture == null) {
      throw CameraError();
    }

    await _compress(picture);
    bool isCompressionSatisfying = (await picture.length()) <= maxSize;
    debugPrint("Compression has been done. Compression satisfying: $isCompressionSatisfying");

    return picture;
  }

  static Future<void> _compress(XFile picture) async {
    Uint8List? compressed = await FlutterImageCompress.compressWithList(
      await picture.readAsBytes(),
      minWidth: 500,
      minHeight: 500,
      quality: 80,
    );
    File file = File(picture.path);
    await file.writeAsBytes(compressed);
  }
}
