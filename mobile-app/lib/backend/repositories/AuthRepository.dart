///Implementierungsvorschlag @christoph
///eine klasse, über welche statische methoden/futures/variablen aufrufbar sind
///nötige Methoden/Futures/...
/// - Log in mit e-mail (am besten Future<String>) -> rückübergabe der erhaltenen ID
/// - Log in mit Telefonnummer (...) -> ... (muss ggf. noch in amplify hinterlegt werden -> im zweifel @CoachBenedetto fragen)
/// - Log out (am besten Future<bool>) -> rückgabe true wenn erfolgreich
/// - Aktuelle user id (Future<String>) -> wenn nicht eingeloggt null
/// - login status (Future<LoginStatus>) -> Enum für LoginStatus erstellen
/// - wir verwenden nicht das login ui von amplify zunächst; können wir uns allerdings gemeinsam mit den designern nochmal anschauen
/// - bei login immer an device erinnern
/// - bei logout device vergewssen

import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/SettingsRepository.dart';
import 'package:mobile_app/services/amplify.dart';

import 'package:mobile_app/models/ModelProvider.dart' as amp;
import '../Blocs/session/auth_credentials.dart';

class AuthRepository {
  Future<String> _getAttribute(String key) async {
    final attributes = await Amplify.Auth.fetchUserAttributes();
    final entry =
        attributes.firstWhere((element) => element.userAttributeKey.key == key);
    return Future.value(entry.value);
  }

  Future<String> _getUserIdFromAttributes() {
    return _getAttribute("sub");
  }

  Future<String> _getOrganizationIdFromAttributes() {
    return _getAttribute("custom:organization_id");
  }

  Future<void> _rememberUserAttributesLocally() async {
    final organizaitonID = await _getOrganizationIdFromAttributes();
    SettingsRepository.instance.organizationID = organizaitonID;
  }

  // TODO: rewrite auth section according to bloc logic
  // As this section does not correspond with block rules, the following method
  // is temporarily implemented in this ugly style
  Future<void> _rememberUserOrganization(String organizationID) async {
    String organizationID = SettingsRepository.instance.organizationID;

    try {
      final result = await Amplify.DataStore.query(amp.Organization.classType,
          where: amp.Organization.ID.eq(organizationID));

      amp.Organization organization = result.first;
      SettingsRepository.instance.organizationNameVerbose =
          organization.nameVerbose;
      SettingsRepository.instance.organizationNameKebabCase =
          organization.nameKebabCase;
      SettingsRepository.instance.organizationNameCamelCase =
          organization.nameCamelCase;
      print("Organization information saved: " +
          SettingsRepository.instance.organizationNameVerbose.toString());
    } on DataStoreException catch (e) {
      // TODO: implement exception handling
    }
  }

  Future<String?> attemptAutoLogin() async {
    try {
      print("trying auto login");

      final session = await Amplify.Auth.fetchAuthSession();
      await CognitoOIDCAuthProvider.fetchAndRememberAuthToken();
      print("autoLogin logged in?: ${session.isSignedIn}");

      return session.isSignedIn ? (await _getUserIdFromAttributes()) : null;
    } catch (e) {
      try {
        print("tryining offline login");
        AuthUser authUser = await Amplify.Auth.getCurrentUser();
        return authUser.userId;
      } catch (e) {
        print("offline login not possible");
        return null;
      }
    }
  }

  // todo: Verify how to implement "always remember device" on login.
  Future<String?> login({
    String? email,
    String? phoneNumber,
    required String password,
  }) async {
    Amplify.Auth.streamController.stream.listen((event) {
      print("login event: ${event.toString()}");
    });
    print("login called in repo");

    print("login is getting attempted with $email + $phoneNumber + $password");
    Map<String, String> signInOptions = email != null
        ? {
            "email": email,
          }
        : phoneNumber != null
            ? {
                "phone_number": phoneNumber,
              }
            : {};
    print("sign in options");
    print(signInOptions.toString());

    final result = await Amplify.Auth.signIn(
        username: email ?? phoneNumber ?? "",
        password: password,
        options: CognitoSignInOptions(clientMetadata: signInOptions));

    print("is Signed in: ${result.isSignedIn}");
    print("next Step: ${result.nextStep?.signInStep}");
    if (result.nextStep?.signInStep == "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD") {
      return ("CONFIRM_SIGN_IN_WITH_NEW_PASSWORD");
    }

    if (result.isSignedIn) {
      final userID = await _getUserIdFromAttributes();
      await _rememberUserAttributesLocally();
      await CognitoOIDCAuthProvider.fetchAndRememberAuthToken();
      await _rememberUserOrganization(
          SettingsRepository.instance.organizationID);
      return userID;
    } else {
      return null;
    }
  }

  Future<AuthCredentials?> updatePasswordInitially(
      AuthCredentials oldCredentials, String newPassword) async {
    print("updateing password");
    SignInResult signInResult =
        await Amplify.Auth.confirmSignIn(confirmationValue: newPassword);
    print("updated password: ${signInResult.isSignedIn}");
    if (signInResult.isSignedIn) {
      String? id = await _getUserIdFromAttributes();
      print("id: $id");
      if (id != null) {
        AuthCredentials creds = AuthCredentials(
            userName: oldCredentials.userName,
            password: newPassword,
            userId: id,
            email: oldCredentials.email,
            phoneNumber: oldCredentials.phoneNumber);
        return creds;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  Future<String?> _loginWithWebUI(
    AuthProvider authProvider,
  ) async {
    SignInResult result =
        await Amplify.Auth.signInWithWebUI(provider: authProvider);
    return result.isSignedIn ? (await _getUserIdFromAttributes()) : null;
  }

  Future<String?> loginWithGoogle() => _loginWithWebUI(AuthProvider.google);
  Future<String?> loginWithFacebook() => _loginWithWebUI(AuthProvider.facebook);
  Future<String?> loginWithApple() => _loginWithWebUI(AuthProvider.apple);

  // todo: verify how to
  Future<bool> signUp({
    required String username,
    required String password,
    String? email,
    String? phoneNumber,
  }) async {
    Map<CognitoUserAttributeKey, String> userAttributes = {};
    email ??= userAttributes[CognitoUserAttributeKey.email] = email!.trim();
    phoneNumber ??= userAttributes[CognitoUserAttributeKey.phoneNumber] =
        phoneNumber!.trim();

    final options = CognitoSignUpOptions(userAttributes: userAttributes);
    try {
      final result = await Amplify.Auth.signUp(
        username: username.trim(),
        password: password.trim(),
        options: options,
      );
      return result.isSignUpComplete;
    } on AuthException catch (e) {
      debugPrint(e.message);
      return false;
    }
  }

  Future<bool> confirmSignUp({
    required String username,
    required String confirmationCode,
  }) async {
    try {
      final result = await Amplify.Auth.confirmSignUp(
        username: username.trim(),
        confirmationCode: confirmationCode.trim(),
      );
      return result.isSignUpComplete;
    } on AuthException catch (e) {
      debugPrint(e.message);
      return false;
    }
  }

  // todo: Verify how to implement "forgetting device" on sign out.
  Future<bool> signOut() async {
    await Amplify.Auth.signOut(
        options: const SignOutOptions(globalSignOut: true));
    return true;
  }
}
