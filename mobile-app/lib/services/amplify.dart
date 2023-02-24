import 'dart:convert';

import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile_app/amplifyconfiguration.dart';
import 'package:mobile_app/models/ModelProvider.dart';

///possess global access to the amplify plugin Instances

class AmplifyIntegration {
  ///database (automatically synced with cloud database)
  static final AmplifyDataStore _amplifyDataStore =
      AmplifyDataStore(modelProvider: ModelProvider.instance);

  ///api of cloud database (responsible for automated syncing)
  static final AmplifyAPI _amplifyAPI = AmplifyAPI(
      authProviders: const [CognitoOIDCAuthProvider()],
      modelProvider: ModelProvider());

  ///auth for api and storage
  static final AmplifyAuthCognito _amplifyAuthCognito = AmplifyAuthCognito();

  static final AmplifyStorageS3 _amplifyStorageS3 = AmplifyStorageS3();

  static String changeAuthorizationModeOnApi(String amplifyconfig) {
    try {
      Map<String, dynamic> config = jsonDecode(amplifyconfig);
      config["api"]["plugins"]["awsAPIPlugin"]
              [dotenv.env["AMPLIFY_API_RESOURCE_NAME"]]["authorizationType"] =
          "OPENID_CONNECT";
      return jsonEncode(config);
    } catch (e) {
      throw const FormatException(
          "Config file does not fit the format used in this app. Please, check if AMPLIFY_API_RESOURCE_NAME is correct. Otherwise, the problem can be that Amplify updated the format of the config file.");
    }
  }

  ///prior to any actions regarding amplify in app, this method has to be awaited once
  /// -> integrated as first step in app start
  static Future<bool> initialize() async {
    await Amplify.addPlugins([
      _amplifyDataStore,
      _amplifyAPI,
      _amplifyAuthCognito,
      _amplifyStorageS3
    ]);

    final String modifiedAmplifyConfig =
        changeAuthorizationModeOnApi(amplifyconfig);

    await Amplify.configure(modifiedAmplifyConfig);
    Amplify.DataStore.streamController.stream.asBroadcastStream().listen((t) {
      print("amplify data store event:");
      print((t as DataStoreHubEvent).eventName);
      print((t as DataStoreHubEvent).payload.toString());
    });
    //Amplify.DataStore.clear();
    Amplify.DataStore.start();
    print("amplify successfully initialized");
    return true;
  }
}

class CognitoOIDCAuthProvider extends OIDCAuthProvider {
  const CognitoOIDCAuthProvider();

  static String? _token;

  static Future<String?> fetchAndRememberAuthToken() async {
    final session = await Amplify.Auth.fetchAuthSession(
      options: CognitoSessionOptions(getAWSCredentials: true),
    ) as CognitoAuthSession;
    _token = session.userPoolTokens?.idToken;
    return Future.value(_token);
  }

  @override
  Future<String?> getLatestAuthToken() async {
    if (_token == null) {
      await fetchAndRememberAuthToken();
    }

    return Future.value(_token);
  }

  static void forgetAuthToken() {
    _token = null;
  }
}
