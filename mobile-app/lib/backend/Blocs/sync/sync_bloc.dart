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
  TaskBloc taskBloc;
  UserBloc userBloc;
  static SyncedDB db = SyncedDB.instance;

  SyncBloc({
    required this.taskBloc,
    required this.userBloc,
  }) : super(_getStateBySyncStatus(db.synchronizer.upstreamSyncStatus)) {
    on<SyncEvent>(_mapEventToState);
    fulfillSync(true);

    db.synchronizer.subscribeUpstreamSyncStatusStream(_updateProgress);
  }

  static SyncState _getStateBySyncStatus(SyncStatus status) {
    if (status == SyncStatus.SYNCING || status == SyncStatus.WAITING) {
      return InSyncState(totalFiles: 0, loadedFiles: 0, progress: 0);
    } else if (status == SyncStatus.UP_TO_DATE) {
      return FullySyncedState();
    } else if (status == SyncStatus.STOPPED) {
      return CannotSyncState();
    } else {
      return CannotSyncState();
    }
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
    if (event is StartSyncEvent) {
      if ((state is! InSyncState)) {
        emit(InSyncState(totalFiles: 0, loadedFiles: 0, progress: 0));
      }
    } else if (event is StartLoadingFileEvent) {
      if (state is InSyncState) {
        emit((state as InSyncState)
            .copyWith(totalFiles: (state as InSyncState).totalFiles + 1));
      } else {
        emit(InSyncState(totalFiles: 1, loadedFiles: 0, progress: 0));
      }
    } else if (event is LoadedFileEvent) {
      if (state is InSyncState) {
        InSyncState inSyncState = state as InSyncState;
        if (inSyncState.loadedFiles + 1 == inSyncState.totalFiles) {
          add(FinishedSyncEvent());
        } else {
          emit(inSyncState.copyWith(loadedFiles: inSyncState.loadedFiles + 1));
        }
      }
    } else if (event is FinishedSyncEvent) {
      emit(FullySyncedState());
    } else if (event is CancelSyncEvent) {
      emit(CannotSyncState());
    }
  }

  void fulfillSync(bool filesSyncEnabled) async {
    InternetConnectionType internetConnectionType =
        await StorageRepository.currentInternetConnectionType();
    if (LocalDataRepository.instance.wifiOnly &&
        internetConnectionType != InternetConnectionType.WIFI) {
      add(CancelSyncEvent());
      return;
    }
    add(StartSyncEvent());

    //all Levels
    List<Level> allLevels =
        await LevelRepository.instance.getAllAmpLevels();

    //Entities including applied Interventions and Executed Surveys
    List<Entity> allEntities = await EntityRepository.instance
        .getAllEntitiesInclAppliedInterventionsAndExecutedSurveys();

    //Entities including Interventions
    List<Intervention> allInterventions = await InterventionRepository.instance.allInterventionsIncludingSurveys();

    //User
    User? user = userBloc.state.user;

    //download: level, interventions, surveys, aktuellen user was sich geändert hat
    //entsprechend anpassen -> option einfügen, die dies prüft

    //upload: alles was sich geändert hat
    //ist bereits so

    if (filesSyncEnabled) {
      syncLevels(allLevels);
      syncInterventions(allInterventions);
      //syncTasks(allTasksToSync);
      //syncContents(allContents);
      syncEntities(allEntities);
      if (user!=null) {
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
                      executedSurvey.survey.questions.firstWhere(
                          (element) => element.id == questionAnswer.id!))
                  .sync(this);
            } else if (questionAnswer.type == QuestionType.PICTURE ||
                questionAnswer.type == QuestionType.PICTUREWITHTAGS) {
              ExecutedSurveyRepository.instance
                  .getQuestionAnswerPic(
                      appliedIntervention,
                      executedSurvey.id!,
                      executedSurvey.survey.questions.firstWhere(
                          (element) => element.id == questionAnswer.id!))
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
