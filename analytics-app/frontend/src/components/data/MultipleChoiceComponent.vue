<template>
  <ChartComponent
    :chart-type="selectedChartType"
    :series="series"
    :labels="labels"
    :title="title"
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
      title: null,
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
        this.setChartTitle();
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
    this.setChartTitle();
  },

  // Methods
  methods: {
    setChartTitle() {
      // console.log(this.questionProperties.question_text);
      const question_text = this.questionProperties.question_text;
      this.title = this.i18nStore.getLanguageText(
        question_text.languageKeys,
        question_text.languageTexts,
        this.$i18n.locale
      );
    },

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
