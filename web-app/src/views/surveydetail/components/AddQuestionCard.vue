<template>
  <Card>
    <template #content>
      <div class="flex w-full justify-end">
        <Button
          icon="pi pi-plus"
          :label="t('surveydetails.add_question_card.button')"
          :disabled="!surveyDetailStore.editMode"
          @click="surveyDetailStore.addEmptyQuestion"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useSurveyDetailStore } from '../surveyDetailStore';

const { t } = useI18n();
const surveyDetailStore = useSurveyDetailStore();
</script>
