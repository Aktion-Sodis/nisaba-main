<template>
  <div class="h-full pb-4">
    <div v-if="!analyticsStore.selectedSurvey" class="h-full">
      <Card class="h-full">
        <template #title>
          <div class="flex justify-between items-center w-full">
            <span class="text-screen-title">
              {{ $t('apps.apps.analytics_aggregated.title') }}
            </span>
          </div>
        </template>

        <template #subtitle>
          <span class="text-oneliner-light">
            {{ $t('apps.apps.analytics_aggregated.description') }}
          </span>
        </template>

        <template #content>
          <div
            class="flex flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <i class="pi pi-chart-bar text-[3rem] text-surface-400"></i>
            <p class="text-oneliner-light text-surface-500">
              {{ $t('analytics_aggregated.no_survey_selected') }}
            </p>
          </div>
        </template>
      </Card>
    </div>

    <div v-else-if="!analyticsStore.analyticsData" class="h-full">
      <Card class="h-full">
        <template #title>
          <div class="flex justify-between items-center w-full">
            <span class="text-screen-title">
              {{ $t('apps.apps.analytics_aggregated.title') }}
            </span>
          </div>
        </template>

        <template #subtitle>
          <span class="text-oneliner-light">
            {{ $t('apps.apps.analytics_aggregated.description') }}
          </span>
        </template>

        <template #content>
          <div
            class="flex flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <i class="pi pi-chart-bar text-[3rem] text-surface-400"></i>
            <p class="text-oneliner-light text-surface-500">
              {{ $t('analytics_aggregated.no_data_available') }}
            </p>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex flex-col gap-4 h-full w-full">
      <!-- Filter Card -->
      <analytics-filter-card />

      <!-- Question Navigation and Results -->
      <div class="flex gap-4 h-full w-full">
        <!-- Question Navigation Column -->
        <div class="w-80 flex-shrink-0 flex flex-col gap-4 h-full">
          <div class="flex-grow min-h-0">
            <question-navigation-card
              :questions="analyticsStore.questions"
              :active-question-index="selectedQuestionIndex"
              @question-selected="onQuestionSelected"
            />
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 min-w-0 h-full overflow-y-auto">
          <div v-if="selectedQuestion" class="flex flex-col gap-4">
            <question-results-card :question-data="selectedQuestion" />
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center gap-4 p-8 text-center h-full"
          >
            <i class="pi pi-question-circle text-[3rem] text-surface-400"></i>
            <p class="text-oneliner-light text-surface-500">
              {{ $t('analytics_aggregated.select_question') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { useAnalyticsStore } from '@/stores/analytics';
import AnalyticsFilterCard from '@/views/analyticsaggregated/components/AnalyticsFilterCard.vue';
import QuestionNavigationCard from '@/views/analyticsaggregated/components/QuestionNavigationCard.vue';
import QuestionResultsCard from '@/views/analyticsaggregated/components/QuestionResultsCard.vue';

const analyticsStore = useAnalyticsStore();

const selectedQuestionIndex = ref<number | null>(null);

const selectedQuestion = computed(() => {
  if (selectedQuestionIndex.value === null || !analyticsStore.questions) {
    return null;
  }
  return analyticsStore.questions[selectedQuestionIndex.value] || null;
});

const onQuestionSelected = (index: number) => {
  selectedQuestionIndex.value = index;
};

// Auto-select first question when data loads
onMounted(() => {
  if (analyticsStore.questions && analyticsStore.questions.length > 0) {
    selectedQuestionIndex.value = 0;
  }
});

// Auto-reload analytics data when it's been invalidated
watch(
  [
    () => analyticsStore.analyticsDataNeedsReload,
    () => analyticsStore.selectedSurvey,
    () => analyticsStore.isLoadingAnalyticsData,
  ],
  ([needsReload, selectedSurvey, isLoading]) => {
    if (needsReload && selectedSurvey && !isLoading) {
      analyticsStore.loadAnalyticsData(selectedSurvey.id);
    }
  }
);
</script>
