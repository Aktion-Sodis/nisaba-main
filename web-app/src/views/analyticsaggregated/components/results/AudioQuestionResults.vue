<template>
  <div class="flex flex-col gap-4">
    <!-- Audio Statistics -->
    <div v-if="questionData.analytics.statistics" class="flex flex-wrap gap-2">
      <Fieldset
        :legend="$t('analytics_aggregated.audio_stats.total_files')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.total_files || 0 }}
        </div>
      </Fieldset>

      <Fieldset
        :legend="$t('analytics_aggregated.audio_stats.total_responses')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </Fieldset>

      <Fieldset
        :legend="$t('analytics_aggregated.audio_stats.completion_rate')"
        class="flex-1"
      >
        <div class="text-body">{{ completionRate }}%</div>
      </Fieldset>
    </div>

    <!-- File Type Distribution -->
    <div
      v-if="fileTypes.length > 0"
      class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg"
    >
      <h4 class="text-md font-semibold mb-3">
        {{ $t('analytics_aggregated.audio_stats.file_types') }}
      </h4>
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
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.audio_responses.title') }}
      </h3>

      <DataTable
        :value="audioResponses"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        class="p-datatable-sm"
        responsive-layout="scroll"
      >
        <Column
          field="entity_name"
          :header="$t('analytics_aggregated.table.entity')"
          sortable
        >
          <template #body="{ data }">
            <span v-if="data.entity_name">{{ data.entity_name }}</span>
            <span v-else class="text-surface-500 italic">
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
            <span v-if="data.answer_date">
              {{ formatDate(data.answer_date) }}
            </span>
            <span v-else class="text-surface-500 italic">
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
            <span v-if="data.executor">{{ data.executor }}</span>
            <span v-else class="text-surface-500 italic">
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
              <audio-player :file-path="data.answer_value" />
            </div>
            <span v-else class="text-surface-500 italic">
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
import { computed } from 'vue';

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

const completionRate = computed(() => {
  const total = props.questionData.analytics.statistics?.total_responses || 0;
  const files = props.questionData.analytics.statistics?.total_files || 0;

  if (total === 0) return 0;

  return Math.round((files / total) * 100);
});
</script>
