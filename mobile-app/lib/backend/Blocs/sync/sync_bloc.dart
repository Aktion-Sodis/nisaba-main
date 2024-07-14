import 'dart:io';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/content/content_bloc.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_bloc.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_state.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_events.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_state.dart';
import 'package:mobile_app/backend/Blocs/task/task_bloc.dart';
import 'package:mobile_app/backend/Blocs/user/user_bloc.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncStatus.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/AuthRepository.dart';
import 'package:mobile_app/backend/repositories/ContentRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/TaskRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/storage/storage_repository.dart';
import 'package:mobile_app/models/InterventionContentRelation.dart';
import 'package:mobile_app/models/LevelInterventionRelation.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/utils/connectivity.dart';

import '../../database/db_implementations/synced_db/SyncedDB.dart';

class SyncBloc extends Bloc<SyncEvent, SyncState> {
  UserBloc? userBloc;
  AuthRepository? authRepo;
  static SyncedDB db = SyncedDB.instance;

  SyncBloc() : super(PrepareSyncState()) {
    on<SyncEvent>(_mapEventToState);
  }

  void _updateProgress(SyncStatus syncStatus) {
    try {
      if (syncStatus == SyncStatus.SYNCING ||
          syncStatus == SyncStatus.WAITING) {
        add(StartSyncEvent());
        //todo: könnte Problem sein
      } else if (syncStatus == SyncStatus.UP_TO_DATE) {
        add(FinishedSyncEvent());
      } else if (syncStatus == SyncStatus.STOPPED) {
        add(CancelSyncEvent());
      }
    } catch (e) {}
  }

  void _mapEventToState(SyncEvent event, Emitter<SyncState> emit) async {
    int totalFiles = 0;
    int loadedFiles = 0;
    int progress = 100;

    int toSyncSurveys = 0;
    int syncedSurveys = 0;
    int syncProgressSurveys = 100;

    int otherEntities = 0;
    int syncedOtherEntities = 0;
    int syncProgressOtherEntities = 100;

    int failedSurveys = 0;
    int failedOtherEntities = 0;

    int savedFailedSurveys = 0;
    int savedFailedOtherEntities = 0;

    int saveProgress = 100;

    //update values according to previous state
    switch (state.runtimeType) {
      case InSyncState:
        InSyncState inSyncState = state as InSyncState;
        totalFiles = inSyncState.totalFiles;
        loadedFiles = inSyncState.loadedFiles;
        progress = inSyncState.progress;
        toSyncSurveys = inSyncState.toSyncSurveys;
        syncedSurveys = inSyncState.syncedSurveys;
        syncProgressSurveys = inSyncState.syncProgressSurveys;
        otherEntities = inSyncState.otherEntities;
        syncedOtherEntities = inSyncState.syncedOtherEntities;
        syncProgressOtherEntities = inSyncState.syncProgressOtherEntities;
        failedSurveys = inSyncState.failedSurveys;
        failedOtherEntities = inSyncState.failedOtherEntities;
        savedFailedSurveys = inSyncState.savedFailedSurveys;
        savedFailedOtherEntities = inSyncState.savedFailedOtherEntities;
        saveProgress = inSyncState.saveProgress;
        break;
      case FullySyncedState:
        FullySyncedState fullySyncedState = state as FullySyncedState;
        loadedFiles = fullySyncedState.loadedFiles;
        totalFiles = loadedFiles;
        progress = 100;
        toSyncSurveys = fullySyncedState.syncedSurveys;
        syncedSurveys = fullySyncedState.syncedSurveys;
        syncProgressSurveys = 100;
        otherEntities = fullySyncedState.syncedOtherEntities;
        syncedOtherEntities = fullySyncedState.syncedOtherEntities;
        syncProgressOtherEntities = 100;
        failedSurveys = fullySyncedState.savedFailedSurveys;
        failedOtherEntities = fullySyncedState.savedFailedOtherEntities;
        savedFailedSurveys = fullySyncedState.savedFailedSurveys;
        savedFailedOtherEntities = fullySyncedState.savedFailedOtherEntities;
        saveProgress = 100;
        break;
      case CannotSyncState:
        CannotSyncState cannotSyncState = state as CannotSyncState;
        loadedFiles = cannotSyncState.loadedFiles;
        totalFiles = cannotSyncState.totalFiles;
        progress = cannotSyncState.progress;
        toSyncSurveys = cannotSyncState.toSyncSurveys;
        syncedSurveys = cannotSyncState.syncedSurveys;
        syncProgressSurveys = cannotSyncState.syncProgressSurveys;
        otherEntities = cannotSyncState.otherEntities;
        syncedOtherEntities = cannotSyncState.syncedOtherEntities;
        syncProgressOtherEntities = cannotSyncState.syncProgressOtherEntities;
        failedSurveys = cannotSyncState.failedSurveys;
        failedOtherEntities = cannotSyncState.failedOtherEntities;
        savedFailedSurveys = cannotSyncState.savedFailedSurveys;
        savedFailedOtherEntities = cannotSyncState.savedFailedOtherEntities;
        saveProgress = cannotSyncState.saveProgress;
        break;
      default:
        break;
    }

    bool failed = false;

    bool nofinalpush = false;

    //handle events correctly
    switch (event.runtimeType) {
      //start sync -> just as a notification to show it is in sync
      case StartSyncEvent:
        break;
      //trigger file sync event -> starts syncing files
      case TriggerFileSyncEvent:
        totalFiles = 0;
        loadedFiles = 0;
        progress = 100;
        fulfillSync(true);
        nofinalpush = false;
        break;
      //loaded file event -> increase loaded files
      case LoadedFileEvent:
        loadedFiles++;
        //determine progress of loaded files (in percent)
        if (totalFiles != 0) {
          progress = ((loadedFiles / totalFiles) * 100).round();
        }
        break;
      //start loading file event -> increase total files
      case StartLoadingFileEvent:
        totalFiles++;
        //progress
        if (totalFiles != 0) {
          progress = ((loadedFiles / totalFiles) * 100).round();
        }
        break;
      //init entity and survey count event -> set entity and survey count
      case InitEntityAndSurveyCountEvent:
        toSyncSurveys += (event as InitEntityAndSurveyCountEvent).surveyCount;
        otherEntities += event.entityCount;
        //progresses
        if (toSyncSurveys != 0) {
          syncProgressSurveys = ((syncedSurveys / toSyncSurveys) * 100).round();
        } else {
          syncProgressSurveys = 100;
        }
        if (otherEntities != 0) {
          syncProgressOtherEntities =
              ((syncedOtherEntities / otherEntities) * 100).round();
        } else {
          syncProgressOtherEntities = 100;
        }
        break;
      //uploaded survey event -> increase synced surveys
      case UploadedSurveyEvent:
        syncedSurveys++;
        //progress
        if (toSyncSurveys != 0) {
          syncProgressSurveys = ((syncedSurveys / toSyncSurveys) * 100).round();
        }
        break;
      //uploaded other entity event -> increase synced other entities
      case UploadedOtherEntityEvent:
        syncedOtherEntities++;
        //progress
        if (otherEntities != 0) {
          syncProgressOtherEntities =
              ((syncedOtherEntities / otherEntities) * 100).round();
        }
        break;
      //failed survey event -> increase failed surveys
      case FailedSurveyEvent:
        failedSurveys++;
        if (failedSurveys + failedOtherEntities != 0) {
          saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
                  (failedSurveys + failedOtherEntities) *
                  100)
              .round();
        }
        break;
      //failed other entity event -> increase failed other entities
      case FailedOtherEntityEvent:
        failedOtherEntities++;
        if (failedSurveys + failedOtherEntities != 0) {
          saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
                  (failedSurveys + failedOtherEntities) *
                  100)
              .round();
        }
        break;
      //saved failed survey event -> decrease toSyncSurveys
      case SavedFailedSurveyEvent:
        savedFailedSurveys++;
        toSyncSurveys--;
        //progress
        if (toSyncSurveys != 0) {
          syncProgressSurveys = ((syncedSurveys / toSyncSurveys) * 100).round();
        } else {
          syncProgressSurveys = 100;
        }
        if (failedSurveys + failedOtherEntities != 0) {
          saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
                  (failedSurveys + failedOtherEntities) *
                  100)
              .round();
        }

        break;
      //saved failed other entity event -> decrease otherEntities
      case SavedFailedOtherEntityEvent:
        savedFailedOtherEntities++;
        otherEntities--;
        //progress
        if (otherEntities != 0) {
          syncProgressOtherEntities =
              ((syncedOtherEntities / otherEntities) * 100).round();
        } else {
          syncProgressOtherEntities = 100;
        }
        if (failedSurveys + failedOtherEntities != 0) {
          saveProgress = ((savedFailedSurveys + savedFailedOtherEntities) /
                  (failedSurveys + failedOtherEntities) *
                  100)
              .round();
        }
        break;
      //finished sync event -> nothing
      case FinishedSyncEvent:
        break;
      //cancel sync event -> nothing
      case CancelSyncEvent:
        failed = true;
        break;
      //add user bloc event -> set userBloc
      case AddUserBlocEvent:
        userBloc = (event as AddUserBlocEvent).userBloc;
        break;
      case RetriggerSyncEvent:
        totalFiles = 0;
        loadedFiles = 0;
        progress = 100;
        if (authRepo != null) {
          authRepo!.lateLogin().then((value) {
            SyncedDB.instance.synchronizer.syncUpstream();
            fulfillSync(true);
          });
        } else {
          SyncedDB.instance.synchronizer.syncUpstream();
          fulfillSync(true);
        }
        nofinalpush = false;
        break;
    }

    if (!nofinalpush) {
      if (failed) {
        emit(CannotSyncState(
          totalFiles: totalFiles,
          loadedFiles: loadedFiles,
          toSyncSurveys: toSyncSurveys,
          syncedSurveys: syncedSurveys,
          otherEntities: otherEntities,
          syncedOtherEntities: syncedOtherEntities,
          failedSurveys: failedSurveys,
          failedOtherEntities: failedOtherEntities,
          savedFailedSurveys: savedFailedSurveys,
          savedFailedOtherEntities: savedFailedOtherEntities,
        ));
      } else {
        //check whether complete
        bool finished = isComplete(progress, syncProgressSurveys,
            syncProgressOtherEntities, saveProgress);
        if (finished) {
          emit(FullySyncedState(
              loadedFiles: loadedFiles,
              syncedSurveys: syncedSurveys,
              syncedOtherEntities: syncedOtherEntities,
              savedFailedSurveys: savedFailedSurveys,
              savedFailedOtherEntities: savedFailedOtherEntities));
        } else {
          emit(InSyncState(
              totalFiles: totalFiles,
              loadedFiles: loadedFiles,
              progress: progress,
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
              saveProgress: saveProgress));
        }
      }
    }
  }

  bool isComplete(int progress, int syncProgressSurveys,
      int syncProgressOtherEntities, int saveProgress) {
    return progress == 100 &&
        syncProgressSurveys == 100 &&
        syncProgressOtherEntities == 100 &&
        saveProgress == 100;
  }

  void fulfillSync(bool filesSyncEnabled) async {
    print('fulfillSync called');
    InternetConnectionType internetConnectionType =
        await StorageRepository.currentInternetConnectionType();
    if (LocalDataRepository.instance.wifiOnly &&
        internetConnectionType != InternetConnectionType.WIFI) {
      add(CancelSyncEvent());
      return;
    }
    add(StartSyncEvent());

    //all Levels
    List<Level> allLevels = await LevelRepository.instance.getAllAmpLevels();

    print('sync: levels loaded');

    //Entities including applied Interventions and Executed Surveys
    List<Entity> allEntities = await EntityRepository.instance
        .getAllEntitiesInclAppliedInterventionsAndExecutedSurveys();

    print('sync: entities loaded');

    //Entities including Interventions
    List<Intervention> allInterventions = await InterventionRepository.instance
        .allInterventionsIncludingSurveys();

    print('sync: interventions loaded');

    //User
    User? user = userBloc?.state.user;

    print('sync: user loaded');

    //download: level, interventions, surveys, aktuellen user was sich geändert hat
    //entsprechend anpassen -> option einfügen, die dies prüft

    //upload: alles was sich geändert hat
    //ist bereits so

    if (filesSyncEnabled) {
      print('Sync: Starting file sync');
      syncLevels(allLevels);
      syncInterventions(allInterventions);
      //syncTasks(allTasksToSync);
      //syncContents(allContents);
      syncEntities(allEntities);
      if (user != null) {
        syncUser(user);
      }
    }
  }

  Future<void> populateSortedLists<P, Q, R extends Comparable>(
      List<P> list1,
      R Function(P) param1,
      List<Q> list2,
      R Function(Q) param2,
      Future<void> Function(int, int) populate) async {
    int i = 0;
    int j = 0;

    while (i < list1.length && j < list2.length) {
      P element1 = list1[i];
      Q element2 = list2[j];

      if (param1(element1).compareTo(param2(element2)) < 0) {
        i++;
      } else if (param1(element1).compareTo(param2(element2)) > 0) {
        j++;
      } else {
        await populate(i, j);
        j++;
      }
    }
  }

  void syncLevels(List<Level> levels) async {
    //download everything
    //upload everything
    for (Level level in levels) {
      LevelRepository.instance.getLevelPicFile(level).sync(this);
      for (CustomData customData in level.customData) {
        LevelRepository.instance
            .getCustomDataPicFile(level, customData)
            .sync(this);
      }
    }
  }

  void syncInterventions(List<Intervention> interventions) async {
    //download everything
    //upload everything
    for (Intervention intervention in interventions) {
      InterventionRepository.instance
          .getInterventionPic(intervention)
          .sync(this);
      for (Survey survey in intervention.surveys) {
        SurveyRepository.instance.getSurveyPic(survey).sync(this);
        for (Question question in survey.questions) {
          SurveyRepository.instance.getQuestionPic(survey, question).sync(this);
          if (question.questionOptions != null) {
            for (QuestionOption questionOption in question.questionOptions!) {
              SurveyRepository.instance
                  .getQuestionOptionPic(survey, question, questionOption)
                  .sync(this);
            }
          }
        }
      }
    }
  }

  void syncTasks(List<Task> tasks) async {
    for (Task task in tasks) {
      for (int audioID in task.audioList) {
        TaskRepository.getTaskAudio(task, audioID).sync(this);
      }
      for (int picID in task.picList) {
        TaskRepository.getTaskPic(task, picID).sync(this);
      }
    }
  }

  void syncContents(List<Content> contents) async {
    for (Content content in contents) {
      ContentRepository.instance.getContentPDFFile(content).sync(this);
      ContentRepository.instance.getContentPic(content).sync(this);
    }
  }

  void syncEntities(List<Entity> allEntities) async {
    for (Entity entity in allEntities) {
      EntityRepository.instance.getEntityPic(entity).sync(this);
      for (AppliedIntervention appliedIntervention
          in entity.appliedInterventions) {
        AppliedInterventionRepository.instance
            .appliedInterventionPic(appliedIntervention)
            .sync(this);
        for (ExecutedSurvey executedSurvey
            in appliedIntervention.executedSurveys) {
          for (QuestionAnswer questionAnswer in executedSurvey.answers) {
            if (questionAnswer.type == QuestionType.AUDIO) {
              ExecutedSurveyRepository.instance
                  .getQuestionAnswerAudio(
                      appliedIntervention,
                      executedSurvey.id!,
                      executedSurvey.survey.questions.firstWhere((element) =>
                          element.id == questionAnswer.questionID!))
                  .sync(this);
            } else if (questionAnswer.type == QuestionType.PICTURE ||
                questionAnswer.type == QuestionType.PICTUREWITHTAGS) {
              ExecutedSurveyRepository.instance
                  .getQuestionAnswerPic(
                      appliedIntervention,
                      executedSurvey.id!,
                      executedSurvey.survey.questions.firstWhere((element) =>
                          element.id == questionAnswer.questionID!))
                  .sync(this);
            }
          }
        }
      }
    }
  }

  void syncUser(User user) async {
    //download
    //upload
    UserRepository.instance.getUserPicFile(user).sync(this);
  }
}
