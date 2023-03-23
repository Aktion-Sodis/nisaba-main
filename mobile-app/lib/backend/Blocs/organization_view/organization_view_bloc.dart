import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_bloc.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_events.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_events.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_state.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/LevelRepository.dart';
import 'package:mobile_app/frontend/pages/task_form/task_form.dart';
import 'package:mobile_app/frontend/strings.dart' as strings;
import 'package:mobile_app/utils/gps.dart';

class OrganizationViewBloc
    extends Bloc<OrganizationViewEvent, OrganizationViewState> {
  EntityRepository entityRepository;
  AppliedInterventionRepository appliedInterventionRepository;
  InAppBloc inAppBloc;

  OrganizationViewBloc(
      this.entityRepository, this.appliedInterventionRepository, this.inAppBloc)
      : super(LoadingOrganizationViewState()) {
    on<OrganizationViewEvent>(_mapEventToState);
    LevelRepository.instance.getAllLevels().then((allLevels) async {
      String startingAppBarString = allLevels.first.displayName;
      var levelContent = LevelContent(allLevels.first, null);
      await _loadEntities(levelContent, null);

      // ignore: invalid_use_of_visible_for_testing_member
      emit(EntitiesLoadedOrganizationViewState(
          allLevels: allLevels,
          organizationViewType: OrganizationViewType.LIST,
          levelContentList: [levelContent],
          appBarString: startingAppBarString,
          addEntityPossible: true));
    });
  }

  Future<void> _loadEntities(
      LevelContent content, String? parentEntityID) async {
    print('Loads entities');
    List<Entity> loadedEntities = await EntityRepository.instance.getEntities(
        byParentEntityID: true, parentEntityID: parentEntityID, page: 0);
    print('Loaded entities length: ${loadedEntities.length}');
    loadedEntities.forEach((element) {
      element.level = content.level;
      print('Loaded entity: ${element.displayName}');
    });
    //todo: hier läuft es iwie nicht
    //state wird nicht geupdatet
    content.daughterEntities.addAll(loadedEntities);
  }

  void _mapEventToState(
      OrganizationViewEvent event, Emitter<OrganizationViewState> emit) async {
    if (state is EntitiesLoadedOrganizationViewState) {
      EntitiesLoadedOrganizationViewState loadedState =
          state as EntitiesLoadedOrganizationViewState;

      if (event is BackTapEvent) {
        switch (loadedState.organizationViewType) {
          case OrganizationViewType.LIST:
            if (loadedState.levelContentList.length > 1) {
              loadedState.levelContentList.removeLast();
              String appBarName =
                  loadedState.levelContentList.last.level.displayName;
              emit(loadedState.copyWith(appBarString: appBarName));
            }
            break;
          case OrganizationViewType.OVERVIEW:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.LIST,
                currentDetailEntity: null,
                appBarString:
                    loadedState.levelContentList.last.level.displayName));
            break;
          case OrganizationViewType.APPLIEDINTERVENTIONS:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.OVERVIEW,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: loadedState.currentDetailEntity!.displayName));
            break;
          case OrganizationViewType.APPLIEDINTERVENTIONDETAIL:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.APPLIEDINTERVENTIONS,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: strings.organization_view_applied_interventions));
            break;
          case OrganizationViewType.SURVEYS:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.OVERVIEW,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: loadedState.currentDetailEntity!.displayName));
            break;
          case OrganizationViewType.TASKS:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.OVERVIEW,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: loadedState.currentDetailEntity!.displayName));
            break;
          case OrganizationViewType.HISTORY:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.SURVEYS,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: strings.organization_view_surveys +
                    " (${loadedState.currentDetailEntity!.name})"));
            break;
          case OrganizationViewType.EXECUTEDSURVEY:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.HISTORY,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: strings.organization_view_history +
                    " (${loadedState.currentDetailEntity!.name})"));
            break;
          default:
            emit(loadedState.copyWith(
                organizationViewType: OrganizationViewType.OVERVIEW,
                currentDetailEntity: loadedState.currentDetailEntity,
                appBarString: loadedState.currentDetailEntity!.displayName));
            break;
        }
      } else if (event is NavigateToDaughterView) {
        Level nextLevel = loadedState.allLevels.firstWhere(
          (element) => element.parentLevelID == event.parent.level.id,
        );
        var levelContent = LevelContent(nextLevel, event.parent);
        await _loadEntities(levelContent, event.parent.id);
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.LIST,
            levelContentList: loadedState.levelContentList..add(levelContent),
            appBarString: nextLevel.displayName));
        // add(LoadDaughterEntities(event.parent, 0));
      } else if (event is NavigateToEntityOverview) {
        print('Event coming: ');
        print(event.entity.displayName);
        print(event.entity.appliedInterventions.length);
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.OVERVIEW,
            currentDetailEntity: event.entity,
            appBarString: event.entity.displayName));
      } else if (event is NavigateToEntityTasks) {
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.TASKS,
            currentDetailEntity: event.entity,
            appBarString:
                strings.organization_view_taks + " (${event.entity.name})"));
      } else if (event is NavigateToEntityInfo) {
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.INFO,
            currentDetailEntity: event.entity,
            appBarString:
                strings.organization_view_info + " (${event.entity.name})"));
      } else if (event is NavigateToEntitySurveys) {
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.SURVEYS,
            currentDetailEntity: event.entity,
            appBarString:
                strings.organization_view_surveys + " (${event.entity.name})"));
      } else if (event is NavigateToEntityHistory) {
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.HISTORY,
            currentDetailEntity: event.entity,
            appBarString:
                strings.organization_view_history + " (${event.entity.name})"));
      } else if (event is NavigateToEntityAppliedInterventions) {
        emit(loadedState.copyWith(
            organizationViewType: OrganizationViewType.APPLIEDINTERVENTIONS,
            currentDetailEntity: event.entity,
            appBarString: strings.organization_view_applied_interventions +
                " (${event.entity.name})"));
      } else if (event is StartSurvey) {
        inAppBloc.add(PerformSurveyEvent(
            survey: event.survey,
            appliedIntervention: event.appliedIntervention,
            entity: event.entity));
      } else if (event is AddExecutedSurvey) {
        bool isCurrentDetailEntity =
            loadedState.currentDetailEntity?.id == event.entity.id;

        late Entity toEdit;
        for (LevelContent levelContent in loadedState.levelContentList) {
          for (Entity entity in levelContent.daughterEntities) {
            if (entity.id == event.entity.id) {
              toEdit = entity;
            }
          }
        }

        int aIIndex = toEdit.appliedInterventions.indexWhere(
            (element) => element.id == event.appliedIntervention.id);
        toEdit.appliedInterventions[aIIndex].executedSurveys
            .add(event.executedSurvey);

        emit(loadedState.copyWith(
            currentDetailEntity: loadedState.currentDetailEntity));
      } else if (event is AddEntity) {
        Entity newEntity = event.entity;
        try {
          newEntity.location =
              Location.fromPosition(await GPS.getCurrentPosition());
        } catch (e) {
          // Probably: LocationServiceDisabledException or TimeoutException
        }
        String id = await EntityRepository.instance.createEntity(newEntity);
        newEntity.id = id;
        loadedState.levelContentList.last.daughterEntities.add(newEntity);

        emit(loadedState.copyWith());
      } else if (event is UpdateEntity) {
        EntityRepository.instance.updateEntity(event.entity);
        emit(loadedState.copyWith(
            appBarString: event.entity.displayName,
            currentDetailEntity: event.entity));
      } else if (event is AddAppliedIntervention) {
        try {
          event.appliedIntervention.location =
              Location.fromPosition(await GPS.getCurrentPosition());
        } catch (e) {
          // Probably: LocationServiceDisabledException or TimeoutException
        }
        String id = await AppliedInterventionRepository.instance
            .createAppliedIntervention(event.appliedIntervention, event.entity);
        print("new InterventionID: $id");
        AppliedIntervention toAdd = event.appliedIntervention;
        toAdd.id = id;

        for (LevelContent levelContent in loadedState.levelContentList) {
          for (Entity entity in levelContent.daughterEntities) {
            if (entity.id == event.entity.id) {
              entity.appliedInterventions.add(toAdd);
            }
          }
        }

        /*List<Entity> newCurrentEntities = loadedState.currentListEntities;
        int currentIndex = newCurrentEntities
            .indexWhere((element) => element.id == event.entity.id);
        if (currentIndex > -1) {
          newCurrentEntities[currentIndex].appliedInterventions.add(toAdd);
        }
        Entity? newCurrentEntity = loadedState.currentDetailEntity;
        if (newCurrentEntity?.id == event.entity.id) {
          newCurrentEntity!.appliedInterventions.add(toAdd);
        }*/
        emit(loadedState.copyWith(
            currentDetailEntity: loadedState.currentDetailEntity));
      } else if (event is UpdateAppliedIntervention) {
        AppliedInterventionRepository.instance
            .updateAppliedIntervention(event.appliedIntervention, event.entity);
        AppliedIntervention toAdd = event.appliedIntervention;
        Entity toSet = event.entity;

        int aIIndex = toSet.appliedInterventions.indexWhere(
            (element) => element.id == event.appliedIntervention.id);
        toSet.appliedInterventions[aIIndex] = event.appliedIntervention;

        emit(loadedState.copyWith(
            currentDetailEntity: loadedState.currentDetailEntity,
            currentDetailAppliedIntervention:
                loadedState.currentDetailAppliedIntervention != null
                    ? toAdd
                    : null));
      } else if (event is NavigateToEntityAppliedInterventionDetail) {
        emit(loadedState.copyWith(
            appBarString: event.appliedIntervention.intervention.displayName,
            currentDetailEntity: loadedState.currentDetailEntity,
            organizationViewType:
                OrganizationViewType.APPLIEDINTERVENTIONDETAIL,
            currentDetailAppliedIntervention: event.appliedIntervention));
      } else if (event is NavigateToExecutedSurvey) {
        emit(loadedState.copyWith(
          appBarString: TaskForm.formatDate(event.executedSurvey.date) +
              ": " +
              event.executedSurvey.survey.displayName,
          executedSurveyToDisplay: event.executedSurvey,
          currentDetailEntity: loadedState.currentDetailEntity,
          organizationViewType: OrganizationViewType.EXECUTEDSURVEY,
        ));
      } else if (event is UpdatePic) {
        emit(loadedState.copyWith(
            organizationViewType: loadedState.organizationViewType,
            appBarString: loadedState.appBarString,
            addEntityPossible: loadedState.addEntityPossible,
            currentDetailEntity: loadedState.currentDetailEntity,
            currentDetailAppliedIntervention:
                loadedState.currentDetailAppliedIntervention,
            executedSurveyToDisplay: loadedState.executedSurveyToDisplay));
      }
    }
  }
}
