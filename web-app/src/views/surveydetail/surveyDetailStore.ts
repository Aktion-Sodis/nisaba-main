import { isEqual } from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Survey } from '@/models/index';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { createNewTextQuestion, createNewSurvey } from '@/utils/newObjects';

export const useSurveyDetailStore = defineStore('surveyDetail', () => {
  const projectConfigStore = useProjectConfigStore();

  const localSurvey = ref<Survey | null>(null);

  const _dbSurvey = ref<Survey | null>(null);

  const survey = computed(() => {
    return localSurvey.value || _dbSurvey.value;
  });

  const isCreate = computed(() => _dbSurvey.value === null);

  const unsavedChangesAvailable = computed(() => {
    return !isEqual(localSurvey.value, _dbSurvey.value);
  });

  const setDbSurvey = (survey: Survey) => {
    _dbSurvey.value = survey;
    localSurvey.value = survey;
  };

  const initCreate = () => {
    localSurvey.value = createNewSurvey(allowedLanguageKeys.value);
    _dbSurvey.value = null;
  };

  const clear = () => {
    localSurvey.value = null;
    _dbSurvey.value = null;
  };

  const saveSurvey = async () => {
    if (!localSurvey.value) {
      return;
    }
    if (isCreate.value) {
      await projectConfigStore.createSurvey(localSurvey.value as Survey);
      _dbSurvey.value = localSurvey.value;
    } else {
      await projectConfigStore.updateSurvey(localSurvey.value as Survey);
      _dbSurvey.value = localSurvey.value;
    }
  };

  const addEmptyQuestion = () => {
    if (!localSurvey.value) {
      return;
    }
    localSurvey.value.questions.push(
      createNewTextQuestion(allowedLanguageKeys.value)
    );
  };

  const allowedLanguageKeys = ref<Array<string>>([]);

  return {
    localSurvey,
    survey,
    saveSurvey,
    clear,
    setDbSurvey,
    unsavedChangesAvailable,
    isCreate,
    allowedLanguageKeys,
    initCreate,
    addEmptyQuestion,
  };
});
