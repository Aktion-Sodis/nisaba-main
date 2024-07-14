abstract class SyncState {}

class PrepareSyncState extends SyncState {}

class InSyncState extends SyncState {
  final int totalFiles;
  final int loadedFiles;
  final int progress;

  final int toSyncSurveys;
  final int syncedSurveys;
  final int syncProgressSurveys;

  final int otherEntities;
  final int syncedOtherEntities;
  final int syncProgressOtherEntities;

  final int failedSurveys;
  final int failedOtherEntities;

  final int savedFailedSurveys;
  final int savedFailedOtherEntities;

  final int saveProgress;

  InSyncState(
      {required this.totalFiles,
      required this.loadedFiles,
      required this.progress,
      required this.toSyncSurveys,
      required this.syncedSurveys,
      required this.syncProgressSurveys,
      required this.otherEntities,
      required this.syncedOtherEntities,
      required this.syncProgressOtherEntities,
      required this.failedSurveys,
      required this.failedOtherEntities,
      required this.savedFailedSurveys,
      required this.savedFailedOtherEntities,
      required this.saveProgress});

  InSyncState copyWith({
    int? totalFiles,
    int? loadedFiles,
    int? toSyncSurveys,
    int? syncedSurveys,
    int? otherEntities,
    int? syncedOtherEntities,
    int? failedSurveys,
    int? failedOtherEntities,
    int? savedFailedSurveys,
    int? savedFailedOtherEntities,
  }) {
    totalFiles = totalFiles ?? this.totalFiles;
    loadedFiles = loadedFiles ?? this.loadedFiles;
    int progressToSet;
    if (totalFiles == 0) {
      progressToSet = 100;
    } else {
      progressToSet = ((loadedFiles / totalFiles) * 100).round();
    }

    toSyncSurveys = toSyncSurveys ?? this.toSyncSurveys;
    syncedSurveys = syncedSurveys ?? this.syncedSurveys;

    int syncProgressSurveys;
    if (toSyncSurveys == 0) {
      syncProgressSurveys = 100;
    } else {
      syncProgressSurveys = ((syncedSurveys / toSyncSurveys) * 100).round();
    }

    otherEntities = otherEntities ?? this.otherEntities;
    syncedOtherEntities = syncedOtherEntities ?? this.syncedOtherEntities;

    int syncProgressOtherEntities;
    if (otherEntities == 0) {
      syncProgressOtherEntities = 100;
    } else {
      syncProgressOtherEntities =
          ((syncedOtherEntities / otherEntities) * 100).round();
    }

    failedSurveys = failedSurveys ?? this.failedSurveys;
    failedOtherEntities = failedOtherEntities ?? this.failedOtherEntities;

    savedFailedSurveys = savedFailedSurveys ?? this.savedFailedSurveys;
    savedFailedOtherEntities =
        savedFailedOtherEntities ?? this.savedFailedOtherEntities;

    int saveProgress;
    if (failedSurveys + failedOtherEntities == 0) {
      saveProgress = 100;
    } else {
      saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
              (failedSurveys + failedOtherEntities) *
              100)
          .round();
    }

    return InSyncState(
        totalFiles: totalFiles,
        loadedFiles: loadedFiles,
        progress: progressToSet,
        toSyncSurveys: toSyncSurveys,
        syncedSurveys: syncedSurveys,
        syncProgressSurveys: syncProgressSurveys,
        otherEntities: otherEntities,
        syncedOtherEntities: syncedOtherEntities,
        syncProgressOtherEntities: syncProgressOtherEntities,
        failedSurveys: failedSurveys,
        failedOtherEntities: failedOtherEntities,
        savedFailedSurveys: savedFailedSurveys,
        savedFailedOtherEntities: savedFailedOtherEntities,
        saveProgress: saveProgress);
  }
}

class CannotSyncState extends SyncState {
  final int totalFiles;
  final int loadedFiles;
  late final int progress;

  final int toSyncSurveys;
  final int syncedSurveys;
  late final int syncProgressSurveys;

  final int otherEntities;
  final int syncedOtherEntities;
  late final int syncProgressOtherEntities;

  final int failedSurveys;
  final int failedOtherEntities;

  final int savedFailedSurveys;
  final int savedFailedOtherEntities;

  late final int saveProgress;

  CannotSyncState({
    required this.totalFiles,
    required this.loadedFiles,
    required this.toSyncSurveys,
    required this.syncedSurveys,
    required this.otherEntities,
    required this.syncedOtherEntities,
    required this.failedSurveys,
    required this.failedOtherEntities,
    required this.savedFailedSurveys,
    required this.savedFailedOtherEntities,
  }) {
    if (totalFiles == 0) {
      progress = 100;
    } else {
      progress = ((loadedFiles / totalFiles) * 100).round();
    }

    if (toSyncSurveys == 0) {
      syncProgressSurveys = 100;
    } else {
      syncProgressSurveys = ((syncedSurveys / toSyncSurveys) * 100).round();
    }

    if (otherEntities == 0) {
      syncProgressOtherEntities = 100;
    } else {
      syncProgressOtherEntities =
          ((syncedOtherEntities / otherEntities) * 100).round();
    }

    if (failedSurveys + failedOtherEntities == 0) {
      saveProgress = 100;
    } else {
      saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
              (failedSurveys + failedOtherEntities) *
              100)
          .round();
    }
  }
}

class FullySyncedState extends SyncState {
  final int loadedFiles;
  final int syncedSurveys;
  final int syncedOtherEntities;
  final int savedFailedSurveys;
  final int savedFailedOtherEntities;

  FullySyncedState(
      {required this.loadedFiles,
      required this.syncedSurveys,
      required this.syncedOtherEntities,
      required this.savedFailedSurveys,
      required this.savedFailedOtherEntities});
}
