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
    <div
      v-if="hasChartData"
      class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg"
    >
      <h3 class="text-section-inner-subtitle mb-4">
        {{ $t('analytics_aggregated.choice_chart.title') }}
      </h3>

      <!-- Chart Type Selector -->
      <div class="flex gap-2 mb-4">
        <Button
          :label="$t('analytics_aggregated.choice_chart.pie_chart')"
          :class="{ 'p-button-outlined': chartType !== 'pie' }"
          size="small"
          @click="chartType = 'pie'"
        />
        <Button
          :label="$t('analytics_aggregated.choice_chart.bar_chart')"
          :class="{ 'p-button-outlined': chartType !== 'bar' }"
          size="small"
          @click="chartType = 'bar'"
        />
      </div>

      <!-- Chart Container -->
      <div ref="chartContainer" class="w-full h-96"></div>
    </div>

    <!-- Option Counts Table -->
    <div v-if="optionCounts.length > 0">
      <h3 class="text-lg font-semibold mb-4">
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
  isMultiple: boolean;
}>();

const chartContainer = ref<HTMLElement>();
const chartType = ref<'pie' | 'bar'>('pie');

const optionCounts = computed(() => {
  const stats = props.questionData.analytics.statistics;
  if (!stats?.option_counts) return [];

  const total = stats.total_responses || 0;
  const colors = getChartColors();

  return Object.entries(stats.option_counts).map(([option, count], index) => ({
    option: { languageKeys: ['en'], languageTexts: [option] }, // Convert to I18nString format
    count: count as number,
    percentage: total > 0 ? Math.round(((count as number) / total) * 100) : 0,
    color: colors[index % colors.length],
  }));
});

const hasChartData = computed(() => {
  return optionCounts.value.length > 0;
});

const getChartColors = () => {
  // Tailwind CSS colors that work well in both light and dark modes
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

const createChart = async () => {
  if (!chartContainer.value || !hasChartData.value) return;

  const data = optionCounts.value;
  const colors = data.map((item) => item.color);

  let plotData: any;
  let layout: any;

  if (chartType.value === 'pie') {
    plotData = [
      {
        type: 'pie',
        labels: data.map((item) => formatMLString(item.option, locale.value)),
        values: data.map((item) => item.count),
        marker: {
          colors: colors,
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        hovertemplate:
          '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>',
      },
    ];

    layout = {
      showlegend: true,
      legend: {
        orientation: 'v',
        x: 1.02,
        y: 0.5,
      },
      margin: { t: 20, b: 20, l: 20, r: 100 },
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 12,
      },
    };
  } else {
    plotData = [
      {
        type: 'bar',
        x: data.map((item) => formatMLString(item.option, locale.value)),
        y: data.map((item) => item.count),
        marker: {
          color: colors,
        },
        hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>',
      },
    ];

    layout = {
      xaxis: {
        title: t('analytics_aggregated.choice_chart.options'),
        tickangle: -45,
      },
      yaxis: {
        title: t('analytics_aggregated.choice_chart.count'),
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

watch([chartType, optionCounts], () => {
  nextTick(() => {
    createChart();
  });
});

watch(locale, () => {
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
