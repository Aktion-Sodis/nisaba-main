<template>
  <div class="flex flex-col gap-6">
    <!-- Choice Statistics -->
    <div v-if="questionData.analytics.statistics" class="flex flex-wrap gap-2">
      <Fieldset
        :legend="$t('analytics_aggregated.choice_stats.total_responses')"
        class="flex-1"
      >
        <div class="text-body">
          {{ questionData.analytics.statistics.total_responses || 0 }}
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
    </div>

    <!-- Chart Section -->
    <div v-if="hasChartData">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.choice_chart.title') }}
      </h3>

      <!-- Chart Tabs -->
      <Tabs v-model="activeTab" value="pie">
        <TabList>
          <Tab value="pie">
            {{ $t('analytics_aggregated.choice_chart.pie_chart') }}
          </Tab>
          <Tab value="bar">
            {{ $t('analytics_aggregated.choice_chart.bar_chart') }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="pie">
            <div ref="pieChartContainer" class="w-full h-96"></div>
          </TabPanel>
          <TabPanel value="bar">
            <div ref="barChartContainer" class="w-full h-96"></div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <!-- Option Counts Table -->
    <div v-if="optionCounts.length > 0">
      <h3 class="text-label mb-4">
        {{ $t('analytics_aggregated.choice_table.title') }}
      </h3>

      <DataTable
        :value="optionCounts"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        class="p-datatable-sm"
        responsive-layout="scroll"
        sort-field="count"
        :sort-order="-1"
      >
        <Column
          field="option"
          :header="$t('analytics_aggregated.choice_table.option')"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded"
                :style="{ backgroundColor: data.color }"
              ></div>
              <span>{{ formatMLString(data.option, locale) }}</span>
            </div>
          </template>
        </Column>

        <Column
          field="count"
          :header="$t('analytics_aggregated.choice_table.count')"
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
          :header="$t('analytics_aggregated.choice_table.percentage')"
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
                  backgroundColor: data.color,
                }"
              ></div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- No Data Message -->
    <div v-else class="text-center p-8">
      <i class="pi pi-list text-4xl text-surface-400 mb-4"></i>
      <p class="text-oneliner-light text-surface-500">
        {{ $t('analytics_aggregated.choice_responses.no_data') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Plotly from 'plotly.js-dist-min';
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QuestionData } from '@/stores/analytics';
import { formatMLString } from '@/utils/formatStrings';

const { t, locale } = useI18n();

const props = defineProps<{
  questionData: QuestionData;
}>();

const activeTab = ref<'pie' | 'bar'>('pie');
const pieChartContainer = ref<HTMLElement>();
const barChartContainer = ref<HTMLElement>();

const optionCounts = computed(() => {
  const stats = props.questionData.analytics.statistics;
  if (!stats?.option_counts) return [];

  const total = stats.total_responses || 0;
  const colors = getChartColors();

  return Object.entries(stats.option_counts).map(([_, optionData], index) => {
    const data = optionData as unknown as { text: any; count: number };
    return {
      option: data.text,
      count: data.count,
      percentage: total > 0 ? Math.round((data.count / total) * 100) : 0,
      color: colors[index % colors.length],
    };
  });
});

const hasChartData = computed(() => {
  const chartData = props.questionData.analytics.chart_data;
  return !!(
    chartData?.pie_chart ||
    chartData?.bar_chart ||
    optionCounts.value.length > 0
  );
});

const getChartColors = () => {
  return [
    '#3b82f6', // blue-500
    '#ef4444', // red-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316', // orange-500
    '#ec4899', // pink-500
    '#6b7280', // gray-500
  ];
};

const createPieChart = async () => {
  if (!pieChartContainer.value) return;

  const chartData = props.questionData.analytics.chart_data;
  if (!chartData?.pie_chart) return;

  const labels = chartData.pie_chart.labels.map((label) =>
    formatMLString(label, locale.value)
  );
  const values = chartData.pie_chart.values;
  const colors = getChartColors().slice(0, labels.length);

  const plotData: any = [
    {
      type: 'pie',
      labels: labels,
      values: values,
      marker: {
        colors: colors,
      },
      textinfo: 'percent',
      textposition: 'inside',
      // Make pie chart smaller to leave room for legend
      domain: {
        x: [0, 0.65],
        y: [0, 1],
      },
      hovertemplate:
        '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>',
    },
  ];

  const layout: any = {
    showlegend: true,
    legend: {
      orientation: 'v',
      x: 1.05,
      y: 0.5,
    },
    margin: { t: 20, b: 20, l: 20, r: 150 },
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
      filename: 'pie-chart',
      height: 600,
      width: 800,
      scale: 2,
    },
  };

  await Plotly.newPlot(pieChartContainer.value, plotData, layout, config);
};

const createBarChart = async () => {
  if (!barChartContainer.value) return;

  const chartData = props.questionData.analytics.chart_data;
  if (!chartData?.bar_chart) return;

  // Handle both x and labels properties
  const xData = (chartData.bar_chart as any).x || chartData.bar_chart.labels;
  const labels = xData.map((label: any) => formatMLString(label, locale.value));
  const values = chartData.bar_chart.y;
  const colors = getChartColors().slice(0, labels.length);

  const plotData: any = [
    {
      type: 'bar',
      x: labels,
      y: values,
      marker: {
        color: colors,
      },
      hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>',
    },
  ];

  const layout: any = {
    xaxis: {
      title: t('analytics_aggregated.choice_chart.options'),
      tickangle: -45,
    },
    yaxis: {
      title: t('analytics_aggregated.choice_chart.count'),
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
      filename: 'bar-chart',
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

watch(locale, () => {
  nextTick(() => {
    // Recreate all charts when locale changes
    createPieChart();
    createBarChart();
  });
});

onMounted(() => {
  nextTick(() => {
    // Create all charts on mount so they're ready when switching tabs
    createPieChart();
    createBarChart();
  });

  window.addEventListener('resize', () => {
    resizeChart(pieChartContainer.value);
    resizeChart(barChartContainer.value);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    resizeChart(pieChartContainer.value);
    resizeChart(barChartContainer.value);
  });
  if (pieChartContainer.value) {
    Plotly.purge(pieChartContainer.value);
  }
  if (barChartContainer.value) {
    Plotly.purge(barChartContainer.value);
  }
});
</script>
