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
          type="pie"
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
  name: "SingleChoiceComponent",

  components: {
    ApexChart: VueApexCharts,
  },

  // Component props
  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  // Data
  data() {
    return {
      selectedChart: {
        type: "pie",
      },
      chartOptions: {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Fruit distribution",
          align: "center",
          margin: 40,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ["#2E93fA", "#46DA62", "#242E8A", "#E91E63", "#FF9800"],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: "bottom",
        },
        labels: ["Apple", "Mango", "Orange", "Watermelon"],
      },
      series: [44, 55, 41, 17],
      chartWidth: "500px",
    };
  },

  mounted() {},

  // Methods
  methods: {},
};
</script>

<style scoped>
.outer-wrapper {
  min-height: 100%;
}
.top-row {
  height: 60px;
  background-color: lightblue;
}
.bottom-row {
  background-color: lightgreen;
}
.chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
