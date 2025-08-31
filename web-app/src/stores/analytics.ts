import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { defineStore } from 'pinia';
import { computed, reactive, ref, readonly } from 'vue';

import { Survey, SurveyStatus, QuestionType, Entity, ExecutedSurvey, QuestionAnswer } from '@/API';
import { useProjectConfigStore } from './projectConfigStore';

// Types for analytics data based on actual middleware response
export interface AnalyticsDataRecord {
  surveyId: string;
  surveyName: string;
  executedSurveyId: string;
  questionId: string;
  answerId: string;
  answerType: string;
  date: string | null;
  executor: string;
  entityId: string | null;
  entityName: string | null;
  latitude: number | null;
  longitude: number | null;
  answerValue: string | number | null;
}

export interface AnalyticsFilter {
  dateRange?: {
    start: string;
    end: string;
  };
  entityIds?: string[];
  executorIds?: string[];
  questionTypes?: QuestionType[];
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in meters
  };
}

export interface ExecutedSurveySummary {
  id: string;
  date: string | null;
  executor: string;
  entityId: string | null;
  entityName: string | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  } | null;
  answerCount: number;
}

export interface QuestionSummary {
  questionId: string;
  questionType: QuestionType;
  answerCount: number;
  uniqueAnswers: (string | number)[];
}

export const useAnalyticsStore = defineStore('analytics', () => {
  // Store state
  const selectedSurvey = ref<Survey | null>(null);
  const selectedExecutedSurvey = ref<string | null>(null);
  const analyticsData = ref<AnalyticsDataRecord[]>([]);
  const executedSurveys = ref<ExecutedSurveySummary[]>([]);
  const questions = ref<QuestionSummary[]>([]);
  
  // Filter state
  const filters = reactive<AnalyticsFilter>({});
  
  // Loading states
  const isLoadingAnalyticsData = ref(false);
  const isLoadingExecutedSurveys = ref(false);
  const errorAnalyticsData = ref<string | null>(null);
  const errorExecutedSurveys = ref<string | null>(null);
  
  // Get project config store
  const projectConfigStore = useProjectConfigStore();
  
  // Computed getters
  const availableSurveys = computed(() => {
    return projectConfigStore.surveys.filter(survey => 
      survey.status === SurveyStatus.ACTIVE || survey.status === SurveyStatus.ARCHIVED
    );
  });
  
  const availableEntities = computed(() => {
    // Extract unique entities from the analytics data
    const entityMap = new Map<string, { id: string; name: string }>();
    analyticsData.value.forEach(record => {
      if (record.entityId && record.entityName) {
        entityMap.set(record.entityId, { id: record.entityId, name: record.entityName });
      }
    });
    return Array.from(entityMap.values());
  });
  
  const availableLevels = computed(() => {
    // For now, return empty array since levels are not directly available in analytics data
    // This could be enhanced later if needed
    return [];
  });
  
  const filteredAnalyticsData = computed(() => {
    let filtered = analyticsData.value;
    
    // Apply date range filter
    if (filters.dateRange?.start && filters.dateRange?.end) {
      filtered = filtered.filter(record => {
        if (!record.date) return false;
        const recordDate = new Date(record.date);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }
    
    // Apply entity filter
    if (filters.entityIds && filters.entityIds.length > 0) {
      filtered = filtered.filter(record => 
        record.entityId && filters.entityIds!.includes(record.entityId)
      );
    }
    
    // Apply executor filter
    if (filters.executorIds && filters.executorIds.length > 0) {
      filtered = filtered.filter(record => 
        filters.executorIds!.includes(record.executor)
      );
    }
    
    // Apply question type filter
    if (filters.questionTypes && filters.questionTypes.length > 0) {
      // We need to map question types to answer types for filtering
      const answerTypeMap: Record<QuestionType, string[]> = {
        [QuestionType.TEXT]: ['TEXT'],
        [QuestionType.SINGLECHOICE]: ['QUESTION_OPTION'],
        [QuestionType.MULTIPLECHOICE]: ['QUESTION_OPTION'],
        [QuestionType.PICTURE]: ['TEXT'],
        [QuestionType.PICTUREWITHTAGS]: ['TEXT'],
        [QuestionType.AUDIO]: ['TEXT'],
        [QuestionType.INT]: ['INT'],
        [QuestionType.DOUBLE]: ['DOUBLE'],
        [QuestionType.RATING]: ['RATING']
      };
      
      const allowedAnswerTypes = filters.questionTypes!.flatMap(type => answerTypeMap[type]);
      filtered = filtered.filter(record => 
        allowedAnswerTypes.includes(record.answerType)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(record => {
        if (!record.latitude || !record.longitude) return false;
        
        const distance = calculateDistance(
          filters.location!.latitude,
          filters.location!.longitude,
          record.latitude,
          record.longitude
        );
        
        return distance <= filters.location!.radius;
      });
    }
    
    return filtered;
  });
  
  const filteredExecutedSurveys = computed(() => {
    if (!selectedSurvey.value) return [];
    
    // Get unique executed surveys from filtered analytics data
    const uniqueExecutedSurveyIds = [...new Set(filteredAnalyticsData.value.map(record => record.executedSurveyId))];
    
    return executedSurveys.value.filter(executedSurvey => 
      uniqueExecutedSurveyIds.includes(executedSurvey.id)
    );
  });
  
  const uniqueExecutors = computed(() => {
    return [...new Set(analyticsData.value.map(record => record.executor))].filter(executor => executor);
  });
  
  const uniqueQuestionTypes = computed(() => {
    const answerTypeToQuestionType: Record<string, QuestionType> = {
      'TEXT': QuestionType.TEXT,
      'INT': QuestionType.INT,
      'DOUBLE': QuestionType.DOUBLE,
      'RATING': QuestionType.RATING,
      'QUESTION_OPTION': QuestionType.SINGLECHOICE, // Could be SINGLECHOICE or MULTIPLECHOICE
      'DATE': QuestionType.TEXT // Assuming date is stored as text
    };
    
    return [...new Set(analyticsData.value.map(record => answerTypeToQuestionType[record.answerType]))].filter(Boolean);
  });
  
  // Actions
  const selectSurvey = async (surveyId: string) => {
    const survey = availableSurveys.value.find(s => s.id === surveyId);
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    selectedSurvey.value = survey;
    selectedExecutedSurvey.value = null;
    
    // Load analytics data for the selected survey
    await loadAnalyticsData(surveyId);
    
    // Generate executed surveys summary
    generateExecutedSurveysSummary();
    
    // Generate questions summary
    generateQuestionsSummary();
  };
  
  const selectExecutedSurvey = (executedSurveyId: string) => {
    selectedExecutedSurvey.value = executedSurveyId;
  };
  
  const updateFilters = (newFilters: Partial<AnalyticsFilter>) => {
    Object.assign(filters, newFilters);
  };
  
  const clearFilters = () => {
    Object.keys(filters).forEach(key => {
      delete (filters as any)[key];
    });
  };
  
  const loadAnalyticsData = async (surveyId: string) => {
    isLoadingAnalyticsData.value = true;
    errorAnalyticsData.value = null;
    
    try {
      const options = await getAuthorizationHeader();
      const response = await get({
        apiName: 'analyticsApi',
        path: '/getAggregatedSurveyDataById',
        options: {
          ...options,
          queryParams: {
            SurveyID: surveyId,
          },
        },
      });
      
      const responseData = await response.response;
      const data = await responseData.body.json();
      
      if (data && typeof data === 'object' && 'res' in data && Array.isArray(data.res)) {
        analyticsData.value = data.res as unknown as AnalyticsDataRecord[];
      } else {
        throw new Error('Invalid response format from analytics API');
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      errorAnalyticsData.value = error instanceof Error ? error.message : 'Failed to load analytics data';
      analyticsData.value = [];
    } finally {
      isLoadingAnalyticsData.value = false;
    }
  };
  
  const generateExecutedSurveysSummary = () => {
    if (!analyticsData.value.length) {
      executedSurveys.value = [];
      return;
    }
    
    const executedSurveyMap = new Map<string, ExecutedSurveySummary>();
    
    analyticsData.value.forEach(record => {
      if (!executedSurveyMap.has(record.executedSurveyId)) {
        executedSurveyMap.set(record.executedSurveyId, {
          id: record.executedSurveyId,
          date: record.date,
          executor: record.executor,
          entityId: record.entityId,
          entityName: record.entityName,
          location: record.latitude && record.longitude ? {
            latitude: record.latitude,
            longitude: record.longitude
          } : null,
          answerCount: 0
        });
      }
      
      const summary = executedSurveyMap.get(record.executedSurveyId)!;
      summary.answerCount++;
    });
    
    executedSurveys.value = Array.from(executedSurveyMap.values());
  };
  
  const generateQuestionsSummary = () => {
    if (!analyticsData.value.length) {
      questions.value = [];
      return;
    }
    
    const questionMap = new Map<string, QuestionSummary>();
    
    analyticsData.value.forEach(record => {
      if (!questionMap.has(record.questionId)) {
        questionMap.set(record.questionId, {
          questionId: record.questionId,
          questionType: mapAnswerTypeToQuestionType(record.answerType),
          answerCount: 0,
          uniqueAnswers: []
        });
      }
      
      const summary = questionMap.get(record.questionId)!;
      summary.answerCount++;
      
      if (record.answerValue && !summary.uniqueAnswers.includes(record.answerValue)) {
        summary.uniqueAnswers.push(record.answerValue);
      }
    });
    
    questions.value = Array.from(questionMap.values());
  };
  
  const mapAnswerTypeToQuestionType = (answerType: string): QuestionType => {
    const mapping: Record<string, QuestionType> = {
      'TEXT': QuestionType.TEXT,
      'INT': QuestionType.INT,
      'DOUBLE': QuestionType.DOUBLE,
      'RATING': QuestionType.RATING,
      'QUESTION_OPTION': QuestionType.SINGLECHOICE,
      'DATE': QuestionType.TEXT
    };
    
    return mapping[answerType] || QuestionType.TEXT;
  };
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
  };
  
  const getAuthorizationHeader = async () => {
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
  };
  
  const reset = () => {
    selectedSurvey.value = null;
    selectedExecutedSurvey.value = null;
    analyticsData.value = [];
    executedSurveys.value = [];
    questions.value = [];
    clearFilters();
    errorAnalyticsData.value = null;
    errorExecutedSurveys.value = null;
  };
  
  return {
    // State
    selectedSurvey: readonly(selectedSurvey),
    selectedExecutedSurvey: readonly(selectedExecutedSurvey),
    analyticsData: readonly(analyticsData),
    executedSurveys: readonly(executedSurveys),
    questions: readonly(questions),
    filters: readonly(filters),
    isLoadingAnalyticsData: readonly(isLoadingAnalyticsData),
    isLoadingExecutedSurveys: readonly(isLoadingExecutedSurveys),
    errorAnalyticsData: readonly(errorAnalyticsData),
    errorExecutedSurveys: readonly(errorExecutedSurveys),
    
    // Computed
    availableSurveys,
    availableEntities,
    availableLevels,
    filteredAnalyticsData,
    filteredExecutedSurveys,
    uniqueExecutors,
    uniqueQuestionTypes,
    
    // Actions
    selectSurvey,
    selectExecutedSurvey,
    updateFilters,
    clearFilters,
    reset
  };
});
