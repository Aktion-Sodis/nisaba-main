<template>
  <v-container class="pa-0 outer-wrapper">
    <v-row class="top-row">
      <v-col cols="4" offset="8" class="settings text-right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              :prepend-icon="selectedChartType.icon"
              append-icon="mdi-menu-down"
              class="mr-3 menu-btn"
              size="small"
            >
              <div class="chart-type">{{ selectedChartType.name }}</div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(chartType, index) in chartTypes"
              :key="index"
              :value="index"
              @click="changeChartType(chartType)"
            >
              <template v-slot:prepend>
                <v-icon size="20" :icon="chartType.icon"></v-icon>
              </template>
              <v-list-item-title>{{ chartType.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          :ripple="false"
          color="primary"
          size="small"
          @click="settings = true"
        >
          <v-icon size="20">mdi-cog</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="bottom-row">
      <v-col cols="12" class="chart-component">
        <apexchart
          ref="realtimeChart"
          :options="chartOptions"
          :series="series"
          :type="selectedChartType.tag"
          class="chart"
        ></apexchart>
      </v-col>
    </v-row>

    <v-dialog v-model="settings" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Chart Settings</span>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels variant="accordion">
            <!-- Title -->
            <v-expansion-panel>
              <v-expansion-panel-title>Title</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-text-field
                  label="Chart Title"
                  variant="outlined"
                ></v-text-field>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- X-axis -->
            <v-expansion-panel>
              <v-expansion-panel-title>x-axis</v-expansion-panel-title>
              <v-expansion-panel-text>
                <!-- Content for x-axis settings -->
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Y-axis -->
            <v-expansion-panel>
              <v-expansion-panel-title>y-axis</v-expansion-panel-title>
              <v-expansion-panel-text>
                <!-- Content for y-axis settings -->
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Data Tables -->
            <v-expansion-panel>
              <v-expansion-panel-title>Data Tables</v-expansion-panel-title>
              <v-expansion-panel-text>
                <!-- Content for data tables settings -->
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Plot Options -->
            <v-expansion-panel>
              <v-expansion-panel-title>Plot Options</v-expansion-panel-title>
              <v-expansion-panel-text>
                <!-- Content for plot options settings -->
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="settings = false"
            >Close</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="saveSettings"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  // Component name
  name: "ChartComponent",

  // Component props
  props: {
    xaxisCategories: {
      type: Array,
      required: true,
    },
    seriesData: {
      type: Array,
      required: true,
    },
    chartTitle: {
      type: String,
      required: true,
    },
  },

  // Components used in the template
  components: {
    apexcharts: VueApexCharts,
  },

  // Data properties
  data() {
    return {
      settings: false,
      chartTypes: [
        {
          id: 1,
          name: "Bar Chart",
          tag: "bar",
          icon: "mdi-chart-bar",
        },
        {
          id: 2,
          name: "Line Chart",
          tag: "line",
          icon: "mdi-chart-line",
        },
      ],
      selectedChartType: {
        id: 1,
        name: "Bar Chart",
        tag: "bar",
        icon: "mdi-chart-bar",
      },
      series: [
        {
          name: "Data",
          data: this.seriesData,
        },
      ],
      chartOptions: {
        chart: {
          height: 500,
          type: "bar",
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: this.xaxisCategories,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              //   return val + "%";
              return val;
            },
          },
        },
        title: {
          text: this.chartTitle,
          floating: false,
          offsetY: 0,
          align: "center",
          style: {
            color: "#444",
          },
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  },

  // Computed properties
  computed: {},

  // Watchers
  watch: {
    xaxisCategories: {
      immediate: true,
      handler(newCategories) {
        this.updateChart();
      },
    },
    seriesData: {
      immediate: true,
      handler(newData) {
        this.updateChart();
      },
    },
  },

  // Lifecycle hooks
  created() {},

  // Methods
  methods: {
    saveSettings() {
      // Handle the save settings logic here
      this.settings = false;
    },
    changeChartType(chartType) {
      this.selectedChartType = chartType;
    },
    updateChart() {
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.xaxisCategories,
        },
        title: {
          ...this.chartOptions.title,
          text: this.chartTitle,
        },
      };
      this.series[0].data = this.seriesData;
    },
  },
};
</script>

<style scoped>
.chart-type {
  width: 100px;
}
.outer-wrapper {
  height: 100%;
}
.top-row {
  height: 60px;
  margin-top: 5px;
  margin-right: 5px;
}
.bottom-row {
  height: calc(100% - 60px);
  background-color: white;
}
/* .chart-component {
    height: 500px;
}
.chart {
    height: 500px;
} */
.menu-btn {
  width: 200px;
}
</style>
