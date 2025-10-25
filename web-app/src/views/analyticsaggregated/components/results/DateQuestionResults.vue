<template>
  <div class="flex flex-col gap-4">
    <!-- Date Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.date_stats.total_responses') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.date_stats.unique_entities') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.unique_entities }}
        </div>
      </div>
    </div>

    <!-- Date Responses Table -->
    <div v-if="dateResponses.length > 0">
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.date_responses.title') }}
      </h3>

      <DataTable
        :value="dateResponses"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        class="p-datatable-sm"
        responsive-layout="scroll"
        sort-field="answer_date"
        :sort-order="-1"
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
          :header="$t('analytics_aggregated.table.date_response')"
        >
          <template #body="{ data }">
            <span v-if="data.answer_value">
              {{ formatDate(data.answer_value) }}
            </span>
            <span v-else class="text-surface-500 italic">
              {{ $t('analytics_aggregated.table.no_response') }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- No Data Message -->
    <div v-else class="text-center p-8">
      <i class="pi pi-calendar text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.date_responses.no_data') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { QuestionData } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';

const { formatDate } = useDateFormat();

const props = defineProps<{
  questionData: QuestionData;
}>();

const dateResponses = computed(() => {
  // For date questions, we need to extract date values from the answers
  if (!props.questionData.answers) {
    return [];
  }

  return props.questionData.answers
    .filter(
      (answer) => answer.answer_value && typeof answer.answer_value === 'string'
    )
    .map((answer) => ({
      entity_name: answer.entity_name,
      answer_date: answer.answer_date,
      executor: answer.executor,
      answer_value: answer.answer_value,
    }));
});
</script>
