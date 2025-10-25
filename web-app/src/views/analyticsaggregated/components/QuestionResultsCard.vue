<template>
  <Card>
    <template #title>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <span class="text-screen-title">
            {{ $t('analytics_aggregated.results.title') }}
          </span>
          <Tag
            :value="
              $t(
                `analytics_aggregated.question_types.${questionData.question_type.toLowerCase()}`
              )
            "
            class="w-fit"
          />
        </div>
        <div class="text-oneliner-light">
          {{ formatMLString(questionData.question_text, locale) }}
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-6">
        <!-- Question Statistics Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-users text-primary text-xl"></i>
              <div>
                <div class="text-sm text-surface-600 dark:text-surface-400">
                  {{ $t('analytics_aggregated.stats.total_answers') }}
                </div>
                <div class="text-2xl font-semibold">
                  {{ questionData.analytics.total_answers }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-building text-primary text-xl"></i>
              <div>
                <div class="text-sm text-surface-600 dark:text-surface-400">
                  {{ $t('analytics_aggregated.stats.unique_entities') }}
                </div>
                <div class="text-2xl font-semibold">
                  {{ questionData.analytics.unique_entities }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-calendar text-primary text-xl"></i>
              <div>
                <div class="text-sm text-surface-600 dark:text-surface-400">
                  {{ $t('analytics_aggregated.stats.date_range') }}
                </div>
                <div class="text-sm font-semibold">
                  {{ formatDateRange(questionData.analytics.date_range) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Type Specific Results -->
        <div class="mt-6">
          <!-- Text Questions -->
          <text-question-results
            v-if="questionData.question_type === 'TEXT'"
            :question-data="questionData"
          />

          <!-- Audio Questions -->
          <audio-question-results
            v-else-if="questionData.question_type === 'AUDIO'"
            :question-data="questionData"
          />

          <!-- Image Questions -->
          <image-question-results
            v-else-if="questionData.question_type === 'PICTURE'"
            :question-data="questionData"
          />

          <!-- Single Choice Questions -->
          <choice-question-results
            v-else-if="questionData.question_type === 'SINGLECHOICE'"
            :question-data="questionData"
            :is-multiple="false"
          />

          <!-- Multiple Choice Questions -->
          <choice-question-results
            v-else-if="questionData.question_type === 'MULTIPLECHOICE'"
            :question-data="questionData"
            :is-multiple="true"
          />

          <!-- Rating Questions -->
          <rating-question-results
            v-else-if="questionData.question_type === 'RATING'"
            :question-data="questionData"
          />

          <!-- Numeric Questions (INT/DOUBLE) -->
          <numeric-question-results
            v-else-if="['INT', 'DOUBLE'].includes(questionData.question_type)"
            :question-data="questionData"
          />

          <!-- Date Questions -->
          <date-question-results
            v-else-if="questionData.question_type === 'DATE'"
            :question-data="questionData"
          />

          <!-- Unsupported Question Type -->
          <div v-else class="text-center p-8">
            <i
              class="pi pi-exclamation-triangle text-4xl text-surface-400 mb-4"
            ></i>
            <p class="text-oneliner-light text-surface-500">
              {{
                $t('analytics_aggregated.unsupported_question_type', {
                  type: questionData.question_type,
                })
              }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { QuestionData } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';
import { formatMLString } from '@/utils/formatStrings';
import AudioQuestionResults from '@/views/analyticsaggregated/components/results/AudioQuestionResults.vue';
import ChoiceQuestionResults from '@/views/analyticsaggregated/components/results/ChoiceQuestionResults.vue';
import DateQuestionResults from '@/views/analyticsaggregated/components/results/DateQuestionResults.vue';
import ImageQuestionResults from '@/views/analyticsaggregated/components/results/ImageQuestionResults.vue';
import NumericQuestionResults from '@/views/analyticsaggregated/components/results/NumericQuestionResults.vue';
import RatingQuestionResults from '@/views/analyticsaggregated/components/results/RatingQuestionResults.vue';
import TextQuestionResults from '@/views/analyticsaggregated/components/results/TextQuestionResults.vue';

const { t, locale } = useI18n();
const { formatDate } = useDateFormat();

defineProps<{
  questionData: QuestionData;
}>();

const formatDateRange = (dateRange: {
  earliest: string | null;
  latest: string | null;
}) => {
  if (!dateRange.earliest || !dateRange.latest) {
    return t('analytics_aggregated.stats.no_date_range');
  }

  const start = formatDate(dateRange.earliest);
  const end = formatDate(dateRange.latest);

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
};
</script>
