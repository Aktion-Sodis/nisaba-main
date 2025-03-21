import 'dart:typed_data';

import 'package:flutter_sound/flutter_sound.dart';
import 'package:mobile_app/frontend/components/audio/audio_stateful_widget.dart';

class Audio {
  static final Audio instance = Audio();

  final FlutterSoundPlayer _player = FlutterSoundPlayer();
  final FlutterSoundRecorder recorder = FlutterSoundRecorder();
  final List<AudioStatefulWidget> attachedTo = [];
  bool keepSessionOpened = false;
  bool _sessionOpened = false;
  bool get sessionOpened => _sessionOpened;

  void Function()? _onPlayerStop;

  Future<void> openSession() async {
    await _player.openPlayer();
    await recorder.openRecorder();
    _sessionOpened = true;
    _refreshAttachedWidgets();
  }

  Future<void> closeSession() async {
    await _player.closePlayer();
    await recorder.closeRecorder();
    _sessionOpened = false;
    _refreshAttachedWidgets();
  }

  Future<void> startPlayer({
    String? fromURI,
    Uint8List? fromDataBuffer,
    Codec codec = Codec.aacADTS,
    void Function()? whenFinished,
  }) async {
    if (_onPlayerStop != null) _onPlayerStop!();
    _onPlayerStop = whenFinished;
    
    await _player.startPlayer(
      fromURI: fromURI,
      fromDataBuffer: fromDataBuffer,
      codec: codec,
      whenFinished: () {
        _onPlayerStop = null;
        whenFinished?.call();
      },
    );
  }

  Future<void> stopPlayer() async {
    _onPlayerStop = null;
    await _player.stopPlayer();
  }

  Future<void> attachTo(AudioStatefulWidget widget) async {
    attachedTo.add(widget);
    if (!_sessionOpened && attachedTo.length == 1) await openSession();
  }

  Future<void> detachFrom(AudioStatefulWidget widget) async {
    if (attachedTo.remove(widget) &&
        attachedTo.isEmpty &&
        _sessionOpened &&
        !keepSessionOpened) {
      await closeSession();
    }
  }

  void _refreshAttachedWidgets() {
    for (AudioStatefulWidget widget in attachedTo) {
      widget.refresh?.call();
    }
  }
}
