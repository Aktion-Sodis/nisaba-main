import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:isolate_image_compress/isolate_image_compress.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/utils/photo_capturing.dart';

class ImageCompressionTest extends StatelessWidget {
  const ImageCompressionTest({Key? key}) : super(key: key);

  Future<void> _startTest(BuildContext context) async {
    print("Start test:");

    final ImagePicker imagePicker = ImagePicker();
    final XFile? picture = await imagePicker.pickImage(
        source: ImageSource.camera, imageQuality: 80, maxWidth: 1080);
    print("A picture has been chosen");

    int lengthBeforeCompressing = await picture!.length();
    print("Picture size before compressing: " +
        lengthBeforeCompressing.toString());

    int upperBoundLength = (lengthBeforeCompressing ~/ 2);
    print("Max expected file size: " + upperBoundLength.toString());

    IsolateImage toCompress = IsolateImage.path(picture.path);
    Uint8List? compressed =
        await toCompress.compress(maxSize: upperBoundLength);
    File file = File(picture.path);
    await file.writeAsBytes(compressed!);

    int lengthAfterCompressing = await picture!.length();
    print(
        "Picture size after compressing: " + lengthAfterCompressing.toString());

    bool compressionSatisfied = lengthAfterCompressing <= upperBoundLength;
    print("The compression is satisfying: " + compressionSatisfied.toString());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of isolate_image_compress"),
        ),
        body: Scrollbar(
            child: ListView(
                padding: EdgeInsets.all(defaultPadding(context)),
                children: [
              ElevatedButton(
                onPressed: () => _startTest(context),
                child: const Text("Choose photo and test"),
              ),
            ])));
  }
}
