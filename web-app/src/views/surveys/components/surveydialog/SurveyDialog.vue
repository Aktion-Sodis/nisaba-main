<template>
  <Dialog
    v-model:visible="modelValue"
    modal
    class="w-dialog-lg"
    :header="
      mode === 'create' ? 'Neue Umfrage erstellen' : 'Umfrage bearbeiten'
    "
  >
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Abbrechen"
          icon="pi pi-times"
          text
          @click="closeDialog"
        />
        <Button
          :label="mode === 'create' ? 'Erstellen' : 'Speichern'"
          icon="pi pi-check"
          autofocus
          @click="saveSurvey"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { Survey } from '@/models';

type SurveyDialogMode = 'create' | 'update';

const props = defineProps<{
  dialogVisible: boolean;
  mode: SurveyDialogMode;
}>();

const emit = defineEmits<{
  (e: 'update:dialogVisible', value: boolean): void;
  (e: 'update:survey', value: Survey): void;
}>();

const localDialogVisible = ref(props.dialogVisible);

watch(
  () => props.dialogVisible,
  (newValue: boolean) => {
    localDialogVisible.value = newValue;
  }
);

watch(localDialogVisible, (newValue: boolean) => {
  emit('update:dialogVisible', newValue);
});
</script>
