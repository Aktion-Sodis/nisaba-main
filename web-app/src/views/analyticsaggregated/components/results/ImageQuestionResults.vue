<template>
  <div class="flex flex-col gap-4">
    <!-- Image Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.image_stats.total_files') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_files || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.image_stats.total_responses') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.image_stats.completion_rate') }}
        </div>
        <div class="text-xl font-semibold">{{ completionRate }}%</div>
      </div>
    </div>

    <!-- File Type Distribution -->
    <div
      v-if="fileTypes.length > 0"
      class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg"
    >
      <h4 class="text-md font-semibold mb-3">
        {{ $t('analytics_aggregated.image_stats.file_types') }}
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

    <!-- Image Responses Table -->
    <div v-if="imageResponses.length > 0">
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.image_responses.title') }}
      </h3>

      <DataTable
        :value="imageResponses"
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
          :header="$t('analytics_aggregated.table.image_file')"
        >
          <template #body="{ data }">
            <div
              v-if="data.answer_value && data.answer_value.length > 0"
              class="flex items-center gap-2"
            >
              <image-thumbnail
                :file-path="data.answer_value"
                @click="openImageModal"
              />
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
      <i class="pi pi-image text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.image_responses.no_data') }}
      </p>
    </div>

    <!-- Image Modal -->
    <Dialog
      v-model:visible="imageModalVisible"
      modal
      :header="$t('analytics_aggregated.image_responses.modal_title')"
      :style="{ width: '90vw', maxWidth: '800px' }"
    >
      <div class="flex justify-center">
        <img
          v-if="selectedImageUrl"
          :src="selectedImageUrl"
          :alt="$t('analytics_aggregated.image_responses.image_alt')"
          class="max-w-full max-h-[70vh] object-contain rounded"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { QuestionData } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';
import ImageThumbnail from '@/views/analyticsaggregated/components/ImageThumbnail.vue';

const { formatDate } = useDateFormat();

const props = defineProps<{
  questionData: QuestionData;
}>();

const imageModalVisible = ref(false);
const selectedImageUrl = ref<string>('');

const imageResponses = computed(() => {
  if (!props.questionData.raw_data?.file_paths) {
    return [];
  }

  // Filter for image files and show responses that have image files
  return props.questionData.raw_data.file_paths
    .filter(
      (file) => file.file_type === 'image' && file.path && file.path.length > 0
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

const openImageModal = (imageUrl: string) => {
  selectedImageUrl.value = imageUrl;
  imageModalVisible.value = true;
};
</script>
