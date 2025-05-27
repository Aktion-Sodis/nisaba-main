part of 'task_form_cubit.dart';

@immutable
abstract class TaskFormState {
  late final List<Attachment> attachments;
  late final DateTime? deadline;
  late final Entity? entity;
  late TaskBloc taskBloc;
  late OrganizationViewBloc organizationViewBloc;
  late UserBloc userBloc;
  late AppliedIntervention? appliedIntervention;
  late ExecutedSurvey? executedSurvey;
  late Task? task;

  TaskFormState(
      {List<Attachment>? attachments,
      this.deadline,
      this.entity,
      required this.taskBloc,
      required this.organizationViewBloc,
      required this.userBloc,
      this.appliedIntervention,
      this.executedSurvey,
      this.task}) {
    this.attachments = attachments ?? [];
  }
}

class TaskFormFillingOut extends TaskFormState {
  TaskFormFillingOut(
      {super.attachments,
      super.deadline,
      super.entity,
      required super.taskBloc,
      required super.organizationViewBloc,
      required super.userBloc,
      super.appliedIntervention,
      super.executedSurvey,
      super.task});

  TaskFormFillingOut copyWith(
      {List<Attachment>? attachments,
      DateTime? deadline,
      Entity? entity,
      TaskBloc? taskBloc,
      OrganizationViewBloc? organizationViewBloc,
      UserBloc? userBloc,
      AppliedIntervention? appliedIntervention,
      ExecutedSurvey? executedSurvey,
      Task? task}) {
    return TaskFormFillingOut(
        attachments: attachments ?? this.attachments,
        deadline: deadline ?? this.deadline,
        entity: entity ?? this.entity,
        taskBloc: taskBloc ?? this.taskBloc,
        organizationViewBloc: organizationViewBloc ?? this.organizationViewBloc,
        userBloc: userBloc ?? this.userBloc,
        appliedIntervention: appliedIntervention ?? this.appliedIntervention,
        executedSurvey: executedSurvey ?? this.executedSurvey,
        task: task ?? this.task);
  }
}

class TaskFormSavingInProgress extends TaskFormState {
  TaskFormSavingInProgress(
      {super.attachments,
      super.deadline,
      super.entity,
      required super.taskBloc,
      required super.organizationViewBloc,
      required super.userBloc,
      super.appliedIntervention,
      super.executedSurvey,
      super.task});
}

class TaskFormSuccessfullSubmitted extends TaskFormState {
  TaskFormSuccessfullSubmitted(
      {super.attachments,
      super.deadline,
      super.entity,
      required super.taskBloc,
      required super.organizationViewBloc,
      required super.userBloc,
      super.appliedIntervention,
      super.executedSurvey,
      super.task});
}
