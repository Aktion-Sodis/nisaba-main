<template>
  <v-card class="outer-wrapper">
    <v-row class="top-row">
      <v-col class="settings-column text-right">
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
    <v-row class="bottom-row">
      <v-col class="chart-column">
        <apexchart
          width="600"
          :type="chartType"
          :options="chartOptions"
          :series="series"
          class="chart"
        >
        </apexchart>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  // Component name
  name: "ChartComponent",

  components: {
    ApexChart: VueApexCharts,
  },

  // Component props
  props: {
    chartType: {
      type: String,
      default: "pie",
    },
    series: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },

  // Data
  data() {
    return {
      chartOptions: {
        chart: {
          id: "apexchart",
        },
        title: {
          text: "Set Chart Title",
          align: "center",
          margin: 40,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: "top",
        },
        labels: this.labels,
      },
      chartWidth: "500px",
    };
  },

  watch: {
    labels: {
      handler(newLabels) {
        console.log(newLabels);
        this.chartOptions = {
          labels: newLabels,
        };
      },
      immediate: true,
    },
  },

  mounted() {},

  // Methods
  methods: {},
};
</script>

<style scoped>
.outer-wrapper {
  min-height: 100%;
  background-color: white;
}
.top-row {
  height: 60px;
}
.bottom-row {
}
.chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
