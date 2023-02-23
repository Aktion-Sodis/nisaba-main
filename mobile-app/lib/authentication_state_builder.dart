import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/auth/auth_cubit.dart';
import 'package:mobile_app/backend/Blocs/auth/auth_repository.dart';
import 'package:mobile_app/backend/Blocs/session/session_cubit.dart';
import 'package:mobile_app/backend/Blocs/session/session_state.dart';
import 'package:mobile_app/backend/Blocs/user/user_bloc.dart';
import 'package:mobile_app/backend/Blocs/user/user_state.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/frontend/pages/loading_view.dart';
import 'package:mobile_app/frontend/pages/login_view.dart';
import 'package:mobile_app/frontend/pages/update_password_view.dart';
import 'package:mobile_app/user_state_builder.dart';

class AuthenticationStateBuilder extends StatelessWidget {
  const AuthenticationStateBuilder({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SessionCubit, SessionState>(builder: (context, state) {
      return Navigator(
        pages: [
          // Show loading screen
          if (state is UnknownSessionState)
            const MaterialPage(child: LoadingView()),

          // Show auth flow
          if (state is RequiresAuthentificationSessionState)
            _buildRequiresAuthenticationSessionState(context, state),

          // Show further app content
          //todo: insert user Bloc here
          if (state is FullyAuthenticatedSessionState)
            _buildFullyAuthenticatedSessionState(context, state),

          if (state is RequiresPasswordChangeSessionState)
            _buildRequiresPasswordChangeSessionState(context, state)
        ],
        onPopPage: (route, result) => route.didPop(result),
      );
    });
  }

  MaterialPage _buildFullyAuthenticatedSessionState(
      BuildContext context, FullyAuthenticatedSessionState state) {
    return MaterialPage(
      child: BlocProvider<UserBloc>(
          create: (context) => UserBloc(
              userState: UserState(user: state.user),
              authRepo: context.read<AuthRepository>(),
              userID: state.userID,
              userRepository: context.read<UserRepository>()),
          child: UserStateBuilder()),
    );
  }

  MaterialPage _buildRequiresPasswordChangeSessionState(
      BuildContext context, RequiresPasswordChangeSessionState state) {
    return MaterialPage(
        child: UpdatePasswordView(
            authCredentials: state.authCredentials,
            sessionCubit: context.read<SessionCubit>()));
  }

  MaterialPage _buildRequiresAuthenticationSessionState(
      BuildContext context, RequiresAuthentificationSessionState state) {
    return MaterialPage(
      child: BlocProvider(
        create: (context) =>
            AuthCubit(sessionCubit: context.read<SessionCubit>()),
        child: LoginView(),
      ),
    );
  }
}
