<template>
  <Card>
    <template #title>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          {{ $t('analytics_aggregated.results.title') }}
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
      <div class="flex flex-col gap-6 flex-1 min-h-0 overflow-auto">
        <!-- Question Type Specific Results -->
        <div>
          <h3 class="text-label mb-4">
            {{ $t('analytics_aggregated.answer_statistics.title') }}
          </h3>
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
          <single-choice-question-results
            v-else-if="questionData.question_type === 'SINGLECHOICE'"
            :question-data="questionData"
          />

          <!-- Multiple Choice Questions -->
          <multiple-choice-question-results
            v-else-if="questionData.question_type === 'MULTIPLECHOICE'"
            :question-data="questionData"
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
import { formatMLString } from '@/utils/formatStrings';
import AudioQuestionResults from '@/views/analyticsaggregated/components/results/AudioQuestionResults.vue';
import DateQuestionResults from '@/views/analyticsaggregated/components/results/DateQuestionResults.vue';
import ImageQuestionResults from '@/views/analyticsaggregated/components/results/ImageQuestionResults.vue';
import MultipleChoiceQuestionResults from '@/views/analyticsaggregated/components/results/MultipleChoiceQuestionResults.vue';
import NumericQuestionResults from '@/views/analyticsaggregated/components/results/NumericQuestionResults.vue';
import RatingQuestionResults from '@/views/analyticsaggregated/components/results/RatingQuestionResults.vue';
import SingleChoiceQuestionResults from '@/views/analyticsaggregated/components/results/SingleChoiceQuestionResults.vue';
import TextQuestionResults from '@/views/analyticsaggregated/components/results/TextQuestionResults.vue';

const { locale } = useI18n();

defineProps<{
  questionData: QuestionData;
}>();
</script>
