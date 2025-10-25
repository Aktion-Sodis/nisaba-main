<template>
  <div class="flex flex-col gap-6">
    <!-- Numeric Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.total_responses') }}
        </div>
        <div class="text-xl font-semibold">
          {{ questionData.analytics.statistics.total_responses || 0 }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.mean') }}
        </div>
        <div class="text-xl font-semibold">
          {{ formatNumber(questionData.analytics.statistics.mean || 0) }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.median') }}
        </div>
        <div class="text-xl font-semibold">
          {{ formatNumber(questionData.analytics.statistics.median || 0) }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.std_deviation') }}
        </div>
        <div class="text-xl font-semibold">
          {{
            formatNumber(questionData.analytics.statistics.std_deviation || 0)
          }}
        </div>
      </div>
    </div>

    <!-- Additional Statistics -->
    <div
      v-if="questionData.analytics.statistics"
      class="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.min') }}
        </div>
        <div class="text-xl font-semibold">
          {{ formatNumber(questionData.analytics.statistics.min || 0) }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.max') }}
        </div>
        <div class="text-xl font-semibold">
          {{ formatNumber(questionData.analytics.statistics.max || 0) }}
        </div>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
        <div class="text-sm text-surface-600 dark:text-surface-400">
          {{ $t('analytics_aggregated.numeric_stats.range') }}
        </div>
        <div class="text-xl font-semibold">
          {{ formatNumber(questionData.analytics.statistics.range || 0) }}
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div
      v-if="hasChartData"
      class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg"
    >
      <h3 class="text-lg font-semibold mb-4">
        {{ $t('analytics_aggregated.numeric_chart.title') }}
      </h3>

      <!-- Chart Type Selector -->
      <div class="flex gap-2 mb-4">
        <Button
          :label="$t('analytics_aggregated.numeric_chart.histogram')"
          :class="{ 'p-button-outlined': chartType !== 'histogram' }"
          size="small"
          @click="chartType = 'histogram'"
        />
        <Button
          :label="$t('analytics_aggregated.numeric_chart.box_plot')"
          :class="{ 'p-button-outlined': chartType !== 'box' }"
          size="small"
          @click="chartType = 'box'"
        />
      </div>

      <!-- Chart Container -->
      <div ref="chartContainer" class="w-full h-96"></div>
    </div>

    <!-- No Data Message -->
    <div v-else class="text-center p-8">
      <i class="pi pi-calculator text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.numeric_responses.no_data') }}
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
const chartType = ref<'histogram' | 'box'>('histogram');

const hasChartData = computed(() => {
  const chartData = props.questionData.analytics.chart_data;
  return chartData && chartData.histogram;
});

const formatNumber = (value: number) => {
  if (value === null || value === undefined) return '0';

  // Format based on the question type
  if (props.questionData.question_type === 'INT') {
    return Math.round(value).toLocaleString();
  } else {
    return value.toFixed(2);
  }
};

const createChart = async () => {
  if (!chartContainer.value || !hasChartData.value) return;

  const stats = props.questionData.analytics.statistics;
  const chartData = props.questionData.analytics.chart_data;

  let plotData: any;
  let layout: any;

  if (chartType.value === 'histogram') {
    // Use histogram data from chart_data
    const histogramData = chartData?.histogram;

    if (histogramData && histogramData.bins && histogramData.counts) {
      plotData = [
        {
          type: 'bar',
          x: histogramData.bins,
          y: histogramData.counts,
          marker: {
            color: '#3b82f6', // blue-500
          },
          hovertemplate: '<b>Value: %{x}</b><br>Count: %{y}<extra></extra>',
        },
      ];
    } else {
      // Fallback: create histogram from raw data if available
      const rawValues = getRawNumericValues();
      if (rawValues.length > 0) {
        plotData = [
          {
            type: 'histogram',
            x: rawValues,
            marker: {
              color: '#3b82f6', // blue-500
            },
            hovertemplate: '<b>Value: %{x}</b><br>Count: %{y}<extra></extra>',
          },
        ];
      } else {
        return; // No data to plot
      }
    }

    layout = {
      xaxis: {
        title: t('analytics_aggregated.numeric_chart.value'),
      },
      yaxis: {
        title: t('analytics_aggregated.numeric_chart.count'),
      },
      margin: { t: 20, b: 60, l: 60, r: 20 },
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 12,
      },
    };
  } else {
    // Box plot
    const rawValues = getRawNumericValues();
    if (rawValues.length === 0) return;

    plotData = [
      {
        type: 'box',
        y: rawValues,
        marker: {
          color: '#3b82f6', // blue-500
        },
        boxpoints: 'outliers',
        hovertemplate: '<b>Value: %{y}</b><extra></extra>',
      },
    ];

    layout = {
      yaxis: {
        title: t('analytics_aggregated.numeric_chart.value'),
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

const getRawNumericValues = () => {
  // Extract numeric values from answers
  const values: number[] = [];

  if (props.questionData.answers) {
    props.questionData.answers.forEach((answer) => {
      const value =
        props.questionData.question_type === 'INT'
          ? (answer.answer_value as number)
          : (answer.answer_value as number);

      if (typeof value === 'number' && !isNaN(value)) {
        values.push(value);
      }
    });
  }

  return values;
};

const resizeChart = () => {
  if (chartContainer.value) {
    Plotly.Plots.resize(chartContainer.value);
  }
};

watch([chartType, hasChartData], () => {
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
