<template>
  <div class="h-full pb-4">
    <div v-if="!analyticsStore.selectedSurvey" class="h-full">
      <Card class="h-full">
        <template #title>
          <div class="flex justify-between items-center w-full">
            <span class="text-screen-title">
              {{ $t('apps.apps.analytics_executed_survey_overview.title') }}
            </span>
          </div>
        </template>

        <template #subtitle>
          <span class="text-oneliner-light">
            {{ $t('apps.apps.analytics_executed_survey_overview.description') }}
          </span>
        </template>

        <template #content>
          <div
            class="flex flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <i class="pi pi-chart-bar text-[3rem] text-surface-400"></i>
            <p class="text-oneliner-light text-surface-500">
              {{ $t('analytics_executed_survey_overview.no_survey_selected') }}
            </p>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex flex-col gap-4 h-full w-full">
      <!-- Filter Card -->
      <analytics-filter-card />

      <!-- Executed Surveys Table -->
      <Card class="flex-1 min-h-0">
        <template #content>
          <DataTable
            :value="analyticsStore.filteredExecutedSurveys"
            :loading="analyticsStore.isLoadingExecutedSurveys"
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
              <span class="text-body">
                {{ $t('analytics_executed_survey_overview.no_surveys_found') }}
              </span>
            </template>
            <template #loading>
              <span class="text-body">
                {{ $t('analytics_executed_survey_overview.loading_surveys') }}
              </span>
            </template>

            <!-- Date Column -->
            <Column
              field="date"
              :header="$t('analytics_executed_survey_overview.columns.date')"
              sortable
              style="min-width: 10rem"
            >
              <template #body="slotProps">
                {{ formatDate(slotProps.data.date) }}
              </template>
            </Column>

            <!-- Entity Column -->
            <Column
              :header="$t('analytics_executed_survey_overview.columns.entity')"
              sortable
              style="min-width: 12rem"
            >
              <template #body="slotProps">
                {{ getEntityName(slotProps.data) }}
              </template>
            </Column>

            <!-- Executor Column -->
            <Column
              :header="
                $t('analytics_executed_survey_overview.columns.executor')
              "
              sortable
              style="min-width: 12rem"
            >
              <template #body="slotProps">
                {{ getExecutorName(slotProps.data) }}
              </template>
            </Column>

            <!-- Checkbox Column -->
            <Column
              :header="
                $t(
                  'analytics_executed_survey_overview.columns.included_in_analytics'
                )
              "
              :exportable="false"
              style="min-width: 12rem"
              header-style="text-align: right"
            >
              <template #body="slotProps">
                <div class="flex justify-end">
                  <Checkbox
                    :model-value="slotProps.data.useForAnalytics ?? true"
                    :binary="true"
                    @change="
                      (event: any) =>
                        handleCheckboxChange(
                          slotProps.data.id,
                          event.checked ?? false
                        )
                    "
                    @click.stop
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { ExecutedSurvey } from '@/API';
import { useAnalyticsStore } from '@/stores/analytics';
import { useDateFormat } from '@/utils/dateFormat';
import { formatMLString } from '@/utils/formatStrings';
import AnalyticsFilterCard from '@/views/analyticsaggregated/components/AnalyticsFilterCard.vue';

const { locale, t } = useI18n();
const router = useRouter();
const analyticsStore = useAnalyticsStore();
const toast = useToast();
const { formatDate } = useDateFormat();

const getEntityName = (survey: ExecutedSurvey): string => {
  const entityId = survey.appliedIntervention?.entityAppliedInterventionsId;
  if (!entityId) return '-';

  const entity = analyticsStore.availableEntities.find(
    (e) => e.id === entityId
  );
  if (!entity) return '-';

  return formatMLString(entity.name, locale.value) || '-';
};

const getExecutorName = (survey: ExecutedSurvey): string => {
  if (!survey.whoExecutedIt) return '-';

  const firstName = survey.whoExecutedIt.firstName || '';
  const lastName = survey.whoExecutedIt.lastName || '';
  const name = `${firstName} ${lastName}`.trim();

  return name || survey.whoExecutedIt.id || '-';
};

const handleCheckboxChange = async (surveyId: string, value: boolean) => {
  try {
    await analyticsStore.toggleExecutedSurveyAnalytics(surveyId, value);
    const toastKey = value ? 'included' : 'excluded';
    toast.add({
      severity: 'success',
      summary: t(
        `analytics_executed_survey_overview.toast.success.${toastKey}.title`
      ),
      detail: t(
        `analytics_executed_survey_overview.toast.success.${toastKey}.detail`,
        { surveyId }
      ),
      life: 3000,
    });
  } catch (error) {
    const toastKey = value ? 'include' : 'exclude';
    toast.add({
      severity: 'error',
      summary: t(
        `analytics_executed_survey_overview.toast.error.${toastKey}.title`
      ),
      detail:
        error instanceof Error
          ? error.message
          : t(
              `analytics_executed_survey_overview.toast.error.${toastKey}.detail`,
              { surveyId }
            ),
      life: 5000,
    });
  }
};

const onRowClick = (event: any) => {
  if (event.data) {
    analyticsStore.selectExecutedSurvey(event.data.id);
    router.push('/analytics/survey-details');
  }
};
</script>
