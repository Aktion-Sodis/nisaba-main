import { GraphQLResult } from '@aws-amplify/api';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import { Level, Intervention, Survey } from '@/API';
import {
  createLevel as createLevelMutation,
  updateLevel as updateLevelMutation,
  createIntervention as createInterventionMutation,
  updateIntervention as updateInterventionMutation,
  createSurvey as createSurveyMutation,
  updateSurvey as updateSurveyMutation,
  createLevelInterventionRelation as createLevelInterventionRelationMutation,
  deleteLevelInterventionRelation as deleteLevelInterventionRelationMutation,
  deleteLevel as deleteLevelMutation,
  deleteIntervention as deleteInterventionMutation,
} from '@/graphql/mutations';
import { listLevels, listInterventions, listSurveys } from '@/graphql/queries';
import { amplifyDataClient } from '@/utils/amplifyDataClient';

const listLevelInterventionRelationsMinimal = /* GraphQL */ `
  query ListLevelInterventionRelations(
    $filter: ModelLevelInterventionRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLevelInterventionRelations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        levelId
        interventionId
      }
      nextToken
      startedAt
    }
  }
`;

interface MinimalLevelInterventionRelation {
  id: string;
  levelId: string;
  interventionId: string;
  _deleted?: boolean;
}

interface MinimalLevelInterventionRelationConnection {
  items: MinimalLevelInterventionRelation[];
  nextToken: string | null;
  startedAt: number | null;
}

interface MinimalLevelInterventionRelationsResponse {
  listLevelInterventionRelations: MinimalLevelInterventionRelationConnection;
}

interface StoreLevel extends Omit<Level, 'allowedInterventions'> {}
interface StoreIntervention extends Omit<Intervention, 'levels'> {}

export const useProjectConfigStore = defineStore('projectConfig', () => {
  const _levels = reactive<Record<string, StoreLevel>>({});
  const _interventions = reactive<Record<string, StoreIntervention>>({});
  const _surveys = reactive<Record<string, Survey>>({});
  const _levelInterventionRelations = reactive<
    Record<string, { id: string; levelId: string; interventionId: string }>
  >({});

  const isLoadingLevels = ref(false);
  const isLoadingInterventions = ref(false);
  const isLoadingSurveys = ref(false);
  const isLoadingRelations = ref(false);
  const errorLoadingLevels = ref<string | null>(null);
  const errorLoadingInterventions = ref<string | null>(null);
  const errorLoadingSurveys = ref<string | null>(null);
  const errorLoadingRelations = ref<string | null>(null);

  const _updateInterventionSurveyRelations = (
    interventionId: string,
    surveyId: string,
    isConnected: boolean
  ) => {
    const intervention = _interventions[interventionId];
    const survey = _surveys[surveyId];

    if (!intervention || !survey) return;

    // Update intervention's surveys
    const currentInterventionSurveys = intervention.surveys?.items || [];
    if (isConnected) {
      // Add relation if not exists
      if (!currentInterventionSurveys.some((s) => s?.id === surveyId)) {
        intervention.surveys = {
          __typename: 'ModelSurveyConnection',
          items: [...currentInterventionSurveys, survey],
          nextToken: null,
          startedAt: null,
        };
      }
    } else {
      // Remove relation if exists
      intervention.surveys = {
        __typename: 'ModelSurveyConnection',
        items: currentInterventionSurveys.filter((s) => s?.id !== surveyId),
        nextToken: null,
        startedAt: null,
      };
    }

    // Update survey's intervention
    if (isConnected) {
      survey.intervention = intervention;
    } else {
      survey.intervention = null;
    }
  };

  const _updateInterventionSurveys = (
    interventionId: string,
    newSurveys: any[]
  ) => {
    const intervention = _interventions[interventionId];
    if (!intervention) return;

    const existingSurveys = intervention.surveys?.items || [];

    // Find surveys to remove (exist in current but not in new)
    const surveysToRemove = existingSurveys.filter(
      (existing) =>
        !newSurveys.some((newSurvey) => newSurvey?.id === existing?.id)
    );

    // Find surveys to add (exist in new but not in current)
    const surveysToAdd = newSurveys.filter(
      (newSurvey) =>
        !existingSurveys.some((existing) => existing?.id === newSurvey?.id)
    );

    // Remove old relations
    surveysToRemove.forEach((survey: any) => {
      _updateInterventionSurveyRelations(interventionId, survey.id, false);
    });

    // Add new relations
    surveysToAdd.forEach((survey: any) => {
      _updateInterventionSurveyRelations(interventionId, survey.id, true);
    });
  };

  const _updateSurveyIntervention = (
    surveyId: string,
    newInterventionId: string | null
  ) => {
    const survey = _surveys[surveyId];
    if (!survey) return;

    const currentInterventionId = survey.intervention?.id;

    // Only update if the intervention has changed
    if (currentInterventionId !== newInterventionId) {
      // Remove old relation if exists
      if (currentInterventionId) {
        _updateInterventionSurveyRelations(
          currentInterventionId,
          surveyId,
          false
        );
      }

      // Add new relation if exists
      if (newInterventionId) {
        _updateInterventionSurveyRelations(newInterventionId, surveyId, true);
      }
    }
  };

  const loadLevelsFromRemote = async () => {
    try {
      isLoadingLevels.value = true;
      let nextToken: string | null = null;

      do {
        const result = (await amplifyDataClient.graphql({
          query: listLevels,
          variables: {
            nextToken,
          },
        })) as GraphQLResult<{
          listLevels: { items: Level[]; nextToken: string | null };
        }>;

        result.data.listLevels.items.forEach((level: Level) => {
          // Skip if the item is marked as deleted
          if (level._deleted) return;

          const {
            allowedInterventions: _allowedInterventions,
            ...levelWithoutRelations
          } = level;
          _levels[level.id] = levelWithoutRelations as StoreLevel;
        });

        nextToken = result.data.listLevels.nextToken;
      } while (nextToken);
    } catch (error: unknown) {
      errorLoadingLevels.value =
        error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingLevels.value = false;
    }
  };

  const loadInterventionsFromRemote = async () => {
    try {
      isLoadingInterventions.value = true;
      let nextToken: string | null = null;

      do {
        const result = (await amplifyDataClient.graphql({
          query: listInterventions,
          variables: {
            nextToken,
          },
        })) as GraphQLResult<{
          listInterventions: {
            items: Intervention[];
            nextToken: string | null;
          };
        }>;

        result.data.listInterventions.items.forEach(
          (intervention: Intervention) => {
            // Skip if the item is marked as deleted
            if (intervention._deleted) return;

            const { levels: _levels, ...interventionWithoutRelations } =
              intervention;
            _interventions[intervention.id] =
              interventionWithoutRelations as StoreIntervention;
          }
        );

        nextToken = result.data.listInterventions.nextToken;
      } while (nextToken);
    } catch (error: unknown) {
      errorLoadingInterventions.value =
        error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingInterventions.value = false;
    }
  };

  const loadSurveysFromRemote = async () => {
    try {
      isLoadingSurveys.value = true;
      let nextToken: string | null = null;

      do {
        const result = (await amplifyDataClient.graphql({
          query: listSurveys,
          variables: {
            nextToken,
          },
        })) as GraphQLResult<{
          listSurveys: { items: Survey[]; nextToken: string | null };
        }>;

        result.data.listSurveys.items.forEach((survey: Survey) => {
          // Skip if the item is marked as deleted
          if (survey._deleted) return;

          _surveys[survey.id] = survey;
        });

        nextToken = result.data.listSurveys.nextToken;
      } while (nextToken);
    } catch (error: unknown) {
      errorLoadingSurveys.value =
        error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingSurveys.value = false;
    }
  };

  const loadRelationsFromRemote = async () => {
    try {
      isLoadingRelations.value = true;
      let nextToken: string | null = null;

      do {
        const result = (await amplifyDataClient.graphql({
          query: listLevelInterventionRelationsMinimal,
          variables: {
            nextToken,
          },
        })) as GraphQLResult<MinimalLevelInterventionRelationsResponse>;

        if (!result.data) {
          throw new Error('No data returned from GraphQL query');
        }

        result.data.listLevelInterventionRelations.items.forEach((relation) => {
          // Skip if the item is marked as deleted
          if (relation._deleted) return;

          _levelInterventionRelations[relation.id] = {
            id: relation.id,
            levelId: relation.levelId,
            interventionId: relation.interventionId,
          };
        });

        nextToken = result.data.listLevelInterventionRelations.nextToken;
      } while (nextToken);
    } catch (error: unknown) {
      errorLoadingRelations.value =
        error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingRelations.value = false;
    }
  };

  const isCreatingLevel = ref(false);
  const createLevel = async (level: StoreLevel) => {
    try {
      isCreatingLevel.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: createLevelMutation,
        variables: {
          input: level,
        },
      });
      const {
        allowedInterventions: _allowedInterventions,
        ...levelWithoutRelations
      } = data.createLevel;
      _levels[levelWithoutRelations.id] = levelWithoutRelations as StoreLevel;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isCreatingLevel.value = false;
    }
  };

  const isCreatingIntervention = ref(false);
  const createIntervention = async (intervention: StoreIntervention) => {
    try {
      isCreatingIntervention.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: createInterventionMutation,
        variables: {
          input: intervention,
        },
      });
      const { levels: _levels, ...interventionWithoutRelations } =
        data.createIntervention;
      _interventions[interventionWithoutRelations.id] =
        interventionWithoutRelations as StoreIntervention;

      // Update relationships in offline state
      if (data.createIntervention.surveys?.items) {
        _updateInterventionSurveys(
          data.createIntervention.id,
          data.createIntervention.surveys.items
        );
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isCreatingIntervention.value = false;
    }
  };

  const isCreatingSurvey = ref(false);
  const createSurvey = async (survey: Survey) => {
    try {
      isCreatingSurvey.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: createSurveyMutation,
        variables: {
          input: survey,
        },
      });
      // @ts-expect-error problems with the type inference
      _surveys[data.createSurvey.id] = data.createSurvey;

      // Update relationships in offline state
      if (data.createSurvey.intervention?.id) {
        _updateSurveyIntervention(
          data.createSurvey.id,
          data.createSurvey.intervention.id
        );
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isCreatingSurvey.value = false;
    }
  };

  const isUpdatingLevel = ref(false);
  const updateLevel = async (level: StoreLevel) => {
    try {
      isUpdatingLevel.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: updateLevelMutation,
        variables: {
          input: level,
        },
      });
      const {
        allowedInterventions: _allowedInterventions,
        ...levelWithoutRelations
      } = data.updateLevel;
      _levels[levelWithoutRelations.id] = levelWithoutRelations as StoreLevel;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isUpdatingLevel.value = false;
    }
  };

  const isUpdatingIntervention = ref(false);
  const updateIntervention = async (intervention: StoreIntervention) => {
    try {
      isUpdatingIntervention.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: updateInterventionMutation,
        variables: {
          input: intervention,
        },
      });
      const { levels: _levels, ...interventionWithoutRelations } =
        data.updateIntervention;
      _interventions[interventionWithoutRelations.id] =
        interventionWithoutRelations as StoreIntervention;

      // Update relationships in offline state
      if (data.updateIntervention.surveys?.items) {
        _updateInterventionSurveys(
          intervention.id,
          data.updateIntervention.surveys.items
        );
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isUpdatingIntervention.value = false;
    }
  };

  const isUpdatingSurvey = ref(false);
  const updateSurvey = async (survey: Survey) => {
    try {
      isUpdatingSurvey.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: updateSurveyMutation,
        variables: {
          input: survey,
        },
      });

      // Update the store
      // @ts-expect-error problems with the type inference
      _surveys[data.updateSurvey.id] = data.updateSurvey;

      // Update relationships in offline state
      _updateSurveyIntervention(
        survey.id,
        data.updateSurvey.intervention?.id ?? null
      );
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isUpdatingSurvey.value = false;
    }
  };

  const getLevelById = (id: string) => {
    return _levels[id];
  };

  const getInterventionById = (id: string) => {
    return _interventions[id];
  };

  const getSurveyById = (id: string) => {
    return _surveys[id];
  };

  const levelsSortedByHierarchy = computed(() => {
    const levelsArray = Object.values(_levels);
    const toReturn: StoreLevel[] = [];
    const levelsWithoutParent = levelsArray.filter(
      (level) => level.parentLevelID === null
    );
    toReturn.push(...levelsWithoutParent);
    while (toReturn.length < levelsArray.length) {
      const lastLevel = toReturn[toReturn.length - 1];
      const nextLevel = levelsArray.find(
        (level) => level.parentLevelID === lastLevel.id
      );
      if (nextLevel) {
        toReturn.push(nextLevel);
      } else {
        break;
      }
    }
    return toReturn;
  });

  const interventions = computed(() => {
    return Object.values(_interventions);
  });

  const surveys = computed(() => {
    return Object.values(_surveys);
  });

  const isLoading = computed(() => {
    return (
      isLoadingLevels.value ||
      isLoadingInterventions.value ||
      isLoadingSurveys.value
    );
  });

  const initialize = async () => {
    await Promise.all([
      loadLevelsFromRemote(),
      loadInterventionsFromRemote(),
      loadSurveysFromRemote(),
      loadRelationsFromRemote(),
    ]);
  };

  const getInterventionsByLevel = (levelId: string): StoreIntervention[] => {
    const relationIds = Object.values(_levelInterventionRelations)
      .filter((relation) => relation.levelId === levelId)
      .map((relation) => relation.interventionId);

    return relationIds
      .map((id) => _interventions[id])
      .filter(
        (intervention): intervention is StoreIntervention =>
          intervention !== undefined
      );
  };

  const getSurveysByIntervention = (interventionId: string): Survey[] => {
    const intervention = _interventions[interventionId];
    if (!intervention) return [];

    return (
      intervention.surveys?.items
        ?.map((survey) => (survey?.id ? _surveys[survey.id] : undefined))
        .filter((survey): survey is Survey => survey !== undefined) ?? []
    );
  };

  const createLevelInterventionRelation = async (
    levelId: string,
    interventionId: string
  ) => {
    try {
      const { data } = await amplifyDataClient.graphql({
        query: createLevelInterventionRelationMutation,
        variables: {
          input: {
            levelId,
            interventionId,
          },
        },
      });

      const relationId = data.createLevelInterventionRelation.id;
      _levelInterventionRelations[relationId] = {
        id: relationId,
        levelId,
        interventionId,
      };
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const deleteLevelInterventionRelation = async (relationId: string) => {
    try {
      await amplifyDataClient.graphql({
        query: deleteLevelInterventionRelationMutation,
        variables: {
          input: {
            id: relationId,
          },
        },
      });

      delete _levelInterventionRelations[relationId];
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const getRelationsByLevelId = (levelId: string) => {
    return Object.values(_levelInterventionRelations).filter(
      (relation) => relation.levelId === levelId
    );
  };

  const getRelationsByInterventionId = (interventionId: string) => {
    return Object.values(_levelInterventionRelations).filter(
      (relation) => relation.interventionId === interventionId
    );
  };

  const getInterventionIdsByLevelId = (levelId: string) => {
    return getRelationsByLevelId(levelId).map(
      (relation) => relation.interventionId
    );
  };

  const getLevelIdsByInterventionId = (interventionId: string) => {
    return getRelationsByInterventionId(interventionId).map(
      (relation) => relation.levelId
    );
  };

  const clear = () => {
    Object.keys(_levels).forEach((key) => delete _levels[key]);
    Object.keys(_interventions).forEach((key) => delete _interventions[key]);
    Object.keys(_surveys).forEach((key) => delete _surveys[key]);
    Object.keys(_levelInterventionRelations).forEach(
      (key) => delete _levelInterventionRelations[key]
    );
    isLoadingLevels.value = false;
    isLoadingInterventions.value = false;
    isLoadingSurveys.value = false;
    isLoadingRelations.value = false;
    errorLoadingLevels.value = null;
    errorLoadingInterventions.value = null;
    errorLoadingSurveys.value = null;
    errorLoadingRelations.value = null;
  };

  const deleteLevel = async (levelId: string) => {
    try {
      // First, get all relations for this level
      const relations = getRelationsByLevelId(levelId);

      // Delete all relations
      await Promise.all(
        relations.map((relation) =>
          deleteLevelInterventionRelation(relation.id)
        )
      );

      // Delete the level
      await amplifyDataClient.graphql({
        query: deleteLevelMutation,
        variables: {
          input: {
            id: levelId,
          },
        },
      });

      // Remove from local store
      delete _levels[levelId];
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const deleteIntervention = async (interventionId: string) => {
    try {
      // First, get all relations for this intervention
      const relations = getRelationsByInterventionId(interventionId);

      // Delete all relations
      await Promise.all(
        relations.map((relation) =>
          deleteLevelInterventionRelation(relation.id)
        )
      );

      // Delete the intervention
      await amplifyDataClient.graphql({
        query: deleteInterventionMutation,
        variables: {
          input: {
            id: interventionId,
          },
        },
      });

      // Remove from local store
      delete _interventions[interventionId];
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const setLevelInterventionRelations = async (
    levelId: string,
    interventionIds: string[]
  ) => {
    try {
      // Get current relations for this level
      const currentRelations = getRelationsByLevelId(levelId);
      const currentInterventionIds = currentRelations.map(
        (r) => r.interventionId
      );

      // Find relations to create (in new list but not in current)
      const relationsToCreate = interventionIds.filter(
        (id) => !currentInterventionIds.includes(id)
      );

      // Find relations to delete (in current but not in new list)
      const relationsToDelete = currentRelations.filter(
        (relation) => !interventionIds.includes(relation.interventionId)
      );

      // Create new relations
      await Promise.all(
        relationsToCreate.map((interventionId) =>
          createLevelInterventionRelation(levelId, interventionId)
        )
      );

      // Delete old relations
      await Promise.all(
        relationsToDelete.map((relation) =>
          deleteLevelInterventionRelation(relation.id)
        )
      );
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const setInterventionLevelRelations = async (
    interventionId: string,
    levelIds: string[]
  ) => {
    try {
      // Get current relations for this intervention
      const currentRelations = getRelationsByInterventionId(interventionId);
      const currentLevelIds = currentRelations.map((r) => r.levelId);

      // Find relations to create (in new list but not in current)
      const relationsToCreate = levelIds.filter(
        (id) => !currentLevelIds.includes(id)
      );

      // Find relations to delete (in current but not in new list)
      const relationsToDelete = currentRelations.filter(
        (relation) => !levelIds.includes(relation.levelId)
      );

      // Create new relations
      await Promise.all(
        relationsToCreate.map((levelId) =>
          createLevelInterventionRelation(levelId, interventionId)
        )
      );

      // Delete old relations
      await Promise.all(
        relationsToDelete.map((relation) =>
          deleteLevelInterventionRelation(relation.id)
        )
      );
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  return {
    createLevel,
    isCreatingLevel,
    isLoadingLevels,
    errorLoadingLevels,
    loadLevelsFromRemote,
    getLevelById,
    levelsSortedByHierarchy,
    updateLevel,
    isUpdatingLevel,
    deleteLevel,
    createIntervention,
    isCreatingIntervention,
    isLoadingInterventions,
    errorLoadingInterventions,
    loadInterventionsFromRemote,
    getInterventionById,
    interventions,
    updateIntervention,
    isUpdatingIntervention,
    deleteIntervention,
    createSurvey,
    isCreatingSurvey,
    isLoadingSurveys,
    errorLoadingSurveys,
    loadSurveysFromRemote,
    getSurveyById,
    surveys,
    updateSurvey,
    isUpdatingSurvey,
    isLoading,
    getInterventionsByLevel,
    getSurveysByIntervention,
    initialize,
    clear,
    loadRelationsFromRemote,
    createLevelInterventionRelation,
    deleteLevelInterventionRelation,
    getRelationsByLevelId,
    getRelationsByInterventionId,
    getInterventionIdsByLevelId,
    getLevelIdsByInterventionId,
    isLoadingRelations,
    errorLoadingRelations,
    setLevelInterventionRelations,
    setInterventionLevelRelations,
  };
});
