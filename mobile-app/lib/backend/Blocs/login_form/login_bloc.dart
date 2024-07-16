import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/session/auth_credentials.dart';
import 'package:mobile_app/backend/Blocs/session/session_cubit.dart';
import 'package:mobile_app/backend/repositories/AuthRepository.dart';
import 'package:mobile_app/backend/Blocs/login_form/form_submission_status.dart';
import 'package:mobile_app/backend/Blocs/login_form/login_event.dart';
import 'package:mobile_app/backend/Blocs/login_form/login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final AuthRepository authRepo;
  final SessionCubit sessionCubit;

  LoginBloc({required this.authRepo, required this.sessionCubit})
      : super(LoginState()) {
    on<LoginEvent>(_mapEventToState);
  }

  void _mapEventToState(LoginEvent event, Emitter<LoginState> emit) async {
    // Username updated
    if (event is LoginEmailOrPhoneNumberChanged) {
      emit(state.copyWith(emailOrPhoneNumber: event.emailOrPhoneNumber));

      // Password updated
    } else if (event is LoginPasswordChanged) {
      emit(state.copyWith(password: event.password));

      // Form submitted
    } else if (event is LoginSubmitted) {
      emit(state.copyWith(formStatus: FormSubmitting()));

      try {
        print("form is getting submitted");
        print("authRepo not null: ${authRepo != null}");
        final userId = await authRepo.login(
          email: state.isPhoneNumber ? null : state.emailOrPhoneNumber.trim(),
          phoneNumber:
              state.isPhoneNumber ? state.emailOrPhoneNumber.trim() : null,
          password: state.password.trim(),
        );
        print('got user id: $userId');
        emit(state.copyWith(formStatus: SubmissionSuccess()));
        print("now launching session");
        //todo: hier bezüglich offline login arbeiten

        sessionCubit.showSession(AuthCredentials(
          userName: state.emailOrPhoneNumber.trim(),
          email: state.isPhoneNumber ? null : state.emailOrPhoneNumber.trim(),
          phoneNumber:
              state.isPhoneNumber ? state.emailOrPhoneNumber.trim() : null,
          password: state.password.trim(),
          userId: userId,
        ));
        print("session launched");
      } catch (e) {
        print("error in authentication");
        print(e.toString());
        sessionCubit.signOut();

        //todo: hier error management einbauen
        emit(state.copyWith(formStatus: SubmissionFailed(e, e.toString())));
      }
    }
  }
}
