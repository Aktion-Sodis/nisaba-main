import { get } from 'aws-amplify/api';
//import { fetchAuthSession } from 'aws-amplify/auth';
import { defineStore } from 'pinia';
import { computed, reactive, ref, readonly } from 'vue';

import { useAuthStore } from './auth';
import { useProjectConfigStore } from './projectConfigStore';

import {
  Survey,
  SurveyStatus,
  Entity,
  ExecutedSurvey,
  QuestionOption,
  I18nString,
  ListExecutedSurveysQueryVariables,
} from '@/API';
import { listExecutedSurveys } from '@/graphql/queries';
import { amplifyDataClient } from '@/utils/amplifyDataClient';

// Types for the new server-side aggregated analytics data structure
export interface AnalyticsFilter {
  startDate?: string;
  endDate?: string;
  entities?: string[];
  executors?: string[];
  north?: number;
  south?: number;
  east?: number;
  west?: number;
}

export interface AnswerRecord {
  answer_date: string | null;
  executed_survey_id: string;
  answer_value: any;
  entity_id: string | null;
  entity_name: I18nString | null; // Now full I18nString
  executor: string;
  location: {
    latitude: number | null;
    longitude: number | null;
  } | null;
  metadata: {
    applied_intervention_id: string | null;
    organization_id: string | null;
  };
}

export interface QuestionAnalytics {
  total_answers: number;
  unique_entities: number;
  date_range: {
    earliest: string | null;
    latest: string | null;
  };
  statistics?: {
    mean?: number;
    median?: number;
    min?: number;
    max?: number;
    range?: number;
    std_deviation?: number;
    total_responses?: number;
    option_counts?: Record<string, number>;
    average_text_length?: number;
    longest_response?: number;
    shortest_response?: number;
    total_files?: number;
    file_types?: Record<string, number>;
    // Rating-specific fields from middleware
    rating_counts?: Record<string, number>;
  };
  chart_data?: {
    histogram?: {
      bins: number[];
      counts: number[];
    };
    bar_chart?: {
      labels: I18nString[]; // Full I18nString objects
      y: number[];
    };
    pie_chart?: {
      labels: I18nString[]; // Full I18nString objects
      values: number[];
    };
  };
}

export interface RawData {
  text_responses?: Array<{
    text: string;
    date: string | null;
    entity: I18nString | null; // Full I18nString
    executor: string;
    executed_survey_id: string;
    location: {
      latitude: number | null;
      longitude: number | null;
    } | null;
  }>;
  file_paths?: Array<{
    path: string;
    date: string | null;
    entity: I18nString | null; // Full I18nString
    executor: string;
    executed_survey_id: string;
    file_type: string;
    location: {
      latitude: number | null;
      longitude: number | null;
    } | null;
  }>;
}

export interface QuestionData {
  question_id: string;
  question_text: I18nString;
  question_type: string;
  question_options: QuestionOption[];
  answers: AnswerRecord[];
  analytics: QuestionAnalytics;
  raw_data?: RawData;
}

export interface AnalyticsResponse {
  dataset: QuestionData[];
  entities: Entity[];
  levels: any[];
}

export const useAnalyticsStore = defineStore('analytics', () => {
  // Store state
  const selectedSurvey = ref<Survey | null>(null);
  const selectedExecutedSurvey = ref<string | null>(null);
  const analyticsData = ref<AnalyticsResponse | null>(null);
  const surveyExecutedCounts = ref<Map<string, number>>(new Map());

  // New state for executed surveys
  const executedSurveysData = ref<ExecutedSurvey[]>([]);
  const isLoadingExecutedSurveys = ref(false);
  const errorExecutedSurveys = ref<string | null>(null);

  // Filter state - now applied server-side
  const filters = reactive<AnalyticsFilter>({});

  // Loading states
  const isLoadingAnalyticsData = ref(false);
  const isLoadingExecutedCounts = ref(false);
  const errorAnalyticsData = ref<string | null>(null);
  const errorExecutedCounts = ref<string | null>(null);

  // Get project config store and auth store
  const projectConfigStore = useProjectConfigStore();
  const authStore = useAuthStore();

  // Computed getters
  const availableSurveys = computed(() => {
    return projectConfigStore.surveys.filter(
      (survey) =>
        survey.status === SurveyStatus.ACTIVE ||
        survey.status === SurveyStatus.ARCHIVED
    );
  });

  const availableEntities = computed(() => {
    return analyticsData.value?.entities || [];
  });

  const availableLevels = computed(() => {
    return analyticsData.value?.levels || [];
  });

  const questions = computed(() => {
    return analyticsData.value?.dataset || [];
  });

  // Remove the old executedSurveys computed property that was reconstructing data

  // New computed getter for filtered executed surveys
  const filteredExecutedSurveys = computed(() => {
    if (!executedSurveysData.value.length) return [];

    // Apply filters to the stored executed surveys data
    let filtered = executedSurveysData.value;

    if (filters.startDate) {
      filtered = filtered.filter((survey) => survey.date >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter((survey) => survey.date <= filters.endDate!);
    }

    if (filters.entities && filters.entities.length > 0) {
      filtered = filtered.filter(
        (survey) =>
          survey.appliedIntervention?.entityAppliedInterventionsId &&
          filters.entities!.includes(
            survey.appliedIntervention.entityAppliedInterventionsId
          )
      );
    }

    if (filters.executors && filters.executors.length > 0) {
      filtered = filtered.filter(
        (survey) =>
          survey.whoExecutedIt &&
          filters.executors!.includes(survey.whoExecutedIt.id)
      );
    }

    if (
      filters.north !== undefined ||
      filters.south !== undefined ||
      filters.east !== undefined ||
      filters.west !== undefined
    ) {
      filtered = filtered.filter((survey) => {
        if (!survey.location) return false;

        const lat = survey.location.latitude;
        const lng = survey.location.longitude;

        if (
          lat === null ||
          lat === undefined ||
          lng === null ||
          lng === undefined
        )
          return false;

        if (filters.north !== undefined && lat > filters.north) return false;
        if (filters.south !== undefined && lat < filters.south) return false;
        if (filters.east !== undefined && lng > filters.east) return false;
        if (filters.west !== undefined && lng < filters.west) return false;

        return true;
      });
    }

    return filtered;
  });

  const uniqueExecutors = computed(() => {
    if (!analyticsData.value?.dataset) return [];
    const executors = new Set<string>();
    analyticsData.value.dataset.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.executor) executors.add(answer.executor);
      });
    });
    return Array.from(executors);
  });

  const uniqueQuestionTypes = computed(() => {
    if (!analyticsData.value?.dataset) return [];
    return [
      ...new Set(analyticsData.value.dataset.map((q) => q.question_type)),
    ];
  });

  // Actions
  const selectSurvey = async (surveyId: string) => {
    const survey = availableSurveys.value.find((s) => s.id === surveyId);
    if (!survey) {
      throw new Error('Survey not found');
    }

    selectedSurvey.value = survey;
    selectedExecutedSurvey.value = null;

    // Load both analytics data and executed surveys in parallel
    await Promise.all([
      loadAnalyticsData(surveyId),
      loadExecutedSurveys(surveyId),
    ]);
  };

  const selectExecutedSurvey = (executedSurveyId: string) => {
    selectedExecutedSurvey.value = executedSurveyId;
  };

  const updateFilters = async (newFilters: Partial<AnalyticsFilter>) => {
    Object.assign(filters, newFilters);

    // If a survey is selected, reload both data types
    if (selectedSurvey.value) {
      await Promise.all([
        loadAnalyticsData(selectedSurvey.value.id),
        loadExecutedSurveys(selectedSurvey.value.id),
      ]);
    }
  };

  const clearFilters = async () => {
    Object.keys(filters).forEach((key) => {
      delete (filters as any)[key];
    });

    // If a survey is selected, reload both data types
    if (selectedSurvey.value) {
      await Promise.all([
        loadAnalyticsData(selectedSurvey.value.id),
        loadExecutedSurveys(selectedSurvey.value.id),
      ]);
    }
  };

  const loadAnalyticsData = async (surveyId: string) => {
    isLoadingAnalyticsData.value = true;
    errorAnalyticsData.value = null;

    try {
      //const options = await getAuthorizationHeader();

      // Build query parameters with filters

      if (!authStore.organizationId) {
        throw new Error('Organization ID not available');
      }

      const queryParams: Record<string, string> = {
        SurveyID: surveyId,
        OrganizationID: authStore.organizationId,
      };

      if (filters.startDate) queryParams.startDate = filters.startDate;
      if (filters.endDate) queryParams.endDate = filters.endDate;
      if (filters.entities && filters.entities.length > 0) {
        queryParams.entities = filters.entities.join(',');
      }
      if (filters.executors && filters.executors.length > 0) {
        queryParams.executors = filters.executors.join(',');
      }
      if (filters.north !== undefined)
        queryParams.north = filters.north.toString();
      if (filters.south !== undefined)
        queryParams.south = filters.south.toString();
      if (filters.east !== undefined)
        queryParams.east = filters.east.toString();
      if (filters.west !== undefined)
        queryParams.west = filters.west.toString();

      const response = await get({
        apiName: 'analyticsApi',
        path: '/analytics/getAggregatedSurveyDataById',
        options: {
          //...options,
          queryParams,
        },
      });

      const responseData = await response.response;
      const data = await responseData.body.json();

      if (data && typeof data === 'object' && 'dataset' in data) {
        analyticsData.value = data as unknown as AnalyticsResponse;
      } else {
        throw new Error('Invalid response format from analytics API');
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      errorAnalyticsData.value =
        error instanceof Error
          ? error.message
          : 'Failed to load analytics data';
      analyticsData.value = null;
    } finally {
      isLoadingAnalyticsData.value = false;
    }
  };

  // New action to load executed surveys with pagination
  const loadExecutedSurveys = async (surveyId: string) => {
    if (!surveyId) return;

    isLoadingExecutedSurveys.value = true;
    errorExecutedSurveys.value = null;

    try {
      let nextToken: string | null = null;
      const allExecutedSurveys: ExecutedSurvey[] = [];

      do {
        const variables: ListExecutedSurveysQueryVariables = {
          filter: {
            executedSurveySurveyId: { eq: surveyId },
          },
          nextToken,
        };

        const response = await amplifyDataClient.graphql({
          query: listExecutedSurveys,
          variables,
        });

        if (response.data?.listExecutedSurveys?.items) {
          const items = response.data.listExecutedSurveys
            .items as ExecutedSurvey[];
          allExecutedSurveys.push(...items);
        }

        nextToken = response.data?.listExecutedSurveys?.nextToken || null;
      } while (nextToken);

      executedSurveysData.value = allExecutedSurveys;
    } catch (error) {
      console.error('Error loading executed surveys:', error);
      errorExecutedSurveys.value =
        error instanceof Error
          ? error.message
          : 'Failed to load executed surveys';
      executedSurveysData.value = [];
    } finally {
      isLoadingExecutedSurveys.value = false;
    }
  };

  const loadExecutedSurveyCounts = async () => {
    isLoadingExecutedCounts.value = true;
    errorExecutedCounts.value = null;

    try {
      // Get organization ID from auth store
      const organizationId = authStore.organizationId;
      if (!organizationId) {
        throw new Error('Organization ID not available');
      }

      //const options = await getAuthorizationHeader();

      const countsResponse = await get({
        apiName: 'analyticsApi',
        path: '/analytics/getExecutedSurveyCountsForOrganization',
        options: {
          queryParams: {
            organizationID: organizationId,
          },
          //...options,
        },
      });

      const countsData = await countsResponse.response;
      const countsResult = await countsData.body.json();

      if (
        countsData.statusCode !== 200 ||
        !countsResult ||
        typeof countsResult !== 'object' ||
        !('res' in countsResult)
      ) {
        throw new Error('Failed to get executed survey counts');
      }

      // Convert the result to a Map
      const counts: Map<string, number> = new Map();
      if (countsResult.res && typeof countsResult.res === 'object') {
        Object.entries(countsResult.res).forEach(([surveyId, count]) => {
          counts.set(surveyId, count as number);
        });
      }

      surveyExecutedCounts.value = counts;
    } catch (error) {
      console.error('Error loading executed survey counts:', error);
      errorExecutedCounts.value =
        error instanceof Error
          ? error.message
          : 'Failed to load executed survey counts';
      surveyExecutedCounts.value = new Map();
    } finally {
      isLoadingExecutedCounts.value = false;
    }
  };

  /*const getAuthorizationHeader = async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) {
      throw new Error('No access token available');
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };*/

  const reset = () => {
    selectedSurvey.value = null;
    selectedExecutedSurvey.value = null;
    analyticsData.value = null;
    surveyExecutedCounts.value = new Map();
    executedSurveysData.value = []; // Clear executed surveys data
    clearFilters();
    errorAnalyticsData.value = null;
    errorExecutedCounts.value = null;
    errorExecutedSurveys.value = null; // Clear executed surveys error
  };

  // Initialize store by loading executed survey counts
  const initialize = async () => {
    await loadExecutedSurveyCounts();
  };

  return {
    // State
    selectedSurvey: readonly(selectedSurvey),
    selectedExecutedSurvey: readonly(selectedExecutedSurvey),
    analyticsData: readonly(analyticsData),
    surveyExecutedCounts: readonly(surveyExecutedCounts),
    executedSurveysData: readonly(executedSurveysData),
    filters: readonly(filters),
    isLoadingAnalyticsData: readonly(isLoadingAnalyticsData),
    isLoadingExecutedCounts: readonly(isLoadingExecutedCounts),
    isLoadingExecutedSurveys: readonly(isLoadingExecutedSurveys),
    errorAnalyticsData: readonly(errorAnalyticsData),
    errorExecutedCounts: readonly(errorExecutedCounts),
    errorExecutedSurveys: readonly(errorExecutedSurveys),

    // Computed
    availableSurveys,
    availableEntities,
    availableLevels,
    questions,
    filteredExecutedSurveys,
    uniqueExecutors,
    uniqueQuestionTypes,

    // Actions
    selectSurvey,
    selectExecutedSurvey,
    updateFilters,
    clearFilters,
    reset,
    initialize,
    loadExecutedSurveys,
    loadAnalyticsData,
  };
});
