<template>
  <div class="flex flex-col gap-6">
    <!-- Rating Statistics -->
    <div v-if="questionData.analytics.statistics" class="flex flex-wrap gap-2">
      <Fieldset
        :legend="$t('analytics_aggregated.rating_stats.total_responses')"
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

      <Fieldset
        v-if="
          questionData.analytics.statistics.mean !== undefined &&
          questionData.analytics.statistics.mean !== null
        "
        :legend="$t('analytics_aggregated.rating_stats.average_rating')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.mean.toFixed(1) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.min !== undefined &&
          questionData.analytics.statistics.min !== null
        "
        :legend="$t('analytics_aggregated.rating_stats.lowest_rating')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.min }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.max !== undefined &&
          questionData.analytics.statistics.max !== null
        "
        :legend="$t('analytics_aggregated.rating_stats.highest_rating')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.max }}
        </div>
      </Fieldset>
    </div>

    <!-- Chart Section -->
    <div v-if="hasChartData">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.rating_chart.title') }}
      </h3>

      <!-- Chart Tabs -->
      <Tabs v-model="activeTab" value="bar">
        <TabList>
          <Tab value="bar">
            {{ $t('analytics_aggregated.rating_chart.bar_chart') }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="bar">
            <div ref="barChartContainer" class="w-full h-96"></div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <!-- Rating Distribution Table -->
    <div v-if="ratingCounts.length > 0">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.rating_table.title') }}
      </h3>

      <DataTable
        :value="ratingCounts"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        class="p-datatable-sm"
        responsive-layout="scroll"
        sort-field="rating"
        :sort-order="1"
      >
        <Column
          field="rating"
          :header="$t('analytics_aggregated.rating_table.rating')"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Rating :model-value="data.rating" readonly :cancel="false" />
              <span class="font-semibold">{{ data.rating }}</span>
            </div>
          </template>
        </Column>

        <Column
          field="count"
          :header="$t('analytics_aggregated.rating_table.count')"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ data.count }}</span>
              <span class="text-sm text-surface-500">
                ({{ data.percentage }}%)
              </span>
            </div>
          </template>
        </Column>

        <Column
          field="percentage"
          :header="$t('analytics_aggregated.rating_table.percentage')"
          sortable
        >
          <template #body="{ data }">
            <div
              class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2"
            >
              <div
                class="h-2 rounded-full transition-all duration-300"
                :style="{
                  width: `${data.percentage}%`,
                  backgroundColor: getRatingColor(data.rating),
                }"
              ></div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- No Data Message -->
    <div v-else-if="!hasChartData" class="text-center p-8">
      <i class="pi pi-star text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.rating_responses.no_data') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Plotly from 'plotly.js-dist-min';
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QuestionData } from '@/stores/analytics';

const { t } = useI18n();

const props = defineProps<{
  questionData: QuestionData;
}>();

const activeTab = ref<'bar'>('bar');
const barChartContainer = ref<HTMLElement>();

const ratingCounts = computed(() => {
  const stats = props.questionData.analytics.statistics;
  if (!stats?.rating_counts) return [];

  const total = stats.total_responses || 0;

  return Object.entries(stats.rating_counts)
    .map(([rating, count]) => ({
      rating: parseInt(rating),
      count: count as number,
      percentage: total > 0 ? Math.round(((count as number) / total) * 100) : 0,
    }))
    .sort((a, b) => a.rating - b.rating);
});

const hasChartData = computed(() => {
  const chartData = props.questionData.analytics.chart_data;
  return !!(chartData?.bar_chart || ratingCounts.value.length > 0);
});

const getRatingColor = (rating: number) => {
  // Color scale from red (low) to green (high)
  const colors = [
    '#ef4444', // red-500 (1)
    '#f97316', // orange-500 (2)
    '#f59e0b', // amber-500 (3)
    '#eab308', // yellow-500 (4)
    '#84cc16', // lime-500 (5)
  ];

  return colors[Math.min(rating - 1, colors.length - 1)] || colors[0];
};

const createBarChart = async () => {
  if (!barChartContainer.value) return;

  const chartData = props.questionData.analytics.chart_data;
  if (!chartData?.bar_chart) return;

  // Use precomputed bar_chart data
  // x is array of strings (e.g., "1★", "2★"), y is array of counts
  // @ts-expect-error no i18n strings here desired
  const labels = chartData.bar_chart.x || [];
  const counts = chartData.bar_chart.y || [];

  // Get colors for each rating
  const colors = labels.map((label: string) => {
    // Extract rating number from label (e.g., "1★" -> 1)
    const ratingMatch = label.match(/\d+/);
    const rating = ratingMatch ? parseInt(ratingMatch[0]) : 1;
    return getRatingColor(rating);
  });

  const plotData: any = [
    {
      type: 'bar',
      x: labels,
      y: counts,
      marker: {
        color: colors,
      },
      hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>',
    },
  ];

  const layout: any = {
    xaxis: {
      title: t('analytics_aggregated.rating_chart.rating'),
      tickangle: 0,
    },
    yaxis: {
      title: t('analytics_aggregated.rating_chart.count'),
    },
    margin: { t: 20, b: 100, l: 60, r: 20 },
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: 12,
    },
  };

  const config: any = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'zoom2d',
      'pan2d',
      'select2d',
      'lasso2d',
      'zoomIn2d',
      'zoomOut2d',
      'autoScale2d',
      'resetScale2d',
      'hoverClosestCartesian',
      'hoverCompareCartesian',
      'toggleSpikelines',
    ],
    toImageButtonOptions: {
      format: 'png',
      filename: 'rating-bar-chart',
      height: 600,
      width: 800,
      scale: 2,
    },
  };

  await Plotly.newPlot(barChartContainer.value, plotData, layout, config);
};

const resizeChart = (container: HTMLElement | undefined) => {
  if (container) {
    Plotly.Plots.resize(container);
  }
};

watch(
  () => props.questionData.analytics.chart_data,
  () => {
    nextTick(() => {
      createBarChart();
    });
  }
);

onMounted(() => {
  nextTick(() => {
    // Create chart on mount
    createBarChart();
  });

  window.addEventListener('resize', () => {
    resizeChart(barChartContainer.value);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    resizeChart(barChartContainer.value);
  });
  if (barChartContainer.value) {
    Plotly.purge(barChartContainer.value);
  }
});
</script>
