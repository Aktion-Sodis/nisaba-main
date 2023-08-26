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
      series: [
        {
          data: [],
        },
      ],
      labels: [],
    };
  },

  // Watchers
  watch: {
    questionProperties: {
      immediate: true,
      deep: true,
      handler(newQuestionProperties) {
        this.createLabels();
        this.createSeries();
      },
    },
  },

  // Computed properties
  computed: {
    ...mapStores(usei18nStore, useChartStore),
  },

  created() {
    this.createLabels();
    this.createSeries();
  },

  // Methods
  methods: {
    createLabels() {
      this.labels = this.chartStore.createLabelList(
        this.questionProperties.question_options,
        this.$i18n.locale
      );
    },

    createSeries() {
      const newData = this.chartStore.sumAnswerValues(
        this.questionProperties.answers
      );

      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
</script>

<style></style>
