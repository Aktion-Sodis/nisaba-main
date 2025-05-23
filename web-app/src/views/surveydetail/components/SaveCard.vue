<template>
  <Card>
    <template #content>
      <div class="flex justify-end align-items-center">
        <div v-if="lastSavedAt" class="text-oneliner-light-small mr-3">
          Last saved: {{ formatDate(lastSavedAt) }}
        </div>
        <template v-if="store.editMode">
          <Button
            severity="success"
            :disabled="!hasUnsavedChanges"
            :loading="store.isSaving"
            :label="t('utils.actions.save')"
            icon="pi pi-save"
            @click="handleSave"
          />
        </template>
        <template v-else>
          <Button
            :label="t('utils.actions.edit')"
            icon="pi pi-pencil"
            @click="handleEdit"
          />
        </template>
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

const handleEdit = () => {
  store.editMode = true;
};
</script>
