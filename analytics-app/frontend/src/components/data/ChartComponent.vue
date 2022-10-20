<template>
  <div class="chart-wrapper">
    <div class="settings">
      <button @click="aggregateChartData()">Update</button>
      <el-dropdown class="chart-type-dropdown" trigger="click">
        <el-button type="primary" class="dropdown-button">
          <i class="icon" :class="this.selectedChartType.icon"></i>
          {{ this.selectedChartType.name }}<el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="chartType in chartTypes"
              :key="chartType.id"
              class="chart-type"
              @click="changeChartType(chartType)"
            >
              <i class="icon" :class="chartType.icon"></i>
              {{ chartType.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <apexcharts
      class="chart"
      id="chart-example"
      width="100%"
      height="100%"
      :options="chartOptions"
      :series="series"
      :type="this.selectedChartType.tag"
    ></apexcharts>
    <div>{{ question }}</div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ChartComponent",
  props: ["question"],
  components: {
    apexcharts: VueApexCharts,
  },
  // mounted() {
  //   this.setChartData();
  // },
  methods: {
    changeChartType(chartType) {
      this.selectedChartType = chartType;
      console.log(this.selectedChartType.tag);
    },
    setChartData() {
      this.chartOptions.xaxis = this.question["answer_options"]["en-US"];
      // this.series[0].data = [0, 1];
      console.log(this.chartOptions.xaxis);
      console.log(this.series[0].data);
      return this.chartOptions.xaxis;
    },
    addArrays(a, b) {
      return a.map((e, i) => e + b[i]);
    },
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.question["answer_options"]["en-US"],
        },
      },
      series: [
        {
          name: "series-1",
          data: [1, 0],
        },
      ],
      chartTypes: [
        {
          id: 1,
          name: "Column Chart",
          tag: "bar",
          icon: "fa-solid fa-chart-column",
        },
        {
          id: 2,
          name: "Line Chart",
          tag: "line",
          icon: "fa-solid fa-chart-line",
        },
      ],
      selectedChartType: {
        id: 1,
        name: "Column Chart",
        tag: "bar",
        icon: "fa-solid fa-chart-column",
      },
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.chart-wrapper {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.settings {
  height: 32px;
  z-index: 1;
}

.chart-type-dropdown {
  float: right;
  margin-right: 5px;
}
.dropdown-button {
  width: 180px;
}
.chart-type {
  font-family: Helvetica;
}

.chart {
  z-index: 0;
}
.icon {
  margin-right: 5px;
}
</style>
