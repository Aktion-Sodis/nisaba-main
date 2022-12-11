import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';

class SyncTrigger extends StatefulWidget {
  const SyncTrigger({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  State<SyncTrigger> createState() => _SyncTriggerState();
}

class _SyncTriggerState extends State<SyncTrigger> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    if (WidgetsBinding.instance != null) {
      WidgetsBinding.instance!.addObserver(this);
    }
  }

  @override
  void dispose() {
    super.dispose();
    if (WidgetsBinding.instance != null) {
      WidgetsBinding.instance!.removeObserver(this);
    }
  }

  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    switch (state) {
      case AppLifecycleState.resumed:
        BlocProvider.of<SyncBloc>(context).fulfillSync(false);
        break;
      case AppLifecycleState.inactive:
      case AppLifecycleState.paused:
      case AppLifecycleState.detached:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}
