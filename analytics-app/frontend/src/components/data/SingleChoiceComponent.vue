<template>
  <ChartComponent
    :chart-type="selectedChartType"
    :series="series"
    :labels="labels"
  ></ChartComponent>
</template>

<script>
import { mapStores } from "pinia";
import { usei18nStore } from "@/store/i18n";
import { useChartStore } from "@/store/chart";

import ChartComponent from "@/components/data/ChartComponent.vue";

export default {
  // Component name
  name: "SingleChoiceComponent",

  // Components
  components: { ChartComponent },

  // Component props
  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedChartType: "pie",
      series: [44, 55, 41, 17],
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
    };
  },

  // Watchers
  watch: {
    questionProperties: {
      immediate: true,
      deep: true,
      handler(newQuestionProperties) {
        this.labels = this.createLabels();
        this.series = this.createSeries();
      },
    },
  },

  // Computed properties
  computed: {
    ...mapStores(usei18nStore, useChartStore),
  },

  created() {
    this.labels = this.createLabels();
    this.series = this.createSeries();
  },

  // Methods
  methods: {
    createLabels() {
      const newLabels = this.chartStore.createLabelList(
        this.questionProperties.question_options,
        this.$i18n.locale
      );
      return newLabels;
    },

    createSeries() {
      const newSeries = this.chartStore.sumAnswerValues(
        this.questionProperties.answers
      );
      return newSeries;
    },
  },
};
</script>

<style scoped></style>
