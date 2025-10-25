<template>
  <div class="flex flex-col gap-6">
    <!-- Rating Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.rating_stats.total_responses') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.rating_stats.average_rating') }}
        </div>
        <div class="text-xl font-semibold">
          {{ averageRating.toFixed(1) }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.rating_stats.highest_rating') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.max || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.rating_stats.lowest_rating') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.min || 0 }}
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div
      v-if="hasChartData"
      class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg"
    >
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.rating_chart.title') }}
      </h3>

      <!-- Chart Type Selector -->
      <div class="flex gap-2 mb-4">
        <Button
          :label="$t('analytics_aggregated.rating_chart.bar_chart')"
          :class="{ 'p-button-outlined': chartType !== 'bar' }"
          size="small"
          @click="chartType = 'bar'"
        />
        <Button
          :label="$t('analytics_aggregated.rating_chart.histogram')"
          :class="{ 'p-button-outlined': chartType !== 'histogram' }"
          size="small"
          @click="chartType = 'histogram'"
        />
      </div>

      <!-- Chart Container -->
      <div ref="chartContainer" class="w-full h-96"></div>
    </div>

    <!-- Rating Distribution Table -->
    <div v-if="ratingCounts.length > 0">
      <h3 class="text-lg font-semibold mb-4">
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
    <div v-else class="text-center p-8">
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

const chartContainer = ref<HTMLElement>();
const chartType = ref<'bar' | 'histogram'>('bar');

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
  return ratingCounts.value.length > 0;
});

const averageRating = computed(() => {
  const stats = props.questionData.analytics.statistics;
  return stats?.mean || 0;
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

const createChart = async () => {
  if (!chartContainer.value || !hasChartData.value) return;

  const data = ratingCounts.value;
  const colors = data.map((item) => getRatingColor(item.rating));

  let plotData: any;
  let layout: any;

  if (chartType.value === 'bar') {
    plotData = [
      {
        type: 'bar',
        x: data.map((item) => item.rating),
        y: data.map((item) => item.count),
        marker: {
          color: colors,
        },
        hovertemplate: '<b>Rating: %{x}</b><br>Count: %{y}<extra></extra>',
      },
    ];

    layout = {
      xaxis: {
        title: t('analytics_aggregated.rating_chart.rating'),
        tickmode: 'linear',
        tick0: 1,
        dtick: 1,
      },
      yaxis: {
        title: t('analytics_aggregated.rating_chart.count'),
      },
      margin: { t: 20, b: 60, l: 60, r: 20 },
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 12,
      },
    };
  } else {
    // Histogram
    const allRatings = data.flatMap((item) =>
      Array(item.count).fill(item.rating)
    );

    plotData = [
      {
        type: 'histogram',
        x: allRatings,
        nbinsx:
          Math.max(...data.map((item) => item.rating)) -
          Math.min(...data.map((item) => item.rating)) +
          1,
        marker: {
          color: '#3b82f6', // blue-500
        },
        hovertemplate: '<b>Rating: %{x}</b><br>Count: %{y}<extra></extra>',
      },
    ];

    layout = {
      xaxis: {
        title: t('analytics_aggregated.rating_chart.rating'),
        tickmode: 'linear',
        tick0: 1,
        dtick: 1,
      },
      yaxis: {
        title: t('analytics_aggregated.rating_chart.count'),
      },
      margin: { t: 20, b: 60, l: 60, r: 20 },
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 12,
      },
    };
  }

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  await Plotly.newPlot(chartContainer.value, plotData, layout, config);
};

const resizeChart = () => {
  if (chartContainer.value) {
    Plotly.Plots.resize(chartContainer.value);
  }
};

watch([chartType, ratingCounts], () => {
  nextTick(() => {
    createChart();
  });
});

onMounted(() => {
  nextTick(() => {
    createChart();
  });

  window.addEventListener('resize', resizeChart);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
  if (chartContainer.value) {
    Plotly.purge(chartContainer.value);
  }
});
</script>
