<template>
  <div v-if="surveyDetailStore.localSurvey" class="flex flex-col gap-4">
    <general-input-card />
    <question-card
      v-for="(_, index) in surveyDetailStore.localSurvey.questions"
      :key="index"
      :question-index="index"
    />
    <add-question-card />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import AddQuestionCard from './components/AddQuestionCard.vue';
import GeneralInputCard from './components/GeneralInputCard.vue';
import QuestionCard from './components/questioncard/QuestionCard.vue';
import { useSurveyDetailStore } from './surveyDetailStore';

const surveyDetailStore = useSurveyDetailStore();
const { locale } = useI18n();

onMounted(() => {
  if (surveyDetailStore.allowedLanguageKeys.length === 0) {
    surveyDetailStore.allowedLanguageKeys = [locale.value];
  }
});
</script>
