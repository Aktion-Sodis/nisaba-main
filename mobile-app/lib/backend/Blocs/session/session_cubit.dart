import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/session/auth_credentials.dart';
import 'package:mobile_app/backend/repositories/AuthRepository.dart';
import 'package:mobile_app/backend/Blocs/session/session_state.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';

import 'package:mobile_app/backend/callableModels/CallableModels.dart';

class SessionCubit extends Cubit<SessionState> {
  final AuthRepository authRepo;
  final UserRepository userRepo;

  SessionCubit({
    required this.authRepo,
    required this.userRepo,
  }) : super(UnknownSessionState()) {
    attemptAutoLogin();
  }

  void attemptAutoLogin() async {
    try {
      final userId = await authRepo.attemptAutoLogin();
      if (userId != null) {
        await _initializeSession(userId);
      } else {
        emit(RequiresAuthentificationSessionState());
      }
    } catch (e) {
      print("error in attemptAutoLogin");
      print(e.toString());
      signOut();
    }
  }

  void showAuth() => emit(RequiresAuthentificationSessionState());

  void showSession(AuthCredentials credentials) async {
    try {
      if (credentials.userId == null) {
        emit(RequiresAuthentificationSessionState());
      } else if (credentials.userId == "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD") {
        emit(RequiresPasswordChangeSessionState(authCredentials: credentials));
      } else {
        await _initializeSession(credentials.userId!);
      }
    } catch (e) {
      print("error in showing Session: $e");
      emit(RequiresAuthentificationSessionState());
    }
  }

  Future<void> _initializeSession(String userId) async {
    // Show syncing state
    emit(SyncingSessionState(userID: userId));
    
    // Initialize session and get user
    User? user = await authRepo.initSession();
    
    // Always emit FullyAuthenticatedSessionState - UserStateBuilder will handle user creation if needed
    emit(FullyAuthenticatedSessionState(userID: userId, user: user));
  }

  void signOut() {
    authRepo.signOut();
    emit(RequiresAuthentificationSessionState());
  }
}
