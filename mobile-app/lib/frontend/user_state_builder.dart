import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/content/content_bloc.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_bloc.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_state.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_bloc.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_state.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/task/task_bloc.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/ContentRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/TaskRepository.dart';
import 'package:mobile_app/frontend/components/sync_trigger.dart';
import 'package:mobile_app/frontend/pages/main_menu.dart';
import 'package:mobile_app/frontend/pages/survey.dart';
import 'package:mobile_app/frontend/pages/user_data_view.dart';

import '../backend/Blocs/user/user_bloc.dart';
import '../backend/Blocs/user/user_state.dart';

/// This widget is responsible for forcing the user to fill in their profile date
class UserStateBuilder extends StatelessWidget {
  const UserStateBuilder({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(builder: (context, state) {
      return Navigator(
        pages: [
          if (state.user == null)
            //todo: user initialization page
            //todo: hier ggf. schauen
            MaterialPage(
                child: UserDataView(userBloc: context.read<UserBloc>())),
          if (state.user != null) _buildUserExistsState(context, state)
        ],
        onPopPage: (route, result) {
          print('Pop Page of Main Navigator called');
          return route.didPop(result);
        },
      );
    });
  }

  ///
  /// Initializes all the blocs and repositories that are needed for the app
  /// Blocs:
  /// - InAppBloc
  /// - ContentBloc
  /// - TaskBloc
  /// - OrganizationViewBloc
  ///
  /// Repositories:
  /// - ContentRepository
  /// - EntityRepository
  /// - SurveyRepository
  /// - AppliedInterventionRepository
  /// - TaskRepository
  ///
  MaterialPage _buildUserExistsState(BuildContext context, UserState state) {
    // TODO: Refactor this
    return MaterialPage(
        child: MultiRepositoryProvider(
            providers: [
          RepositoryProvider<ContentRepository>(
              create: (context) => ContentRepository.instance),
          RepositoryProvider<EntityRepository>(
              create: (context) => EntityRepository.instance),
          RepositoryProvider<SurveyRepository>(
              create: (context) => SurveyRepository.instance),
          RepositoryProvider<AppliedInterventionRepository>(
              create: (context) => AppliedInterventionRepository.instance)
        ],
            child: Builder(
                builder: (context) => MultiBlocProvider(
                      providers: [
                        BlocProvider<InAppBloc>(
                            create: (context) => InAppBloc()),
                        BlocProvider<ContentBloc>(
                            create: (context) =>
                                ContentBloc(context.read<ContentRepository>())),
                        BlocProvider(
                            create: (context) =>
                                TaskBloc(TaskRepository(state.user!))),
                        BlocProvider(
                            create: (context) => OrganizationViewBloc(
                                context.read<EntityRepository>(),
                                context.read<AppliedInterventionRepository>(),
                                context.read<InAppBloc>())),
                      ],
                      child: Builder(
                          builder: (context) => SyncTrigger(
                              child: _buildAuthenticatedView(context))),
                    ))));
  }

  _buildAuthenticatedView(BuildContext context) {
    return BlocBuilder<OrganizationViewBloc, OrganizationViewState>(
      builder: (context, orgState) =>
          BlocBuilder<InAppBloc, InAppState>(builder: (context, inAppState) {
        if (inAppState is MainInAppState) {
          return const MainMenu();
        } else if (inAppState is UserPageInAppState) {
          return UserDataView(userBloc: context.read<UserBloc>(), inApp: true);
        } else if (inAppState is SurveyInAppState) {
          return SurveyWidget(survey: inAppState.survey);
        } else {
          return Scaffold(body: Container());
        }
      }),
    );
  }
}
