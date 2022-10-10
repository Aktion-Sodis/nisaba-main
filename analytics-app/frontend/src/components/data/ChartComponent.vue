<template>
  <div class="chart-wrapper">
    <div class="settings">
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
      ref="realtimeChart"
      class="chart"
      id="chart-example"
      width="100%"
      height="100%"
      :options="chartOptions"
      :series="series"
      :type="this.selectedChartType.tag"
    ></apexcharts>
    <!-- <div>{{ question.answers }}</div>
    <div>{{ selectedIDs }}</div>
    <button @click="filterDataByIDs()">Tets</button> -->
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ChartComponent",
  props: ["question", "selectedIDs"],
  components: {
    apexcharts: VueApexCharts,
  },
  created() {
    this.setChartData(this.selectedIDs);
  },
  watch: {
    question: function (newVal, oldVal) {
      this.filteredAnswers = this.filterDataByIDs(this.selectedIDs);
      this.aggregatedData = this.aggragateData(this.filteredAnswers);
      this.updateDataPoints(this.aggregatedData);
      this.updateLabels(this.question["answer_options"]["en-US"]);
    },
    selectedIDs: function (newVal, oldVal) {
      this.filteredAnswers = this.filterDataByIDs(newVal);
      this.aggregatedData = this.aggragateData(this.filteredAnswers);
      this.updateDataPoints(this.aggregatedData);
      this.updateLabels(this.question["answer_options"]["en-US"]);
    },
  },
  methods: {
    changeChartType(chartType) {
      this.selectedChartType = chartType;
      console.log(this.selectedChartType.tag);
    },
    updateLabels(labels) {
      this.chartOptions = {
        xaxis: {
          categories: labels,
        },
      };
      return this.chartOptions;
    },
    updateDataPoints(dataPoints) {
      this.series = [
        {
          data: dataPoints,
        },
      ];
      return this.series;
    },
    updateSeriesLine(dataPoints) {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: dataPoints,
          },
        ],
        false,
        true
      );
    },
    addArrays(a, b) {
      return a.map((e, i) => e + b[i]);
    },
    aggragateData(answers) {
      var len = answers[0].length;
      this.aggregatedData = Array(len).fill(0);
      for (var i in answers) {
        this.aggregatedData = this.addArrays(this.aggregatedData, answers[i]);
      }
      return this.aggregatedData;
    },
    filterDataByIDs(selected_IDs) {
      this.filteredAnswers = [];
      for (var i in selected_IDs) {
        if (selected_IDs.includes(selected_IDs[i])) {
          var index = this.question.answer_IDs.indexOf(selected_IDs[i]);
          var answer = this.question.answers[index];
          this.filteredAnswers.push(answer);
        }
      }
      return this.filteredAnswers;
    },
    setChartData(selected_IDs) {
      this.filteredAnswers = this.filterDataByIDs(selected_IDs);
      console.log(this.filteredAnswers);
      this.aggregatedData = this.aggragateData(this.filteredAnswers);
      console.log(this.aggregatedData);
      this.updateDataPoints(this.aggregatedData);
      this.updateLabels(this.question["answer_options"]["en-US"]);
    },
  },
  data: function () {
    return {
      filteredAnswers: [],
      aggregatedData: [],
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
