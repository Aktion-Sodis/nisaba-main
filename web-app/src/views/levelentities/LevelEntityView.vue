<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">
            {{ $t('level_entities.title') }}
          </span>
          <Button
            icon="pi pi-refresh"
            :label="$t('level_entities.refresh')"
            size="small"
            severity="secondary"
            :loading="projectConfigStore.isLoading"
            @click="refreshData"
          />
        </div>
      </template>

      <template #subtitle>
        <span class="text-oneliner-light">
          {{ $t('level_entities.subtitle') }}
        </span>
      </template>

      <template #content>
        <div
          v-if="projectConfigStore.isLoading"
          class="flex justify-center items-center h-64"
        >
          <ProgressSpinner />
        </div>

        <div
          v-else-if="errorMessage"
          class="flex justify-center items-center h-64"
        >
          <Message severity="error" :closable="false">
            {{ errorMessage }}
          </Message>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto h-[calc(100vh-16rem)]">
          <!-- Level Columns -->
          <level-column
            v-for="(level, index) in projectConfigStore.levelsSortedByHierarchy"
            :key="level.id"
            :level="level"
            :column-index="index"
          />

          <!-- Add New Level Column -->
          <level-column
            :level="null"
            :column-index="projectConfigStore.levelsSortedByHierarchy.length"
          />
        </div>
      </template>
    </Card>

    <!-- Level Dialog -->
    <level-dialog />

    <!-- Entity Dialog -->
    <entity-dialog />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import EntityDialog from './components/EntityDialog.vue';
import LevelColumn from './components/LevelColumn.vue';
import LevelDialog from './components/LevelDialog.vue';
import { useLevelEntityStore } from './levelEntityStore';

import { useProjectConfigStore } from '@/stores/projectConfigStore';

const { t } = useI18n();
const projectConfigStore = useProjectConfigStore();
const levelEntityStore = useLevelEntityStore();

// State
const errorMessage = ref<string | null>(null);

// Methods
const refreshData = async () => {
  try {
    errorMessage.value = null;
    await projectConfigStore.initialize();
    levelEntityStore.initializeDefaultSelection();
  } catch (error) {
    console.error('Error refreshing data:', error);
    errorMessage.value = t('level_entities.errors.refreshFailed');
  }
};

// Initialize on mount
onMounted(async () => {
  try {
    if (projectConfigStore.levelsSortedByHierarchy.length === 0) {
      await projectConfigStore.initialize();
    }
    levelEntityStore.initializeDefaultSelection();
  } catch (error) {
    console.error('Error initializing level entity view:', error);
    errorMessage.value = t('level_entities.errors.initializationFailed');
  }
});
</script>
