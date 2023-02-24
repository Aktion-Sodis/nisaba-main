import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/session/auth_credentials.dart';
import 'package:mobile_app/backend/Blocs/session/session_cubit.dart';

enum AuthState { login }

class AuthCubit extends Cubit<AuthState> {
  final SessionCubit sessionCubit;

  AuthCubit({required this.sessionCubit}) : super(AuthState.login);

  late AuthCredentials credentials;

  void launchSession(AuthCredentials credentials) =>
      sessionCubit.showSession(credentials);
}
