<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">
            {{ $t('apps.apps.analytics_survey_overview.title') }}
          </span>
        </div>
      </template>

      <template #subtitle>
        <span class="text-oneliner-light">
          {{ $t('apps.apps.analytics_survey_overview.description') }}
        </span>
      </template>

      <template #content>
        <DataTable
          :value="searchableSurveys"
          :loading="loading"
          paginator
          :rows="10"
          :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_21rem)]"
          class="cursor-pointer"
          row-hover
          @row-click="onRowClick"
        >
          <template #empty>
            <span class="text-body">{{ $t('surveys.noSurveysFound') }}</span>
          </template>
          <template #loading>
            <span class="text-body">{{ $t('surveys.loadingSurveys') }}</span>
          </template>

          <Column
            field="name_searchable"
            :header="$t('surveys.columns.name')"
            sortable
          >
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.name, locale) }}
            </template>
          </Column>

          <Column
            field="description_searchable"
            :header="$t('surveys.columns.description')"
          >
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.description, locale) }}
            </template>
          </Column>

          <Column
            field="createdAt"
            :header="$t('surveys.columns.createdAt')"
            sortable
          >
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
          </Column>

          <Column
            field="status"
            :header="$t('surveys.columns.status')"
            sortable
          >
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <Tag
                  :value="formatSurveyStatus(slotProps.data.status)"
                  :severity="getStatusSeverity(slotProps.data.status)"
                  :icon="getStatusIcon(slotProps.data.status)"
                  class="text-xs"
                />
                <div v-if="isLoadingExecutedCounts" class="flex justify-center">
                  <ProgressSpinner style="width: 16px; height: 16px" />
                </div>
                <Tag
                  v-else
                  :value="`${slotProps.data.executedCount || 0}`"
                  severity="info"
                  class="text-xs"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { SurveyStatus, I18nString } from '@/models';
import { useAnalyticsStore } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';
import { formatMLString } from '@/utils/formatStrings';

// Interface for searchable survey data
interface SearchableSurvey {
  id: string;
  name: I18nString;
  description: I18nString;
  status: SurveyStatus;
  createdAt: string | null;
  name_searchable: string;
  description_searchable: string;
  executedCount: number;
}

const { locale, t } = useI18n();
const router = useRouter();
const analyticsStore = useAnalyticsStore();
const { formatDate } = useDateFormat();

const loading = computed(() => analyticsStore.isLoadingAnalyticsData);
const isLoadingExecutedCounts = computed(
  () => analyticsStore.isLoadingExecutedCounts
);

const surveys = computed(() => analyticsStore.availableSurveys);
const surveyExecutedCounts = computed(
  () => analyticsStore.surveyExecutedCounts
);

const searchableSurveys = computed((): SearchableSurvey[] => {
  if (!Array.isArray(surveys.value)) {
    return [];
  }
  const currentLocale = locale.value;
  return surveys.value.map((survey) => {
    try {
      const nameFormatted = formatMLString(survey.name, currentLocale);
      const descriptionFormatted = formatMLString(
        survey.description,
        currentLocale
      );
      const nameSearchable = (nameFormatted || '').toLowerCase();
      const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
      const executedCount = surveyExecutedCounts.value.get(survey.id) || 0;

      return {
        id: survey.id,
        name: survey.name,
        description: survey.description,
        status: survey.status,
        createdAt: survey.createdAt,
        name_searchable: nameSearchable,
        description_searchable: descriptionSearchable,
        executedCount,
      };
    } catch (error) {
      console.error(
        'Error processing survey in searchableSurveys:',
        survey,
        error
      );
      return {
        id: survey.id,
        name: survey.name,
        description: survey.description,
        status: survey.status,
        createdAt: survey.createdAt,
        name_searchable: '',
        description_searchable: '',
        executedCount: 0,
      };
    }
  });
});

const getStatusSeverity = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return 'info';
    case SurveyStatus.ACTIVE:
      return 'success';
    case SurveyStatus.ARCHIVED:
      return 'secondary';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return 'pi pi-pencil';
    case SurveyStatus.ACTIVE:
      return 'pi pi-check-circle';
    case SurveyStatus.ARCHIVED:
      return 'pi pi-box';
    default:
      return 'pi pi-question-circle';
  }
};

const formatSurveyStatus = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return t('surveys.status.draft');
    case SurveyStatus.ACTIVE:
      return t('surveys.status.active');
    case SurveyStatus.ARCHIVED:
      return t('surveys.status.archived');
    default:
      return status;
  }
};

const onRowClick = (event: any) => {
  if (event.data) {
    handleSurveyClick(event.data);
  }
};

const handleSurveyClick = (survey: SearchableSurvey) => {
  // Only allow navigation if executed count > 0 and counts are loaded
  if (survey.executedCount > 0 && !isLoadingExecutedCounts.value) {
    analyticsStore.selectSurvey(survey.id);
    router.push('/analytics/aggregated');
  }
};

onMounted(async () => {
  // Initialize the analytics store
  await analyticsStore.initialize();
});
</script>
