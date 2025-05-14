<template>
  <Card>
    <template #content>
      <div class="flex justify-end align-items-center">
        <div v-if="lastSavedAt" class="text-oneliner-light-small mr-3">
          Last saved: {{ formatDate(lastSavedAt) }}
        </div>
        <Button
          severity="success"
          :disabled="!hasUnsavedChanges"
          :loading="store.isSaving"
          :label="t('utils.actions.save')"
          icon="pi pi-save"
          @click="handleSave"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useDateFormat } from '@/utils/dateFormat';
import { useSurveyDetailStore } from '@/views/surveydetail/surveyDetailStore';

const { t } = useI18n();
const store = useSurveyDetailStore();
const { formatDate } = useDateFormat();

const hasUnsavedChanges = computed(() => store.unsavedChangesAvailable);
const lastSavedAt = computed(() => store.lastSavedAt);

const handleSave = async () => {
  await store.saveSurvey();
};
</script>
