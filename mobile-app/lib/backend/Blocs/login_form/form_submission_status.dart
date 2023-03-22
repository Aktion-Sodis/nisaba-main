abstract class FormSubmissionStatus {
  const FormSubmissionStatus();
}

class InitialFormStatus extends FormSubmissionStatus {
  const InitialFormStatus();
}

class FormSubmitting extends FormSubmissionStatus {}

class SubmissionSuccess extends FormSubmissionStatus {}

class SubmissionFailed extends FormSubmissionStatus {
  late final dynamic _error; // Can be error or exception
  final String errorMessage;

  SubmissionFailed(dynamic error, this.errorMessage) {
    _error = error is Exception || error is Error ? error : Exception(error);
  }
}
