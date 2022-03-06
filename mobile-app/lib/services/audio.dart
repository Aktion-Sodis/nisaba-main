import 'package:flutter_sound/flutter_sound.dart';
import 'package:flutter_sound/public/flutter_sound_player.dart';

class Audio {
  final FlutterSoundPlayer player = FlutterSoundPlayer();
  final FlutterSoundRecorder recorder = FlutterSoundRecorder();

  /**
   * You have to open the audio session before using it. The method initState() is a good place for it.
   */
  Future<void> openSession() async {
    await player.openAudioSession();
    await recorder.openAudioSession();
  }

  /**
   * You have to close the audio session to release all the resources, used by the plugin. The method dispose() is a good place for it.
   */
  Future<void> closeSession() async {
    await player.closeAudioSession();
    await recorder.closeAudioSession();
  }
}
