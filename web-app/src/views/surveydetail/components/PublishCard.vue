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
            @click="handlePublish"
          />
        </template>
        <template v-else>
          <Button
            severity="secondary"
            :label="t('surveydetails.publish_card.published.button')"
            icon="pi pi-archive"
            @click="handleArchive"
          />
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSurveyDetailStore } from '../surveyDetailStore';

const { t } = useI18n();
const store = useSurveyDetailStore();
const confirm = useConfirm();

const isDraft = computed(() => store.survey?.status === 'DRAFT');

const statusInfo = computed(() => {
  return isDraft.value
    ? t('surveydetails.publish_card.draft.info')
    : t('surveydetails.publish_card.published.info');
});

const handlePublish = () => {
  confirm.require({
    message: t('surveydetails.publish_card.draft.confirm.message'),
    header: t('surveydetails.publish_card.draft.confirm.title'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      label: t('surveydetails.publish_card.draft.confirm.accept'),
      icon: 'pi pi-send',
      severity: 'primary',
    },
    rejectProps: {
      label: t('surveydetails.publish_card.draft.confirm.reject'),
      severity: 'secondary',
      outlined: true,
    },
    accept: () => {
      store.publishSurvey();
    },
  });
};

const handleArchive = () => {
  confirm.require({
    message: t('surveydetails.publish_card.published.confirm.message'),
    header: t('surveydetails.publish_card.published.confirm.title'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      label: t('surveydetails.publish_card.published.confirm.accept'),
      icon: 'pi pi-archive',
      severity: 'primary',
    },
    rejectProps: {
      label: t('surveydetails.publish_card.published.confirm.reject'),
      severity: 'secondary',
      outlined: true,
    },
    accept: () => {
      store.archiveSurvey();
    },
  });
};
</script>
