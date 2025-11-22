<template>
  <div class="flex flex-col gap-6">
    <!-- Numeric Statistics -->
    <div v-if="questionData.analytics.statistics" class="flex flex-wrap gap-2">
      <Fieldset
        :legend="$t('analytics_aggregated.numeric_stats.total_responses')"
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
        :legend="$t('analytics_aggregated.numeric_stats.mean')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.mean) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.median !== undefined &&
          questionData.analytics.statistics.median !== null
        "
        :legend="$t('analytics_aggregated.numeric_stats.median')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.median) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.min !== undefined &&
          questionData.analytics.statistics.min !== null
        "
        :legend="$t('analytics_aggregated.numeric_stats.min')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.min) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.max !== undefined &&
          questionData.analytics.statistics.max !== null
        "
        :legend="$t('analytics_aggregated.numeric_stats.max')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.max) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.range !== undefined &&
          questionData.analytics.statistics.range !== null
        "
        :legend="$t('analytics_aggregated.numeric_stats.range')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.range) }}
        </div>
      </Fieldset>

      <Fieldset
        v-if="
          questionData.analytics.statistics.std_deviation !== undefined &&
          questionData.analytics.statistics.std_deviation !== null
        "
        :legend="$t('analytics_aggregated.numeric_stats.std_deviation')"
        class="flex-1"
      >
        <div class="text-body">
          {{ formatNumber(questionData.analytics.statistics.std_deviation) }}
        </div>
      </Fieldset>
    </div>

    <!-- Chart Section -->
    <div v-if="hasChartData">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.numeric_chart.title') }}
      </h3>

      <!-- Chart Tabs -->
      <Tabs v-model="activeTab" value="histogram">
        <TabList>
          <Tab value="histogram">
            {{ $t('analytics_aggregated.numeric_chart.histogram') }}
          </Tab>
          <Tab value="boxplot">
            {{ $t('analytics_aggregated.numeric_chart.box_plot') }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="histogram">
            <div
              ref="histogramChartContainer"
              class="w-full h-96 overflow-hidden"
            ></div>
          </TabPanel>
          <TabPanel value="boxplot">
            <div
              ref="boxplotChartContainer"
              class="w-full h-96 overflow-hidden"
            ></div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <!-- No Data Message -->
    <div v-else-if="!hasChartData" class="text-center p-8">
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

const activeTab = ref<'histogram' | 'boxplot'>('histogram');
const histogramChartContainer = ref<HTMLElement>();
const boxplotChartContainer = ref<HTMLElement>();

const hasChartData = computed(() => {
  // Check if we have answers with numeric values
  return (
    props.questionData.answers &&
    props.questionData.answers.length > 0 &&
    props.questionData.analytics.statistics
  );
});

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '0';

  // Format based on the question type
  if (props.questionData.question_type === 'INT') {
    return Math.round(value).toLocaleString();
  } else {
    return value.toFixed(2);
  }
};

const getRawNumericValues = () => {
  // Extract numeric values from answers
  const values: number[] = [];

  if (props.questionData.answers) {
    props.questionData.answers.forEach((answer) => {
      const value = answer.answer_value as number;
      if (typeof value === 'number' && !isNaN(value)) {
        values.push(value);
      }
    });
  }

  return values;
};

const createHistogramChart = async () => {
  if (!histogramChartContainer.value) return;

  // Use raw values from answers with Plotly's built-in histogram
  const rawValues = getRawNumericValues();
  if (rawValues.length === 0) return;

  const plotData: any = [
    {
      type: 'histogram',
      x: rawValues,
      marker: {
        color: '#3b82f6', // blue-500
      },
      hovertemplate: '<b>Value: %{x}</b><br>Count: %{y}<extra></extra>',
      autobinx: true, // Let Plotly automatically calculate bins
    },
  ];

  const layout: any = {
    autosize: true,
    width: null, // Let container determine width
    height: null, // Let container determine height
    xaxis: {
      title: t('analytics_aggregated.numeric_chart.value'),
    },
    yaxis: {
      title: t('analytics_aggregated.numeric_chart.count'),
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
      filename: 'histogram-chart',
      height: 600,
      width: 800,
      scale: 2,
    },
  };

  await Plotly.newPlot(histogramChartContainer.value, plotData, layout, config);
};

const createBoxplotChart = async () => {
  if (!boxplotChartContainer.value) return;

  const stats = props.questionData.analytics.statistics;
  if (!stats) return;

  // Create boxplot from statistics
  // Estimate Q1 and Q3 from mean and std_deviation (for normal distribution approximation)
  const mean = stats.mean || 0;
  const stdDev = stats.std_deviation || 0;
  const median = stats.median || mean;
  const min = stats.min || 0;
  const max = stats.max || 0;

  // Estimate quartiles (approximation for normal distribution)
  // For a normal distribution: Q1 ≈ μ - 0.675σ, Q3 ≈ μ + 0.675σ
  const q1 = Math.max(min, mean - 0.675 * stdDev);
  const q3 = Math.min(max, mean + 0.675 * stdDev);

  // Create a synthetic dataset that approximates our statistics
  // Since Plotly computes boxplot statistics from data, we create data points
  // that when computed will approximate our desired statistics
  const syntheticData: number[] = [];
  const totalPoints = 100; // Enough points for reasonable approximation

  // Distribute points to approximate the desired statistics
  // 25% below Q1, 25% between Q1 and median, 25% between median and Q3, 25% above Q3
  const pointsPerQuartile = Math.floor(totalPoints / 4);

  // First quartile: points between min and q1
  for (let i = 0; i < pointsPerQuartile; i++) {
    syntheticData.push(min + (q1 - min) * (i / pointsPerQuartile));
  }

  // Second quartile: points between q1 and median
  for (let i = 0; i < pointsPerQuartile; i++) {
    syntheticData.push(q1 + (median - q1) * (i / pointsPerQuartile));
  }

  // Third quartile: points between median and q3
  for (let i = 0; i < pointsPerQuartile; i++) {
    syntheticData.push(median + (q3 - median) * (i / pointsPerQuartile));
  }

  // Fourth quartile: points between q3 and max
  for (let i = 0; i < pointsPerQuartile; i++) {
    syntheticData.push(q3 + (max - q3) * (i / pointsPerQuartile));
  }

  // Ensure min, max, and median are included
  syntheticData.push(min);
  syntheticData.push(max);
  syntheticData.push(median);

  const plotData: any = [
    {
      type: 'box',
      y: syntheticData,
      boxmean: false, // Don't show mean/sigma diamond
      boxpoints: false, // Don't show individual points
      marker: {
        color: '#3b82f6', // blue-500
      },
      hovertemplate:
        '<b>Min: ' +
        formatNumber(min) +
        '</b><br>Q1: ' +
        formatNumber(q1) +
        '<br>Median: ' +
        formatNumber(median) +
        '<br>Mean: ' +
        formatNumber(mean) +
        '<br>Q3: ' +
        formatNumber(q3) +
        '<br>Max: ' +
        formatNumber(max) +
        '<extra></extra>',
    },
  ];

  const layout: any = {
    autosize: true,
    width: null, // Let container determine width
    height: null, // Let container determine height
    yaxis: {
      title: t('analytics_aggregated.numeric_chart.value'),
    },
    margin: { t: 20, b: 100, l: 60, r: 20 },
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: 12,
    },
    showlegend: false,
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
      filename: 'boxplot-chart',
      height: 600,
      width: 800,
      scale: 2,
    },
  };

  await Plotly.newPlot(boxplotChartContainer.value, plotData, layout, config);
};

const resizeChart = (container: HTMLElement | undefined) => {
  if (container) {
    Plotly.Plots.resize(container);
  }
};

watch(
  () => [props.questionData.answers, props.questionData.analytics.statistics],
  () => {
    nextTick(() => {
      createHistogramChart();
      createBoxplotChart();
    });
  }
);

onMounted(() => {
  nextTick(() => {
    // Create all charts on mount so they're ready when switching tabs
    createHistogramChart();
    createBoxplotChart();
  });

  window.addEventListener('resize', () => {
    resizeChart(histogramChartContainer.value);
    resizeChart(boxplotChartContainer.value);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    resizeChart(histogramChartContainer.value);
    resizeChart(boxplotChartContainer.value);
  });
  if (histogramChartContainer.value) {
    Plotly.purge(histogramChartContainer.value);
  }
  if (boxplotChartContainer.value) {
    Plotly.purge(boxplotChartContainer.value);
  }
});
</script>
