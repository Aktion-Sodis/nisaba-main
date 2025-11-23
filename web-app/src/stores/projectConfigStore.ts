import { GraphQLResult } from '@aws-amplify/api';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, reactive, ref } from 'vue';

import {
  Level,
  Intervention,
  Survey,
  Entity,
  UpdateSurveyInput,
  CreateSurveyInput,
  UpdateInterventionInput,
  CreateInterventionInput,
  UpdateLevelInput,
  CreateLevelInput,
  UpdateEntityInput,
  CreateEntityInput,
} from '@/API';
import {
  createLevel as createLevelMutation,
  updateLevel as updateLevelMutation,
  createIntervention as createInterventionMutation,
  updateIntervention as updateInterventionMutation,
  createEntity as createEntityMutation,
  updateEntity as updateEntityMutation,
  createLevelInterventionRelation as createLevelInterventionRelationMutation,
  deleteLevelInterventionRelation as deleteLevelInterventionRelationMutation,
  deleteLevel as deleteLevelMutation,
  deleteIntervention as deleteInterventionMutation,
} from '@/graphql/mutations';
import { listLevels, listInterventions, listEntities } from '@/graphql/queries';
import i18n from '@/i18n';
import { amplifyDataClient } from '@/utils/amplifyDataClient';
import { cleanObjectForGraphQL } from '@/utils/objectCleaner';

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
        _version
        _deleted
      }
      nextToken
      startedAt
    }
  }
`;

export interface MinimalLevelInterventionRelation {
  id: string;
  levelId: string;
  interventionId: string;
  _deleted?: boolean;
  _version?: number;
}

interface MinimalLevelInterventionRelationConnection {
  items: MinimalLevelInterventionRelation[];
  nextToken: string | null;
  startedAt: number | null;
}

interface MinimalLevelInterventionRelationsResponse {
  listLevelInterventionRelations: MinimalLevelInterventionRelationConnection;
}

export interface StoreLevel extends Omit<Level, 'allowedInterventions'> {}
export interface StoreIntervention extends Omit<Intervention, 'levels'> {}
export interface StoreEntity
  extends Omit<Entity, 'level' | 'appliedInterventions'> {}

// Custom minimal mutation for creating a survey (does not request intervention field)
const createSurveyMinimalMutation = /* GraphQL */ `
  mutation CreateSurveyMinimal(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
      id
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      questions {
        id
        text {
          languageKeys
          languageTexts
        }
        type
        questionOptions {
          id
          text {
            languageKeys
            languageTexts
          }
          followUpQuestionIDs
        }
        isFollowUpQuestion
      }
      surveyType
      status
      schemeVersion
      archived
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
    }
  }
`;

const updateSurveyMinimalMutation = /* GraphQL */ `
  mutation UpdateSurveyMinimal(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
      id
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      questions {
        id
        text {
          languageKeys
          languageTexts
        }
        type
        questionOptions {
          id
          text {
            languageKeys
            languageTexts
          }
          followUpQuestionIDs
        }
        isFollowUpQuestion
      }
      surveyType
      status
      schemeVersion
      archived
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
    }
  }
`;

const deleteSurveyMinimalMutation = /* GraphQL */ `
  mutation DeleteSurveyMinimal(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
      id
    }
  }
`;

const listSurveysMinimal = /* GraphQL */ `
  query ListSurveysMinimal(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name {
          languageKeys
          languageTexts
          __typename
        }
        description {
          languageKeys
          languageTexts
          __typename
        }
        questions {
          id
          text {
            languageKeys
            languageTexts
            __typename
          }
          type
          questionOptions {
            id
            text {
              languageKeys
              languageTexts
              __typename
            }
            followUpQuestionIDs
            __typename
          }
          isFollowUpQuestion
          __typename
        }
        surveyType
        status
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

// Minimal queries to fetch only version information
const getLevelVersion = /* GraphQL */ `
  query GetLevelVersion($id: ID!) {
    getLevel(id: $id) {
      id
      _version
      _lastChangedAt
      __typename
    }
  }
`;

const getInterventionVersion = /* GraphQL */ `
  query GetInterventionVersion($id: ID!) {
    getIntervention(id: $id) {
      id
      _version
      _lastChangedAt
      __typename
    }
  }
`;

const getSurveyVersion = /* GraphQL */ `
  query GetSurveyVersion($id: ID!) {
    getSurvey(id: $id) {
      id
      _version
      _lastChangedAt
      __typename
    }
  }
`;

const getEntityVersion = /* GraphQL */ `
  query GetEntityVersion($id: ID!) {
    getEntity(id: $id) {
      id
      _version
      _lastChangedAt
      __typename
    }
  }
`;

export const useProjectConfigStore = defineStore('projectConfig', () => {
  const toast = useToast();
  const _levels = reactive<Record<string, StoreLevel>>({});
  const _interventions = reactive<Record<string, StoreIntervention>>({});
  const _surveys = reactive<Record<string, Survey>>({});
  const _entities = reactive<Record<string, StoreEntity>>({});
  const _levelInterventionRelations = reactive<
    Record<
      string,
      { id: string; levelId: string; interventionId: string; _version?: number }
    >
  >({});

  const isLoadingLevels = ref(false);
  const isLoadingInterventions = ref(false);
  const isLoadingSurveys = ref(false);
  const isLoadingEntities = ref(false);
  const isLoadingRelations = ref(false);
  const errorLoadingLevels = ref<string | null>(null);
  const errorLoadingInterventions = ref<string | null>(null);
  const errorLoadingSurveys = ref<string | null>(null);
  const errorLoadingEntities = ref<string | null>(null);
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
            filter: {
              _deleted: {
                ne: true,
              },
            },
            nextToken,
          },
        })) as GraphQLResult<{
          listLevels: { items: Level[]; nextToken: string | null };
        }>;

        result.data.listLevels.items.forEach((level: Level) => {
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
            filter: {
              _deleted: {
                ne: true,
              },
            },
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
          query: listSurveysMinimal,
          variables: {
            filter: {
              _deleted: {
                ne: true,
              },
            },
            nextToken,
          },
        })) as GraphQLResult<{
          listSurveys: { items: Survey[]; nextToken: string | null };
        }>;

        result.data.listSurveys.items.forEach((survey: Survey) => {
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

  const loadEntitiesFromRemote = async () => {
    try {
      isLoadingEntities.value = true;
      let nextToken: string | null = null;

      do {
        const result = (await amplifyDataClient.graphql({
          query: listEntities,
          variables: {
            filter: {
              _deleted: {
                ne: true,
              },
            },
            nextToken,
          },
        })) as GraphQLResult<any>;

        result.data.listEntities.items.forEach((entity: Entity) => {
          const {
            level: _level,
            appliedInterventions: _appliedInterventions,
            ...entityWithoutRelations
          } = entity;
          _entities[entity.id] = entityWithoutRelations as StoreEntity;
        });

        nextToken = result.data.listEntities.nextToken;
      } while (nextToken);
    } catch (error: unknown) {
      errorLoadingEntities.value =
        error instanceof Error ? error.message : String(error);
    } finally {
      isLoadingEntities.value = false;
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
            filter: {
              _deleted: {
                ne: true,
              },
            },
            nextToken,
          },
        })) as GraphQLResult<MinimalLevelInterventionRelationsResponse>;

        if (!result.data) {
          throw new Error('No data returned from GraphQL query');
        }

        result.data.listLevelInterventionRelations.items.forEach((relation) => {
          _levelInterventionRelations[relation.id] = {
            id: relation.id,
            levelId: relation.levelId,
            interventionId: relation.interventionId,
            _version: relation._version,
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

      // Filter level to only include fields allowed in CreateLevelInput
      const filteredInput = Object.fromEntries(
        Object.entries(level).filter(([key]) => isCreateLevelInputKey(key))
      ) as unknown as CreateLevelInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: createLevelMutation,
        variables: {
          input,
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

      // Filter intervention to only include fields allowed in CreateInterventionInput
      const filteredInput = Object.fromEntries(
        Object.entries(intervention).filter(([key]) =>
          isCreateInterventionInputKey(key)
        )
      ) as unknown as CreateInterventionInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: createInterventionMutation,
        variables: {
          input,
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
  const isUpdateSurveyInputKey = (
    key: string
  ): key is keyof UpdateSurveyInput => {
    return (
      key === 'id' ||
      key === 'name' ||
      key === 'description' ||
      key === 'questions' ||
      key === 'surveyType' ||
      key === 'status' ||
      key === 'schemeVersion' ||
      key === 'archived' ||
      key === '_version' ||
      key === 'interventionSurveysId'
    );
  };

  const isCreateSurveyInputKey = (
    key: string
  ): key is keyof CreateSurveyInput => {
    return (
      key === 'name' ||
      key === 'description' ||
      key === 'questions' ||
      key === 'surveyType' ||
      key === 'status' ||
      key === 'schemeVersion' ||
      key === 'archived' ||
      key === 'id' ||
      key === '_version' ||
      key === 'interventionSurveysId'
    );
  };

  const isUpdateInterventionInputKey = (
    key: string
  ): key is keyof UpdateInterventionInput => {
    return (
      key === 'id' ||
      key === 'name' ||
      key === 'description' ||
      key === 'interventionType' ||
      key === 'schemeVersion' ||
      key === '_version'
    );
  };

  const isCreateInterventionInputKey = (
    key: string
  ): key is keyof CreateInterventionInput => {
    return (
      key === 'name' ||
      key === 'description' ||
      key === 'interventionType' ||
      key === 'schemeVersion' ||
      key === 'id' ||
      key === '_version'
    );
  };

  const isUpdateLevelInputKey = (key: string): boolean => {
    return (
      key === 'id' ||
      key === 'name' ||
      key === 'description' ||
      key === 'parentLevelID' ||
      key === 'interventionsAreAllowed' ||
      key === 'customData' ||
      key === 'schemeVersion' ||
      key === '_version'
    );
  };

  const isCreateLevelInputKey = (key: string): boolean => {
    return (
      key === 'name' ||
      key === 'description' ||
      key === 'parentLevelID' ||
      key === 'interventionsAreAllowed' ||
      key === 'customData' ||
      key === 'schemeVersion' ||
      key === 'id' ||
      key === '_version'
    );
  };

  const isUpdateEntityInputKey = (
    key: string
  ): key is keyof UpdateEntityInput => {
    return (
      key === 'id' ||
      key === 'name' ||
      key === 'description' ||
      key === 'parentEntityID' ||
      key === 'location' ||
      key === 'customData' ||
      key === 'schemeVersion' ||
      key === '_version' ||
      key === 'entityLevelId'
    );
  };

  const isCreateEntityInputKey = (
    key: string
  ): key is keyof CreateEntityInput => {
    return (
      key === 'name' ||
      key === 'description' ||
      key === 'parentEntityID' ||
      key === 'location' ||
      key === 'customData' ||
      key === 'schemeVersion' ||
      key === 'id' ||
      key === '_version' ||
      key === 'entityLevelId'
    );
  };

  const createSurvey = async (survey: Survey) => {
    try {
      isCreatingSurvey.value = true;
      const filteredInput = Object.fromEntries(
        Object.entries(survey).filter(([key]) => isCreateSurveyInputKey(key))
      ) as unknown as CreateSurveyInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);
      const result = (await amplifyDataClient.graphql({
        query: createSurveyMinimalMutation,
        variables: {
          input,
        },
      })) as GraphQLResult<any>;
      const data = result.data;
      if (!data || !data.createSurvey)
        throw new Error('Survey creation failed');
      _surveys[data.createSurvey.id] = data.createSurvey;

      // Update relationships in offline state
      if (data.createSurvey.interventionSurveysId) {
        _updateSurveyIntervention(
          data.createSurvey.id,
          data.createSurvey.interventionSurveysId
        );
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isCreatingSurvey.value = false;
    }
  };

  // Helper function to fetch current version of a level
  const fetchLevelVersion = async (
    levelId: string
  ): Promise<{ _version: number; _lastChangedAt: number }> => {
    try {
      const result = await amplifyDataClient.graphql({
        query: getLevelVersion,
        variables: { id: levelId },
      });
      const data = (result as GraphQLResult<any>).data;
      return {
        _version: data.getLevel._version,
        _lastChangedAt: data.getLevel._lastChangedAt,
      };
    } catch (error: unknown) {
      console.error('Error fetching level version:', error);
      throw error;
    }
  };

  // Helper function to fetch current version of an intervention
  const fetchInterventionVersion = async (
    interventionId: string
  ): Promise<{ _version: number; _lastChangedAt: number }> => {
    try {
      const result = await amplifyDataClient.graphql({
        query: getInterventionVersion,
        variables: { id: interventionId },
      });
      const data = (result as GraphQLResult<any>).data;
      return {
        _version: data.getIntervention._version,
        _lastChangedAt: data.getIntervention._lastChangedAt,
      };
    } catch (error: unknown) {
      console.error('Error fetching intervention version:', error);
      throw error;
    }
  };

  // Helper function to fetch current version of a survey
  const fetchSurveyVersion = async (
    surveyId: string
  ): Promise<{ _version: number; _lastChangedAt: number }> => {
    try {
      const result = await amplifyDataClient.graphql({
        query: getSurveyVersion,
        variables: { id: surveyId },
      });
      const data = (result as GraphQLResult<any>).data;
      return {
        _version: data.getSurvey._version,
        _lastChangedAt: data.getSurvey._lastChangedAt,
      };
    } catch (error: unknown) {
      console.error('Error fetching survey version:', error);
      throw error;
    }
  };

  // Helper function to fetch current version of an entity
  const fetchEntityVersion = async (
    entityId: string
  ): Promise<{ _version: number; _lastChangedAt: number }> => {
    try {
      const result = await amplifyDataClient.graphql({
        query: getEntityVersion,
        variables: { id: entityId },
      });
      const data = (result as GraphQLResult<any>).data;
      return {
        _version: data.getEntity._version,
        _lastChangedAt: data.getEntity._lastChangedAt,
      };
    } catch (error: unknown) {
      console.error('Error fetching entity version:', error);
      throw error;
    }
  };

  const isUpdatingLevel = ref(false);
  const updateLevel = async (level: StoreLevel) => {
    try {
      isUpdatingLevel.value = true;

      // Fetch current version to avoid conflicts
      const currentVersion = await fetchLevelVersion(level.id);

      // Update the level with the current version
      const levelWithCurrentVersion = {
        ...level,
        _version: currentVersion._version,
      };

      // Filter level to only include fields allowed in UpdateLevelInput
      const filteredInput = Object.fromEntries(
        Object.entries(levelWithCurrentVersion).filter(([key]) =>
          isUpdateLevelInputKey(key)
        )
      ) as unknown as UpdateLevelInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: updateLevelMutation,
        variables: {
          input,
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

      // Fetch current version to avoid conflicts
      const currentVersion = await fetchInterventionVersion(intervention.id);

      // Update the intervention with the current version
      const interventionWithCurrentVersion = {
        ...intervention,
        _version: currentVersion._version,
      };

      // Filter intervention to only include fields allowed in UpdateInterventionInput
      const filteredInput = Object.fromEntries(
        Object.entries(interventionWithCurrentVersion).filter(([key]) =>
          isUpdateInterventionInputKey(key)
        )
      ) as unknown as UpdateInterventionInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: updateInterventionMutation,
        variables: {
          input,
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

      // Fetch current version to avoid conflicts
      const currentVersion = await fetchSurveyVersion(survey.id);

      // Update the survey with the current version
      const surveyWithCurrentVersion = {
        ...survey,
        _version: currentVersion._version,
      };

      const filteredInput = Object.fromEntries(
        Object.entries(surveyWithCurrentVersion).filter(([key]) =>
          isUpdateSurveyInputKey(key)
        )
      ) as unknown as UpdateSurveyInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const result = (await amplifyDataClient.graphql({
        query: updateSurveyMinimalMutation,
        variables: {
          input,
        },
      })) as GraphQLResult<any>;
      const data = result.data;
      if (!data || !data.updateSurvey) throw new Error('Survey update failed');

      // Update the store
      _surveys[data.updateSurvey.id] = data.updateSurvey;

      // Update relationships in offline state
      if (data.updateSurvey.interventionSurveysId) {
        _updateSurveyIntervention(
          survey.id,
          data.updateSurvey.interventionSurveysId
        );
      } else {
        _updateSurveyIntervention(survey.id, null);
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isUpdatingSurvey.value = false;
    }
  };

  const isDeletingSurvey = ref(false);
  const deleteSurvey = async (surveyId: string) => {
    try {
      isDeletingSurvey.value = true;

      // Pre-delete check: Only allow deletion of draft surveys
      const survey = _surveys[surveyId];
      if (!survey) {
        throw new Error('Survey not found');
      }
      if (survey.status !== 'DRAFT') {
        throw new Error('Only draft surveys can be deleted');
      }

      await amplifyDataClient.graphql({
        query: deleteSurveyMinimalMutation,
        variables: {
          input: {
            id: surveyId,
            _version: survey._version,
          },
        },
      });
      delete _surveys[surveyId];

      // Show success toast
      toast.add({
        severity: 'success',
        summary: i18n.global.t('surveys.toasts.deleteSuccess.summary'),
        detail: i18n.global.t('surveys.toasts.deleteSuccess.detail'),
        life: 3000,
      });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        if (error.message === 'Only draft surveys can be deleted') {
          toast.add({
            severity: 'error',
            summary: i18n.global.t('surveys.toasts.deleteNotAllowed.summary'),
            detail: i18n.global.t('surveys.toasts.deleteNotAllowed.detail'),
            life: 5000,
          });
        } else {
          toast.add({
            severity: 'error',
            summary: i18n.global.t('surveys.toasts.deleteError.summary'),
            detail: i18n.global.t('surveys.toasts.deleteError.detail'),
            life: 5000,
          });
        }
      } else {
        toast.add({
          severity: 'error',
          summary: i18n.global.t('surveys.toasts.deleteError.summary'),
          detail: i18n.global.t('surveys.toasts.deleteError.detail'),
          life: 5000,
        });
      }
    } finally {
      isDeletingSurvey.value = false;
    }
  };

  const isCreatingEntity = ref(false);
  const createEntity = async (entity: StoreEntity) => {
    try {
      isCreatingEntity.value = true;

      // Filter entity to only include fields allowed in CreateEntityInput
      const filteredInput = Object.fromEntries(
        Object.entries(entity).filter(([key]) => isCreateEntityInputKey(key))
      ) as unknown as CreateEntityInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: createEntityMutation,
        variables: {
          input,
        },
      });
      const {
        level: _level,
        appliedInterventions: _appliedInterventions,
        ...entityWithoutRelations
      } = data.createEntity;
      _entities[entityWithoutRelations.id] =
        entityWithoutRelations as StoreEntity;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isCreatingEntity.value = false;
    }
  };

  const isUpdatingEntity = ref(false);
  const updateEntity = async (entity: StoreEntity) => {
    try {
      isUpdatingEntity.value = true;

      // Fetch current version to avoid conflicts
      const currentVersion = await fetchEntityVersion(entity.id);

      // Update the entity with the current version
      const entityWithCurrentVersion = {
        ...entity,
        _version: currentVersion._version,
      };

      // Filter entity to only include fields allowed in UpdateEntityInput
      const filteredInput = Object.fromEntries(
        Object.entries(entityWithCurrentVersion).filter(([key]) =>
          isUpdateEntityInputKey(key)
        )
      ) as unknown as UpdateEntityInput;

      // Clean nested objects (remove __typename, etc.)
      const input = cleanObjectForGraphQL(filteredInput);

      const { data } = await amplifyDataClient.graphql({
        query: updateEntityMutation,
        variables: {
          input,
        },
      });
      const {
        level: _level,
        appliedInterventions: _appliedInterventions,
        ...entityWithoutRelations
      } = data.updateEntity;
      _entities[entityWithoutRelations.id] =
        entityWithoutRelations as StoreEntity;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    } finally {
      isUpdatingEntity.value = false;
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

  const getEntityById = (id: string) => {
    return _entities[id];
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

  const entities = computed(() => {
    return Object.values(_entities);
  });

  const isLoading = computed(() => {
    return (
      isLoadingLevels.value ||
      isLoadingInterventions.value ||
      isLoadingSurveys.value ||
      isLoadingEntities.value
    );
  });

  const initialize = async () => {
    await Promise.all([
      loadLevelsFromRemote(),
      loadInterventionsFromRemote(),
      loadSurveysFromRemote(),
      loadEntitiesFromRemote(),
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
        _version: data.createLevelInterventionRelation._version,
      };
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  const deleteLevelInterventionRelation = async (relationId: string) => {
    try {
      const relation = _levelInterventionRelations[relationId];
      if (!relation) {
        throw new Error(`Relation with id ${relationId} not found`);
      }

      await amplifyDataClient.graphql({
        query: deleteLevelInterventionRelationMutation,
        variables: {
          input: {
            id: relationId,
            _version: relation._version,
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
    Object.keys(_entities).forEach((key) => delete _entities[key]);
    Object.keys(_levelInterventionRelations).forEach(
      (key) => delete _levelInterventionRelations[key]
    );
    isLoadingLevels.value = false;
    isLoadingInterventions.value = false;
    isLoadingSurveys.value = false;
    isLoadingEntities.value = false;
    isLoadingRelations.value = false;
    errorLoadingLevels.value = null;
    errorLoadingInterventions.value = null;
    errorLoadingSurveys.value = null;
    errorLoadingEntities.value = null;
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

      // Update the level version in local store after relations change
      // This ensures the local state has the latest version for subsequent updates
      if (relationsToCreate.length > 0 || relationsToDelete.length > 0) {
        try {
          const currentVersion = await fetchLevelVersion(levelId);
          if (_levels[levelId]) {
            _levels[levelId]._version = currentVersion._version;
            _levels[levelId]._lastChangedAt = currentVersion._lastChangedAt;
          }
        } catch (versionError) {
          console.warn(
            'Failed to update level version after relation changes:',
            versionError
          );
          // Don't throw here as the relations were successfully updated
        }
      }
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

      // Update the intervention version in local store after relations change
      // This ensures the local state has the latest version for subsequent updates
      if (relationsToCreate.length > 0 || relationsToDelete.length > 0) {
        try {
          const currentVersion = await fetchInterventionVersion(interventionId);
          if (_interventions[interventionId]) {
            _interventions[interventionId]._version = currentVersion._version;
            _interventions[interventionId]._lastChangedAt =
              currentVersion._lastChangedAt;
          }
        } catch (versionError) {
          console.warn(
            'Failed to update intervention version after relation changes:',
            versionError
          );
          // Don't throw here as the relations were successfully updated
        }
      }
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
    fetchLevelVersion,
    fetchInterventionVersion,
    fetchSurveyVersion,
    fetchEntityVersion,
    deleteSurvey,
    isDeletingSurvey,
    createEntity,
    isCreatingEntity,
    isLoadingEntities,
    errorLoadingEntities,
    loadEntitiesFromRemote,
    getEntityById,
    entities,
    updateEntity,
    isUpdatingEntity,
  };
});
