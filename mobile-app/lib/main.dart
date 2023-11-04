import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile_app/frontend/models_auto_registration.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/AuthRepository.dart';
import 'package:mobile_app/backend/Blocs/request_permissions/request_permissions_cubit.dart';
import 'package:mobile_app/backend/Blocs/session/session_cubit.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/frontend/components/hive_db_initializer.dart';
import 'package:mobile_app/frontend/pages/permissions_checker.dart';
import 'package:mobile_app/frontend/pages/wifi_only_setting_checker.dart';
import 'package:mobile_app/frontend/theme.dart';

import 'package:mobile_app/utils/amplify.dart';
import 'package:mobile_app/frontend/authentication_state_builder.dart';
import 'package:mobile_app/utils/hive_db_helper.dart';

import 'backend/callableModels/TestObject.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");

  // Init HiveDB
  await HiveDBHelper.instance.init();

  // Init SyncedDB
  await SyncedDB.instance.localDB.initLocalDB();
  //todo: sync-fix: maybe add all objects to sync downstream?
  SyncedDB.instance.synchronizer.modelsToSyncDownstream.addAll([TestObject]);
  registerModels();

  // Frontend settings
  SystemChrome.setPreferredOrientations(
          [DeviceOrientation.portraitDown, DeviceOrientation.portraitUp])
      .then((_) => runApp(const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  ///Theme data returned after initalization
  ThemeData? themeData;

  //async initStateMethod handling the futures
  initStateAsync() async {
    await AmplifyIntegration.initialize();

    // todo: set _isAmplifyConfigured Flag for showing loading view?

    ///todo: dummy data, replace with db-version
    getThemeData().then((data) => setState(() {
          themeData = data;
        }));
  }

  @override
  void initState() {
    super.initState();
    initStateAsync();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: themeData ?? ThemeData.light(),
        home: themeData == null
            ? const Center(child: CircularProgressIndicator())
            : HiveDBInitializer(
                child: MultiRepositoryProvider(
                  providers: [
                    RepositoryProvider(create: (context) => AuthRepository()),
                    RepositoryProvider(
                        create: (context) => UserRepository.instance),
                    RepositoryProvider(
                        create: (context) => LocalDataRepository())
                  ],
                  child: BlocProvider<RequestPermissionsCubit>(
                    create: (context) => RequestPermissionsCubit.instance,
                    child: Builder(
                        builder: (context) => PermissionsChecker(
                              child: BlocProvider<SessionCubit>(
                                create: (context) => SessionCubit(
                                  authRepo: context.read<AuthRepository>(),
                                  userRepo: context.read<UserRepository>(),
                                ),
                                child: Builder(
                                    builder: (context) =>
                                        WifiOnlySettingChecker(
                                            child:
                                                AuthenticationStateBuilder())),
                              ),
                            )),
                  ),
                ),
              ));
  }
}
