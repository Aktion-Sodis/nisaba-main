<template>
  <div class="flex flex-col gap-4">
    <!-- Text Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.text_stats.average_length') }}
        </div>
        <div class="text-xl font-semibold">
          {{
            Math.round(
              questionData.analytics.statistics.average_text_length || 0
            )
          }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.text_stats.longest_response') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.longest_response || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.text_stats.shortest_response') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.shortest_response || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.text_stats.total_responses') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </div>
    </div>

    <!-- Text Responses Table -->
    <div v-if="textResponses.length > 0">
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.text_responses.title') }}
      </h3>

      <DataTable
        :value="textResponses"
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
          :header="$t('analytics_aggregated.table.text_response')"
        >
          <template #body="{ data }">
            <div class="max-w-xs">
              <div
                v-if="data.answer_value && data.answer_value.length > 0"
                class="text-sm break-words"
                :title="data.answer_value"
              >
                {{
                  data.answer_value.length > 100
                    ? data.answer_value.substring(0, 100) + '...'
                    : data.answer_value
                }}
              </div>
              <span v-else class="text-surface-500 italic">
                {{ $t('analytics_aggregated.table.no_response') }}
              </span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- No Data Message -->
    <div v-else class="text-center p-8">
      <i class="pi pi-file-text text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.text_responses.no_data') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QuestionData, AnswerRecord } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';

const { t } = useI18n();
const { formatDate } = useDateFormat();

const props = defineProps<{
  questionData: QuestionData;
}>();

const textResponses = computed(() => {
  if (!props.questionData.raw_data?.text_responses) {
    return [];
  }

  return props.questionData.raw_data.text_responses.map((response) => ({
    entity_name: response.entity?.languageTexts?.[0] || null,
    answer_date: response.date,
    executor: response.executor,
    answer_value: response.text,
  }));
});
</script>
