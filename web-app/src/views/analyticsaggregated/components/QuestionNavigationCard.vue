<template>
  <Card class="h-full flex flex-col">
    <template #title>
      {{ $t('analytics_aggregated.navigation.title') }}
    </template>
    <template #content>
      <div
        class="flex-1 min-h-0 overflow-auto"
        style="height: calc(100% - 2.5rem)"
      >
        <Listbox
          :options="navigationItems"
          option-label="label"
          option-value="value"
          :model-value="activeQuestionIndex"
          class="h-full"
          list-style="max-height: none"
          @change="(e) => onQuestionSelected(e.value)"
        >
          <template #option="slotProps">
            <div class="flex flex-col gap-1 my-1">
              <div class="flex items-center gap-4">
                <span class="text-body">
                  {{ slotProps.option.label }}
                </span>
                <Tag
                  v-if="slotProps.option.type"
                  :value="slotProps.option.type"
                  class="w-fit"
                />
              </div>
              <span
                v-if="slotProps.option.subtitle"
                class="text-oneliner-light-small"
              >
                {{ slotProps.option.subtitle }}
              </span>
              <div
                v-if="slotProps.option.stats"
                class="flex gap-2 text-xs text-surface-500"
              >
                <span>
                  {{
                    $t('analytics_aggregated.navigation.total_answers', {
                      count: slotProps.option.stats.total_answers,
                    })
                  }}
                </span>
                <span>•</span>
                <span>
                  {{
                    $t('analytics_aggregated.navigation.unique_entities', {
                      count: slotProps.option.stats.unique_entities,
                    })
                  }}
                </span>
              </div>
            </div>
          </template>
        </Listbox>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QuestionData } from '@/stores/analytics';
import { formatMLString } from '@/utils/formatStrings';

const { t, locale } = useI18n();

const props = defineProps<{
  questions: QuestionData[];
  activeQuestionIndex: number | null;
}>();

const emit = defineEmits<{
  'question-selected': [index: number];
}>();

const onQuestionSelected = (index: number) => {
  emit('question-selected', index);
};

const navigationItems = computed(() => {
  return props.questions.map((question, index) => ({
    label: t('analytics_aggregated.navigation.question_title', {
      index: index + 1,
    }),
    value: index,
    subtitle: formatMLString(question.question_text, locale.value),
    type: t(
      `analytics_aggregated.question_types.${question.question_type.toLowerCase()}`
    ),
    stats: {
      total_answers: question.analytics.total_answers,
      unique_entities: question.analytics.unique_entities,
    },
  }));
});
</script>
