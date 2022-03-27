import 'package:mobile_app/backend/callableModels/CallableModels.dart';

class OrganizationViewState {}

class EntitiesLoadedOrganizationViewState extends OrganizationViewState {
  final List<Entity> allEntities;
  final OrganizationViewType organizationViewType;
  final Entity? currentDetailEntity;
  final List<Entity> currentListEntities;
  final String appBarString;
  final bool addEntityPossible;
  final AppliedIntervention? currentDetailAppliedIntervention;
  final ExecutedSurvey? executedSurveyToDisplay;

  Entity entityByID(String id) => allEntities.firstWhere((e) => e.id == id);

  List<Entity> entitiesByParentID(String? id) {
    return List.from(
        allEntities.where((element) => element.parentEntityID == id));
  }

  bool hasChildren(String entityID) =>
      allEntities.any((obj) => obj.parentEntityID == entityID);

  List<Level> getLevelsInOrder() {
    List<Level> toOrder = [];
    allEntities.forEach((element) {
      if (!toOrder.any((l) => l.id == element.level.id)) {
        toOrder.add(element.level);
      }
    });
    int parentIndex =
        toOrder.indexWhere((element) => element.parentLevelID == null);
    List<Level> inOrder = [toOrder.removeAt(parentIndex)];
    while (toOrder.isNotEmpty) {
      int removeIndex = toOrder
          .indexWhere((element) => element.parentLevelID == inOrder.last.id);
      inOrder.add(toOrder.removeAt(removeIndex));
    }
    return inOrder;
  }

  bool addChildPossible(Entity entity) {
    List<Level> levelsInOrder = getLevelsInOrder();
    return levelsInOrder.last.id != entity.level.id;
  }

  Level getCurrentLevel() {
    return currentListEntities.first.level;
  }

  Level? getDaughterLevel(Level level) {
    return getLevelsInOrder()
        .firstWhere((element) => element.parentLevelID == level.id);
  }

  EntitiesLoadedOrganizationViewState(
      {required this.allEntities,
      required this.organizationViewType,
      this.currentDetailEntity,
      required this.currentListEntities,
      required this.appBarString,
      required this.addEntityPossible,
      this.currentDetailAppliedIntervention,
      this.executedSurveyToDisplay});

  EntitiesLoadedOrganizationViewState copyWith(
      {List<Entity>? allEntities,
      OrganizationViewType? organizationViewType,
      Entity? currentDetailEntity,
      List<Entity>? currentListEntities,
      String? appBarString,
      bool? addEntityPossible,
      AppliedIntervention? currentDetailAppliedIntervention,
      ExecutedSurvey? executedSurveyToDisplay}) {
    return EntitiesLoadedOrganizationViewState(
        allEntities: allEntities ?? this.allEntities,
        organizationViewType: organizationViewType ?? this.organizationViewType,
        currentListEntities: currentListEntities ?? this.currentListEntities,
        currentDetailEntity: currentDetailEntity,
        appBarString: appBarString ?? this.appBarString,
        addEntityPossible: addEntityPossible ?? this.addEntityPossible,
        currentDetailAppliedIntervention: currentDetailAppliedIntervention ??
            this.currentDetailAppliedIntervention,
        executedSurveyToDisplay: executedSurveyToDisplay);
  }
}

enum OrganizationViewType {
  LIST,
  OVERVIEW,
  INFO,
  SURVEYS,
  APPLIEDINTERVENTIONS,
  APPLIEDINTERVENTIONDETAIL,
  TASKS,
  HISTORY,
  EXECUTEDSURVEY
}

class LoadingOrganizationViewState extends OrganizationViewState {}
