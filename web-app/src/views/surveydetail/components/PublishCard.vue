<template>
  <Card>
    <template #content>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <p class="text-oneliner-light text-surface-500 text-center">
          {{ statusInfo }}
        </p>
        <template v-if="isDraft">
          <Button
            :label="t('surveydetails.publish_card.draft.button')"
            icon="pi pi-send"
            @click="store.publishSurvey"
          />
        </template>
        <template v-if="isPublished">
          <Button
            severity="secondary"
            :label="t('surveydetails.publish_card.published.button')"
            icon="pi pi-archive"
            @click="store.archiveSurvey"
          />
        </template>
        <template v-if="isArchived">
          <Button
            severity="secondary"
            :label="t('surveydetails.publish_card.archived.button')"
            icon="pi pi-refresh"
            @click="store.reactivateSurvey"
          />
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSurveyDetailStore } from '../surveyDetailStore';

const { t } = useI18n();
const store = useSurveyDetailStore();

const isDraft = computed(() => store.survey?.status === 'DRAFT');
const isPublished = computed(() => store.survey?.status === 'ACTIVE');
const isArchived = computed(() => store.survey?.status === 'ARCHIVED');
const statusInfo = computed(() => {
  if (isDraft.value) {
    return t('surveydetails.publish_card.draft.info');
  } else if (isPublished.value) {
    return t('surveydetails.publish_card.published.info');
  } else if (isArchived.value) {
    return t('surveydetails.publish_card.archived.info');
  }
  return '';
});
</script>
