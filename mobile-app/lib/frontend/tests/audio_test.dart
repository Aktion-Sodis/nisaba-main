import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/services/audio.dart';
import 'package:mobile_app/services/storage.dart';
import 'package:path_provider/path_provider.dart';

class AudioTest extends StatefulWidget {
  AudioTest({Key? key}) : super(key: key);

  @override
  State<AudioTest> createState() => _AudioTestState();
}

class _AudioTestState extends State<AudioTest> {
  final Audio audio = Audio();
  String? _recorderURI;

  Future<void> _openSession() => audio.openSession();

  Future<void> _closeSession() => audio.closeSession();

  Future<void> _startRecording() async {
    Directory tempDir = await getTemporaryDirectory();
    String filepath = tempDir.path +
        "/test_audio_" +
        DateTime.now().microsecondsSinceEpoch.toString() +
        ".aac";
    String freeFilepath = await getFreeFilepath(filepath);

    audio.recorder.startRecorder(
      toFile: freeFilepath,
      codec: Codec.aacADTS,
    );
  }

  Future<void> _stopRecording() async {
    _recorderURI = await audio.recorder.stopRecorder();
  }

  void _startPlaying() {
    if (_recorderURI != null)
      audio.player.startPlayer(fromURI: _recorderURI);
    else
      print("Nothing has been recorded yet");
  }

  Future<void> _stopPlaying() => audio.player.stopPlayer();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Test of flutter_sound"),
      ),
      body: ListView(
        padding: EdgeInsets.all(defaultPadding(context)),
        children: [
          ElevatedButton(
            onPressed: _openSession,
            child: Text("Open session"),
          ),
          ElevatedButton(
            onPressed: _closeSession,
            child: Text("Close session"),
          ),
          Divider(),
          ElevatedButton(
            onPressed: _startRecording,
            child: Text("Start recorder"),
          ),
          ElevatedButton(
            onPressed: _stopRecording,
            child: Text("Stop recorder"),
          ),
          Divider(),
          ElevatedButton(
            onPressed: _startPlaying,
            child: Text("Start player"),
          ),
          ElevatedButton(
            onPressed: _stopPlaying,
            child: Text("Stop player"),
          ),
        ],
      ),
    );
  }
}
