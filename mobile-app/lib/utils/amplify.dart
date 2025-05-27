import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
import 'package:mobile_app/amplifyconfiguration.dart';
import 'package:mobile_app/models/ModelProvider.dart';

class AmplifyIntegration {
  static final AmplifyAuthCognito _authPlugin = AmplifyAuthCognito();
  static final AmplifyStorageS3 _storagePlugin = AmplifyStorageS3();
  static final AmplifyAPI _apiPlugin = AmplifyAPI(
    options: APIPluginOptions(
      modelProvider: ModelProvider.instance,
    ),
  );

  static Future<bool> initialize() async {
    try {
      await Amplify.addPlugins([_authPlugin, _storagePlugin, _apiPlugin]);
      await Amplify.configure(amplifyconfig);
      print("Amplify successfully initialized");
      return true;
    } on AmplifyAlreadyConfiguredException {
      print("Amplify was already configured");
      return true;
    } catch (e) {
      print("Amplify configuration error: $e");
      return false;
    }
  }
}

class CognitoAuthHelper {
  static Future<String?> getAccessToken() async {
    try {
      final session = await Amplify.Auth.fetchAuthSession();
      if (session is CognitoAuthSession) {
        return session.userPoolTokensResult.value.accessToken.raw;
      }
      return null;
    } catch (e) {
      print('Error fetching access token: $e');
      return null;
    }
  }

  static Future<String?> getIdToken() async {
    try {
      final session = await Amplify.Auth.fetchAuthSession();
      if (session is CognitoAuthSession) {
        return session.userPoolTokensResult.value.idToken.raw;
      }
      return null;
    } catch (e) {
      print('Error fetching id token: $e');
      return null;
    }
  }
}
