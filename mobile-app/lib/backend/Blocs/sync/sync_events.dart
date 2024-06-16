import 'package:mobile_app/backend/Blocs/user/user_bloc.dart';

abstract class SyncEvent {}

class StartSyncEvent extends SyncEvent {}

class TriggerFileSyncEvent extends SyncEvent {}

class LoadedFileEvent extends SyncEvent {}

class StartLoadingFileEvent extends SyncEvent {}

class InitEntityAndSurveyCountEvent extends SyncEvent {
  final int entityCount;
  final int surveyCount;

  InitEntityAndSurveyCountEvent(this.entityCount, this.surveyCount);
}

class UploadedSurveyEvent extends SyncEvent {}

class UploadedOtherEntityEvent extends SyncEvent {}

class FailedSurveyEvent extends SyncEvent {}

class FailedOtherEntityEvent extends SyncEvent {}

class SavedFailedSurveyEvent extends SyncEvent {}

class SavedFailedOtherEntityEvent extends SyncEvent {}

class FinishedSyncEvent extends SyncEvent {}

class CancelSyncEvent extends SyncEvent {}

class AddUserBlocEvent extends SyncEvent {
  final UserBloc userBloc;

  AddUserBlocEvent(this.userBloc);
}

class RetriggerSyncEvent extends SyncEvent {}
