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
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/ContentRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/backend/repositories/SettingsRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/repositories/TaskRepository.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/storage/storage_repository.dart';
import 'package:mobile_app/models/InterventionContentRelation.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

class SyncBloc extends Bloc<SyncEvent, SyncState> {
  TaskBloc taskBloc;
  UserBloc userBloc;

  SyncBloc({
    required this.taskBloc,
    required this.userBloc,
  }) : super(PrepareSyncState()) {
    on<SyncEvent>(_mapEventToState);
    fulfillSync(true);
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
    if (SettingsRepository.instance.wifiOnly &&
        internetConnectionType != InternetConnectionType.WIFI) {
      add(CancelSyncEvent());
      return;
    }
    add(StartSyncEvent());

    List<amp.Level> allAmpLevels = await LevelRepository.getAllAmpLevels();
    List<amp.Entity> allAmpEntities =
        (await EntityRepository.getAllAmpEntities())
            .map((e) => e.copyWith(
                appliedInterventions: [],
                level: allAmpLevels
                    .where((element) => element.id == e.entityLevelId)
                    .first))
            .toList();
    List<amp.Intervention> allAmpInterventions = (await InterventionRepository
            .getAllAmpIntervention())
        .map((e) => e.copyWith(tags: [], contents: [], levels: [], surveys: []))
        .toList();
    List<amp.AppliedIntervention> allAmpAppliedInterventions =
        (await AppliedInterventionRepository.getAllAmpAppliedInterventions())
            .where((element) =>
                element.entityAppliedInterventionsId != null &&
                allAmpInterventions.any((intervention) =>
                    intervention.id ==
                    element.appliedInterventionInterventionId))
            .toList();
    List<amp.Survey> allAmpSurveys = (await SurveyRepository.getAllAmpSurveys())
        .where(
          (element) => element.intervention != null,
        )
        .toList()
        .map((e) => e.copyWith(
              tags: [],
            ))
        .toList();
    List<amp.ExecutedSurvey> allAmpExecutedSurveys =
        await ExecutedSurveyRepository.getAllAmpExecutedSurveys();

    // TODO: check population of surveys with SurveySurveyTagRelations

    // TODO: populate contents, tags, levels of Interventions

    // Populate Intervention and Surveys
    allAmpInterventions.sort((a, b) => a.id.compareTo(b.id));
    allAmpSurveys
        .sort(((a, b) => a.intervention!.id.compareTo(b.intervention!.id)));
    await populateSortedLists<amp.Intervention, amp.Survey, String>(
        allAmpInterventions,
        (p0) => p0.id,
        allAmpSurveys,
        (p1) => p1.intervention!.id, (i1, i2) async {
      allAmpSurveys[i2] = allAmpSurveys[i2].copyWith(
          intervention: allAmpInterventions[i1]
              .copyWith(contents: [], tags: [], surveys: [], levels: []));

      allAmpInterventions[i1] = allAmpInterventions[i1].copyWith(
          surveys: (allAmpInterventions[i1].surveys ?? [])
            ..add(allAmpSurveys[i2]));
    });

    // Populate AppliedInterventions with Interventions
    allAmpAppliedInterventions.sort(((a, b) => a
        .appliedInterventionInterventionId
        .compareTo(b.appliedInterventionInterventionId)));
    await populateSortedLists<amp.Intervention, amp.AppliedIntervention,
            String>(
        allAmpInterventions,
        (p0) => p0.id,
        allAmpAppliedInterventions,
        (p1) => p1.appliedInterventionInterventionId, (i1, i2) async {
      amp.Intervention intervention = allAmpInterventions[i1];
      amp.User user = await UserRepository.getAmpUserByID(
          allAmpAppliedInterventions[i2].appliedInterventionWhoDidItId);
      allAmpAppliedInterventions[i2] = allAmpAppliedInterventions[i2].copyWith(
          intervention: intervention, whoDidIt: user, executedSurveys: []);
    });

    // Populate AppliedInterventions with ExecutedSurveys
    allAmpAppliedInterventions.sort(((a, b) => a.id.compareTo(b.id)));
    allAmpExecutedSurveys.sort(((a, b) =>
        a.appliedIntervention.id.compareTo(b.appliedIntervention.id)));
    await populateSortedLists<amp.AppliedIntervention, amp.ExecutedSurvey,
            String>(
        allAmpAppliedInterventions,
        (p0) => p0.id,
        allAmpExecutedSurveys,
        (p1) => p1.appliedIntervention.id, (i1, i2) async {
      var user = await UserRepository.getAmpUserByID(
          allAmpExecutedSurveys[i2].executedSurveyWhoExecutedItId);

      amp.Survey survey = allAmpSurveys
          .where((element) =>
              element.id == allAmpExecutedSurveys[i2].executedSurveySurveyId)
          .first;
      allAmpExecutedSurveys[i2] = allAmpExecutedSurveys[i2].copyWith(
          appliedIntervention: allAmpAppliedInterventions[i1].copyWith(
            executedSurveys: [],
          ),
          survey: survey,
          whoExecutedIt: user);

      allAmpAppliedInterventions[i1] = allAmpAppliedInterventions[i1].copyWith(
          executedSurveys: allAmpAppliedInterventions[i1].executedSurveys
            ..add(allAmpExecutedSurveys[i2]));
    });

    // Populate Entities with AppliedInterventions
    allAmpAppliedInterventions.sort(((a, b) => a.entityAppliedInterventionsId!
        .compareTo(b.entityAppliedInterventionsId!)));
    allAmpEntities.sort(((a, b) => a.id.compareTo(b.id)));
    await populateSortedLists<amp.Entity, amp.AppliedIntervention, String>(
        allAmpEntities,
        (p0) => p0.id,
        allAmpAppliedInterventions,
        (p1) => p1.entityAppliedInterventionsId!, (i1, i2) async {
      allAmpEntities[i1] = allAmpEntities[i1].copyWith(
          appliedInterventions: (allAmpEntities[i1].appliedInterventions ?? [])
            ..add(allAmpAppliedInterventions[i2]));
    });

    List<Entity> allEntities = allAmpEntities.map((e) {
      return Entity.fromAmplifyModel(e);
    }).toList();
    List<Level> allLevels = await LevelRepository.getAllLevels();
    List<Task> allTasksToSync = await taskBloc.taskRepository.getAllTasks();
    List<InterventionContentRelation> allContentRelations =
        await ContentRepository
            .getAllRelationsWithPopulatedContentsAndInterventions();

    List<Content> allContents = [];
    List<Intervention> allInterventions = [];
    for (InterventionContentRelation interventionContentRelation
        in allContentRelations) {
      if (!allContents.any(
          (element) => element.id == interventionContentRelation.content.id)) {
        allContents
            .add(Content.fromAmplifyModel(interventionContentRelation.content));
      }
    }
    for (var entity in allEntities) {
      if (!allLevels.any((element) => element.id == entity.level.id!)) {
        allLevels.add(entity.level);
      }
    }
    for (Level level in allLevels) {
      if (level.interventionsAreAllowed) {
        List<Intervention> toAdd =
            await InterventionRepository.getInterventionsByLevelConnections(
                level.allowedInterventions!);
        for (Intervention intervention in toAdd) {
          if (!allInterventions
              .any((element) => element.id == intervention.id)) {
            allInterventions.add(intervention);
          }
        }
      }
    }

    if (filesSyncEnabled) {
      syncLevels(allLevels);
      syncInterventions(allInterventions);
      syncTasks(allTasksToSync);
      syncContents(allContents);
      syncEntities(allEntities);
      if (userBloc.state.user != null) {
        syncUser(userBloc.state.user!);
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
    for (Level level in levels) {
      LevelRepository.getLevelPicFile(level).sync(this);
      for (CustomData customData in level.customData) {
        LevelRepository.getCustomDataPicFile(level, customData).sync(this);
      }
    }
  }

  void syncInterventions(List<Intervention> interventions) async {
    for (Intervention intervention in interventions) {
      InterventionRepository.getInterventionPic(intervention).sync(this);
      for (Survey survey in intervention.surveys) {
        SurveyRepository.getSurveyPic(survey).sync(this);
        for (Question question in survey.questions) {
          SurveyRepository.getQuestionPic(survey, question).sync(this);
          if (question.questionOptions != null) {
            for (QuestionOption questionOption in question.questionOptions!) {
              SurveyRepository.getQuestionOptionPic(
                      survey, question, questionOption)
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
      ContentRepository.getContentPDFFile(content).sync(this);
      ContentRepository.getContentPic(content).sync(this);
    }
  }

  void syncEntities(List<Entity> allEntities) async {
    for (Entity entity in allEntities) {
      EntityRepository.getEntityPic(entity).sync(this);
      for (AppliedIntervention appliedIntervention
          in entity.appliedInterventions) {
        AppliedInterventionRepository.appliedInterventionPic(
                appliedIntervention)
            .sync(this);
        for (ExecutedSurvey executedSurvey
            in appliedIntervention.executedSurveys) {
          for (QuestionAnswer questionAnswer in executedSurvey.answers) {
            if (questionAnswer.type == QuestionType.AUDIO) {
              ExecutedSurveyRepository.getQuestionAnswerAudio(
                      appliedIntervention,
                      executedSurvey.id!,
                      executedSurvey.survey.questions.firstWhere(
                          (element) => element.id == questionAnswer.id!))
                  .sync(this);
            } else if (questionAnswer.type == QuestionType.PICTURE ||
                questionAnswer.type == QuestionType.PICTUREWITHTAGS) {
              ExecutedSurveyRepository.getQuestionAnswerPic(
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
    UserRepository.getUserPicFile(user).sync(this);
  }
}
