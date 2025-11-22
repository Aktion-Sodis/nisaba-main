<template>
  <div class="flex flex-col gap-4">
    <!-- Audio Statistics -->
    <div v-if="questionData.analytics.statistics" class="flex flex-wrap gap-2">
      <Fieldset
        :legend="$t('analytics_aggregated.audio_stats.total_files')"
        class="flex-1"
      >
        <div class="text-body">
          {{ totalFilesExisting }}
        </div>
      </Fieldset>

      <Fieldset
        :legend="$t('analytics_aggregated.audio_stats.total_responses')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.total_answers || 0 }}
        </div>
      </Fieldset>

      <Fieldset
        :legend="$t('analytics_aggregated.choice_stats.unique_entities')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.unique_entities }}
        </div>
      </Fieldset>
    </div>

    <!-- File Type Distribution -->
    <div v-if="fileTypes.length > 0">
      <h3 class="text-label mb-3">
        {{ $t('analytics_aggregated.audio_stats.file_types') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="(count, type) in fileTypes"
          :key="type"
          :value="`${type}: ${count}`"
          class="w-fit"
        />
      </div>
    </div>

    <!-- Audio Responses Table -->
    <div v-if="audioResponses.length > 0">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.audio_responses.title') }}
      </h3>

      <DataTable
        :value="audioResponses"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        size="small"
      >
        <Column
          field="entity_name"
          :header="$t('analytics_aggregated.table.entity')"
          sortable
        >
          <template #body="{ data }">
            <span v-if="data.entity_name" class="text-small-table">
              {{ data.entity_name }}
            </span>
            <span v-else class="text-oneliner-light-small italic">
              {{ $t('analytics_aggregated.table.no_entity') }}
            </span>
          </template>
        </Column>

        <Column
          field="answer_date"
          :header="$t('analytics_aggregated.table.date')"
          sortable
        >
          <template #body="{ data }">
            <span v-if="data.answer_date" class="text-small-table">
              {{ formatDate(data.answer_date) }}
            </span>
            <span v-else class="text-oneliner-light-small italic">
              {{ $t('analytics_aggregated.table.no_date') }}
            </span>
          </template>
        </Column>

        <Column
          field="executor"
          :header="$t('analytics_aggregated.table.executor')"
          sortable
        >
          <template #body="{ data }">
            <span v-if="data.executor" class="text-small-table">
              {{ data.executor }}
            </span>
            <span v-else class="text-oneliner-light-small italic">
              {{ $t('analytics_aggregated.table.no_executor') }}
            </span>
          </template>
        </Column>

        <Column
          field="answer_value"
          :header="$t('analytics_aggregated.table.audio_file')"
        >
          <template #body="{ data }">
            <div
              v-if="data.answer_value && data.answer_value.length > 0"
              class="flex items-center gap-2"
            >
              <div v-if="fileExistsMap[data.answer_value] === true">
                <audio-player :file-path="data.answer_value" />
              </div>
              <span
                v-else-if="fileExistsMap[data.answer_value] === false"
                class="text-oneliner-light-small italic"
              >
                {{ $t('analytics_aggregated.audio_responses.file_not_found') }}
              </span>
              <div v-else class="flex items-center gap-2">
                <i class="pi pi-spin pi-spinner text-sm"></i>
                <span class="text-oneliner-light-small">Checking...</span>
              </div>
            </div>
            <span v-else class="text-oneliner-light-small italic">
              {{ $t('analytics_aggregated.table.no_response') }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- No Data Message -->
    <div v-else class="text-center p-8">
      <i class="pi pi-volume-up text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.audio_responses.no_data') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { list } from '@aws-amplify/storage';
import { computed, onMounted, ref } from 'vue';

import type { QuestionData } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';
import AudioPlayer from '@/views/analyticsaggregated/components/AudioPlayer.vue';

const { formatDate } = useDateFormat();

const props = defineProps<{
  questionData: QuestionData;
}>();

const audioResponses = computed(() => {
  if (!props.questionData.raw_data?.file_paths) {
    return [];
  }

  // Filter for audio files and show responses that have audio files
  return props.questionData.raw_data.file_paths
    .filter(
      (file) => file.file_type === 'audio' && file.path && file.path.length > 0
    )
    .map((file) => ({
      entity_name: file.entity?.languageTexts?.[0] || null,
      answer_date: file.date,
      executor: file.executor,
      answer_value: file.path,
    }));
});

const fileTypes = computed(() => {
  return props.questionData.analytics.statistics?.file_types || {};
});

// Count files that actually exist
const totalFilesExisting = computed(() => {
  return Object.values(fileExistsMap.value).filter((exists) => exists === true)
    .length;
});

// Cache to store file existence results (filePath -> boolean)
const fileExistsCache = ref<Map<string, boolean>>(new Map());

// Map to store existence status for each file path (for template access)
const fileExistsMap = ref<Record<string, boolean | undefined>>({});

const checkFileExists = async (filePath: string): Promise<boolean> => {
  // Return cached result if available
  if (fileExistsCache.value.has(filePath)) {
    return fileExistsCache.value.get(filePath)!;
  }

  try {
    const result = await list({ path: filePath });
    const exists = result.items.length > 0;
    // Cache the result
    fileExistsCache.value.set(filePath, exists);
    return exists;
  } catch (error) {
    // Cache false result on error
    fileExistsCache.value.set(filePath, false);
    return false;
  }
};

onMounted(async () => {
  // Check all unique file paths once
  const uniquePaths = [
    ...new Set(
      audioResponses.value
        .map((r) => r.answer_value)
        .filter((path): path is string => Boolean(path))
    ),
  ];
  for (const path of uniquePaths) {
    fileExistsMap.value[path] = await checkFileExists(path);
  }
});
</script>
