<template>
  <Card class="h-full flex flex-col">
    <template #title>
      {{ t('surveydetails.navigation_card.title') }}
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
          :model-value="activeIndex"
          class="h-full"
          list-style="max-height: none"
          @change="(e) => onNavigate(e.value)"
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

import { useSurveyDetailStore } from '../surveyDetailStore';

import { formatMLString } from '@/utils/formatStrings';

const { t, locale } = useI18n();

const surveyDetailStore = useSurveyDetailStore();

defineProps<{
  activeIndex: number;
  onNavigate: (index: number) => void;
}>();

const navigationItems = computed(() => [
  {
    label: t('surveydetails.navigation_card.general_section'),
    value: -1,
    subtitle: formatMLString(surveyDetailStore.localSurvey?.name, locale.value),
  },
  ...(surveyDetailStore.localSurvey?.questions.map((question, index) => ({
    label: t('surveydetails.navigation_card.question_title', {
      index: index + 1,
    }),
    value: index,
    subtitle: formatMLString(question.text, locale.value),
    type: t(
      `surveydetails.question_card.input.question_type.options.${question.type}`
    ),
  })) || []),
]);
</script>
