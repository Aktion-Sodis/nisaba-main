import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/components/audio/audio_stateful_widget.dart';
import 'package:mobile_app/services/audio.dart';

// ignore: must_be_immutable
class PlayerWidget extends AudioStatefulWidget {
  PlayerWidget(
      {Key? key,
      Audio? audio,
      required this.audioURL,
      required this.restingViewBuilder,
      required this.loadingViewBuilder,
      required this.recordingViewBuilder})
      : super(key: key, audio: audio);

  final String audioURL;
  final Widget Function(Function()? startPlaying) restingViewBuilder;
  final Widget Function() loadingViewBuilder;
  final Widget Function(Function() stopPlaying) recordingViewBuilder;

  @override
  State<PlayerWidget> createState() => _PlayerWidgetState();
}

class _PlayerWidgetState extends AudioStatefulWidgetState<PlayerWidget> {
  bool _playing = false;

  void _startPlaying() {
    if (mounted) {
      setState(() {
        _playing = true;
      });
    }

    widget.audio.player.startPlayer(
        fromURI: widget.audioURL,
        whenFinished: () {
          // Refresh UI
          if (mounted) {
            setState(() {
              _playing = false;
            });
          }
        });
  }

  void _stopPlaying() {
    if (mounted) {
      setState(() {
        _playing = false;
      });
    }

    widget.audio.player.stopPlayer();
  }

  @override
  Widget build(BuildContext context) {
    if (_playing) {
      return widget.recordingViewBuilder(_stopPlaying);
    } else {
      if (widget.audio.sessionOpened) {
        return widget.restingViewBuilder(_startPlaying);
      } else {
        return widget.loadingViewBuilder();
      }
    }
  }
}
