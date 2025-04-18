import { Level, Intervention, Survey, ModelLevelInterventionRelationConnection } from '@/API'
import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { listLevels, listInterventions, listSurveys } from '@/graphql/queries'
import { createLevel as createLevelMutation, updateLevel as updateLevelMutation, createIntervention as createInterventionMutation, updateIntervention as updateInterventionMutation, createSurvey as createSurveyMutation, updateSurvey as updateSurveyMutation } from '@/graphql/mutations'
import { amplifyDataClient } from '@/utils/amplifyDataClient'

export const useProjectConfigStore = defineStore('projectConfig', () => {
  const _levels = reactive<Record<string, Level>>({});
  const _interventions = reactive<Record<string, Intervention>>({});
  const _surveys = reactive<Record<string, Survey>>({});
  const isLoadingLevels = ref(false);
  const isLoadingInterventions = ref(false);
  const isLoadingSurveys = ref(false);
  const errorLoadingLevels = ref<string | null>(null);
  const errorLoadingInterventions = ref<string | null>(null);
  const errorLoadingSurveys = ref<string | null>(null);

  const _updateLevelInterventionRelations = (levelId: string, interventionId: string, isConnected: boolean) => {
    const level = _levels[levelId];
    const intervention = _interventions[interventionId];

    if (!level || !intervention) return;

    // Update level's allowedInterventions
    const currentLevelRelations = level.allowedInterventions?.items || [];
    if (isConnected) {
      // Add relation if not exists
      if (!currentLevelRelations.some(r => r?.interventionId === interventionId)) {
        level.allowedInterventions = {
          __typename: 'ModelLevelInterventionRelationConnection',
          items: [...currentLevelRelations, { interventionId, levelId }],
          nextToken: null,
          startedAt: null
        } as ModelLevelInterventionRelationConnection;
      }
    } else {
      // Remove relation if exists
      level.allowedInterventions = {
        __typename: 'ModelLevelInterventionRelationConnection',
        items: currentLevelRelations.filter(r => r?.interventionId !== interventionId),
        nextToken: null,
        startedAt: null
      } as ModelLevelInterventionRelationConnection;
    }

    // Update intervention's levels
    const currentInterventionRelations = intervention.levels?.items || [];
    if (isConnected) {
      // Add relation if not exists
      if (!currentInterventionRelations.some(r => r?.levelId === levelId)) {
        intervention.levels = {
          __typename: 'ModelLevelInterventionRelationConnection',
          items: [...currentInterventionRelations, { interventionId, levelId }],
          nextToken: null,
          startedAt: null
        } as ModelLevelInterventionRelationConnection;
      }
    } else {
      // Remove relation if exists
      intervention.levels = {
        __typename: 'ModelLevelInterventionRelationConnection',
        items: currentInterventionRelations.filter(r => r?.levelId !== levelId),
        nextToken: null,
        startedAt: null
      } as ModelLevelInterventionRelationConnection;
    }
  }

  const _updateInterventionSurveyRelations = (interventionId: string, surveyId: string, isConnected: boolean) => {
    const intervention = _interventions[interventionId];
    const survey = _surveys[surveyId];

    if (!intervention || !survey) return;

    // Update intervention's surveys
    const currentInterventionSurveys = intervention.surveys?.items || [];
    if (isConnected) {
      // Add relation if not exists
      if (!currentInterventionSurveys.some(s => s?.id === surveyId)) {
        intervention.surveys = {
          __typename: 'ModelSurveyConnection',
          items: [...currentInterventionSurveys, survey],
          nextToken: null,
          startedAt: null
        };
      }
    } else {
      // Remove relation if exists
      intervention.surveys = {
        __typename: 'ModelSurveyConnection',
        items: currentInterventionSurveys.filter(s => s?.id !== surveyId),
        nextToken: null,
        startedAt: null
      };
    }

    // Update survey's intervention
    if (isConnected) {
      survey.intervention = intervention;
    } else {
      survey.intervention = null;
    }
  }

  const _updateInterventionSurveys = (interventionId: string, newSurveys: any[]) => {
    const intervention = _interventions[interventionId];
    if (!intervention) return;

    const existingSurveys = intervention.surveys?.items || [];
    
    // Find surveys to remove (exist in current but not in new)
    const surveysToRemove = existingSurveys.filter(
      existing => !newSurveys.some(newSurvey => newSurvey?.id === existing?.id)
    );

    // Find surveys to add (exist in new but not in current)
    const surveysToAdd = newSurveys.filter(
      newSurvey => !existingSurveys.some(existing => existing?.id === newSurvey?.id)
    );

    // Remove old relations
    surveysToRemove.forEach((survey: any) => {
      _updateInterventionSurveyRelations(interventionId, survey.id, false);
    });

    // Add new relations
    surveysToAdd.forEach((survey: any) => {
      _updateInterventionSurveyRelations(interventionId, survey.id, true);
    });
  }

  const _updateSurveyIntervention = (surveyId: string, newInterventionId: string | null) => {
    const survey = _surveys[surveyId];
    if (!survey) return;

    const currentInterventionId = survey.intervention?.id;
    
    // Only update if the intervention has changed
    if (currentInterventionId !== newInterventionId) {
      // Remove old relation if exists
      if (currentInterventionId) {
        _updateInterventionSurveyRelations(currentInterventionId, surveyId, false);
      }
      
      // Add new relation if exists
      if (newInterventionId) {
        _updateInterventionSurveyRelations(newInterventionId, surveyId, true);
      }
    }
  }

  const _updateRelationships = (existingRelations: any[], newRelations: any[]) => {
    // Find relations to remove (exist in current but not in new)
    const relationsToRemove = existingRelations.filter(
      existing => !newRelations.some(newRel => 
        newRel?.interventionId === existing?.interventionId && 
        newRel?.levelId === existing?.levelId
      )
    );

    // Find relations to add (exist in new but not in current)
    const relationsToAdd = newRelations.filter(
      newRel => !existingRelations.some(existing => 
        existing?.interventionId === newRel?.interventionId && 
        existing?.levelId === newRel?.levelId
      )
    );

    // Remove old relations
    relationsToRemove.forEach((relation: any) => {
      _updateLevelInterventionRelations(relation.levelId!, relation.interventionId!, false);
    });

    // Add new relations
    relationsToAdd.forEach((relation: any) => {
      _updateLevelInterventionRelations(relation.levelId!, relation.interventionId!, true);
    });
  }

  const loadLevelsFromRemote = async () => {
    try {
      isLoadingLevels.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: listLevels,
    });

    // @ts-ignore
    data.listLevels.items.forEach((level: Level) => {
      _levels[level.id] = level;
        });
    } catch (error: unknown) {
      errorLoadingLevels.value = error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingLevels.value = false;
    }
  }

  const loadInterventionsFromRemote = async () => {
    try {
      isLoadingInterventions.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: listInterventions,
    });

    // @ts-ignore
    data.listInterventions.items.forEach((intervention: Intervention) => {
      _interventions[intervention.id] = intervention;
        });
    } catch (error: unknown) {
      errorLoadingInterventions.value = error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingInterventions.value = false;
    }
  }

  const loadSurveysFromRemote = async () => {
    try {
      isLoadingSurveys.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: listSurveys,
    });

    // @ts-ignore
    data.listSurveys.items.forEach((survey: Survey) => {
      _surveys[survey.id] = survey;
        });
    } catch (error: unknown) {
      errorLoadingSurveys.value = error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingSurveys.value = false;
    }
  }

  const isCreatingLevel = ref(false);
  const createLevel = async (level: Level) => {
    try {
      isCreatingLevel.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: createLevelMutation,
        variables: {
          input: level,
        },
      });
      // @ts-ignore
      _levels[data.createLevel.id] = data.createLevel;

      // Update relationships in offline state
      if (data.createLevel.allowedInterventions?.items) {
        _updateRelationships([], data.createLevel.allowedInterventions.items);
      }
    } catch (error: unknown) {
      throw error;
    } finally {
      isCreatingLevel.value = false;
    }
  }

  const isCreatingIntervention = ref(false);
  const createIntervention = async (intervention: Intervention) => {
    try {
      isCreatingIntervention.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: createInterventionMutation,
        variables: {
          input: intervention,
        },
      });
      // @ts-ignore
      _interventions[data.createIntervention.id] = data.createIntervention;

      // Update relationships in offline state
      if (data.createIntervention.levels?.items) {
        _updateRelationships([], data.createIntervention.levels.items);
      }
      if (data.createIntervention.surveys?.items) {
        _updateInterventionSurveys(data.createIntervention.id, data.createIntervention.surveys.items);
      }
    } catch (error: unknown) {
      throw error;
    } finally {
      isCreatingIntervention.value = false;
    }
  }

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
      // @ts-ignore
      _surveys[data.createSurvey.id] = data.createSurvey;

      // Update relationships in offline state
      if (data.createSurvey.intervention?.id) {
        _updateSurveyIntervention(data.createSurvey.id, data.createSurvey.intervention.id);
      }
    } catch (error: unknown) {
      throw error;
    } finally {
      isCreatingSurvey.value = false;
    }
  }

  const isUpdatingLevel = ref(false);
  const updateLevel = async (level: Level) => {
    try {
      isUpdatingLevel.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: updateLevelMutation,
        variables: {
          input: level,
        },
      });
      
      // Get existing relations before updating the store
      const existingRelations = _levels[level.id]?.allowedInterventions?.items || [];
      
      // Update the store
      // @ts-ignore
      _levels[data.updateLevel.id] = data.updateLevel;

      // Update relationships in offline state
      _updateRelationships(existingRelations, data.updateLevel.allowedInterventions?.items ?? []);
    } catch (error: unknown) {
      throw error;
    } finally {
      isUpdatingLevel.value = false;
    }
  }

  const isUpdatingIntervention = ref(false);
  const updateIntervention = async (intervention: Intervention) => {
    try {
      isUpdatingIntervention.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: updateInterventionMutation,
        variables: {
          input: intervention,
        },
      });
      
      // Get existing relations before updating the store
      const existingRelations = _interventions[intervention.id]?.levels?.items || [];
      const existingSurveys = _interventions[intervention.id]?.surveys?.items || [];
      
      // Update the store
      // @ts-ignore
      _interventions[data.updateIntervention.id] = data.updateIntervention;

      // Update relationships in offline state
      _updateRelationships(existingRelations, data.updateIntervention.levels?.items ?? []);
      _updateInterventionSurveys(intervention.id, data.updateIntervention.surveys?.items ?? []);
    } catch (error: unknown) {
      throw error;
    } finally {
      isUpdatingIntervention.value = false;
    }
  }

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
      
      // Get existing intervention before updating the store
      const existingIntervention = _surveys[survey.id]?.intervention;
      
      // Update the store
      // @ts-ignore
      _surveys[data.updateSurvey.id] = data.updateSurvey;

      // Update relationships in offline state
      _updateSurveyIntervention(survey.id, data.updateSurvey.intervention?.id ?? null);
    } catch (error: unknown) {
      throw error;
    } finally {
      isUpdatingSurvey.value = false;
    }
  }

  const getLevelById = (id: string) => {
    return _levels[id];
  }

  const getInterventionById = (id: string) => {
    return _interventions[id];
  }

  const getSurveyById = (id: string) => {
    return _surveys[id];
  }

  const levelsSortedByHierarchy = computed(() => {
    //return levels ordered by (no parent id -> parent id of previous element -> ....)
    const levelsArray = Object.values(_levels);
    const toReturn: Level[] = [];
    const levelsWithoutParent = levelsArray.filter((level) => level.parentLevelID === null);
    toReturn.push(...levelsWithoutParent);
    while (toReturn.length < levelsArray.length) {
      const lastLevel = toReturn[toReturn.length - 1];
      const nextLevel = levelsArray.find((level) => level.parentLevelID === lastLevel.id);
      if (nextLevel) {
        toReturn.push(nextLevel);
      }
      else {
        break;
      }
    }
    return toReturn;
  })

  const interventions = computed(() => {
    return Object.values(_interventions);
  })

  const surveys = computed(() => {
    return Object.values(_surveys);
  })

  const isLoading = computed(() => {
    return isLoadingLevels.value || isLoadingInterventions.value || isLoadingSurveys.value;
  })

  const initialize = async () => {
    await Promise.all([
      loadLevelsFromRemote(),
      loadInterventionsFromRemote(),
      loadSurveysFromRemote()
    ]);
  }

  onMounted(async () => {
    initialize();
  })

  const getInterventionsByLevel = (levelId: string): Intervention[] => {
    const level = _levels[levelId];
    if (!level) return [];

    return level.allowedInterventions?.items
      ?.map(relation => _interventions[relation?.interventionId!])
      .filter((intervention): intervention is Intervention => intervention !== undefined) ?? [];
  }

  const getSurveysByIntervention = (interventionId: string): Survey[] => {
    const intervention = _interventions[interventionId];
    if (!intervention) return [];

    return intervention.surveys?.items
      ?.map(survey => _surveys[survey?.id!])
      .filter((survey): survey is Survey => survey !== undefined) ?? [];
  }

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
    createIntervention,
    isCreatingIntervention,
    isLoadingInterventions,
    errorLoadingInterventions,
    loadInterventionsFromRemote,
    getInterventionById,
    interventions,
    updateIntervention,
    isUpdatingIntervention,
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
  }
})

