import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_events.dart';
import 'package:mobile_app/backend/Blocs/user/user_bloc.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';

class SyncTrigger extends StatefulWidget {
  const SyncTrigger({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  State<SyncTrigger> createState() => _SyncTriggerState();
}

class _SyncTriggerState extends State<SyncTrigger> with WidgetsBindingObserver {
  //todo: sync

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
        //SyncedDB.instance.synchronizer.syncDownstream();
        SyncedDB.instance.synchronizer.syncUpstream();
        break;
      case AppLifecycleState.inactive:
        SyncedDB.instance.synchronizer.syncUpstream();
        break;
      case AppLifecycleState.paused:
        SyncedDB.instance.synchronizer.syncUpstream();
        break;
      case AppLifecycleState.detached:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    // Sync on start
    //SyncedDB.instance.synchronizer.syncDownstream();

    //add user bloc to sync bloc via event

    context.read<SyncBloc>().add(AddUserBlocEvent(context.read<UserBloc>()));

    context.read<SyncBloc>().add(TriggerFileSyncEvent());

    //trigger sync bloc to sync images and stuff via event

    SyncedDB.instance.synchronizer.syncUpstream();

    return widget.child;
  }
}
