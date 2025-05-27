import 'package:mobile_app/backend/Blocs/session/auth_credentials.dart';
import 'package:mobile_app/backend/callableModels/User.dart';

abstract class SessionState {}

abstract class UnauthenticatedSessionState extends SessionState {}

class UnknownSessionState extends UnauthenticatedSessionState {}

class RequiresAuthentificationSessionState extends UnauthenticatedSessionState {
}

class AuthenticatedSessionState extends SessionState {
  String userID;

  AuthenticatedSessionState({required this.userID});
}

class SyncingSessionState extends AuthenticatedSessionState {
  SyncingSessionState({required super.userID});
}

class FullyAuthenticatedSessionState extends AuthenticatedSessionState {
  User? user;
  FullyAuthenticatedSessionState({required super.userID, this.user});
}

class RequiresPasswordChangeSessionState extends SessionState {
  AuthCredentials authCredentials;
  RequiresPasswordChangeSessionState({required this.authCredentials});
}

class RequiresUserCreationState extends SessionState {
  String userID;
  RequiresUserCreationState({required this.userID});
}
