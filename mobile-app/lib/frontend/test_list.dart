import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_app_bar.dart';
import 'package:mobile_app/frontend/strings.dart';
import 'package:mobile_app/frontend/tests/amplify_api_test.dart';
import 'package:mobile_app/frontend/tests/amplify_cognito_test.dart';
import 'package:mobile_app/frontend/tests/amplify_datastore_sync_test.dart';
import 'package:mobile_app/frontend/tests/audio_test.dart';
import 'package:mobile_app/frontend/tests/gps_test.dart';
import 'package:mobile_app/frontend/tests/graphql_db_implementation_test.dart';
import 'package:mobile_app/frontend/tests/image_compression_test.dart';
import 'package:mobile_app/frontend/tests/db_test.dart';
import 'package:mobile_app/frontend/tests/integrated_synced_db_test.dart';
import 'package:mobile_app/frontend/tests/synced_db_restricted_test.dart';
import 'package:mobile_app/frontend/tests/synced_db_test.dart';

class TestList extends StatelessWidget {
  TestList({Key? key}) : super(key: key);

  final Map<String, Widget Function()> _allTests = {
    "Amplify Datastore Sync": () => AmplifyDatastoreSyncTest(),
    "flutter_sound": () => AudioTest(),
    "geolocator": () => GpsTest(),
    "isolate_image_compress": () => ImageCompressionTest(),
    "Amplify Cognito": () => AmplifyCognitoTest(),
    "Amplify API": () => AmplifyApiTest(),
    "DB Test": () => LocalDBTest(),
    "SyncedDB Test": () => SyncedDBTest(),
    "Integrated SyncedDB Test": () => IntegratedSyncedDBTest(),
    "GraphQL": () => GraphQLQueryTest(),
    "SyncedDB Restricted Test": () => SyncedDBRestrictedTest(),
  };

  Widget _itemBuilder(BuildContext context, int index) {
    if (index == 0) {
      return Wrap(
        children: [
          Column(
            children: [
              Padding(
                padding: EdgeInsets.all(defaultPadding(context)),
                child: Text(
                    "This page is only accessible, because you are in debug mode"),
              ),
              Divider()
            ],
          )
        ],
      );
    } else {
      String key = _allTests.keys.toList()[index - 1];
      if (_allTests[key] == null) return SizedBox.shrink();
      return ListTile(
        title: Text(key),
        onTap: () => Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => _allTests[key]!(),
            )),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      MainMenuAppBar(context, () {}, "Tests"),
      Expanded(
          child: Scrollbar(
        child: ListView.builder(
          itemBuilder: _itemBuilder,
          itemCount: _allTests.length + 1,
        ),
      ))
    ]);
  }
}
