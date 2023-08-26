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
  name: "MultipleChoiceComponent",

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
      selectedChartType: "bar",
      series: [],
      labels: [],
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
      const newData = this.chartStore.sumAnswerValues(
        this.questionProperties.answers
      );

      const newSeries = [
        {
          data: newData,
        },
      ];
      return newSeries;
    },
  },
};
</script>

<style></style>
