<template>
  <v-row>
    <v-col class="pa-0 pl-2">
      <v-card v-if="categories.length > 0" class="chart-component-wrapper">
        <ChartComponent
          :xaxis-categories="categories"
          :series-data="data"
          :chart-title="title"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { usei18nStore } from "@/store/i18n";
import { useChartStore } from "@/store/chart";

import ChartComponent from "@/components/data/ChartComponent.vue";

export default {
  // Component name
  name: "MultipleChoiceComponent",

  // Components used in the template
  components: {
    ChartComponent,
  },

  // Component props
  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  // Data properties
  data() {
    return {
      categories: [],
      data: [],
      title: "Test",
    };
  },

  // Computed properties
  computed: {
    ...mapStores(usei18nStore),
  },

  // Watchers
  watch: {
    questionProperties: {
      immediate: true,
      deep: true,
      handler(newQuestionProperties) {
        this.createCategoryList(newQuestionProperties.question_options);
        this.sumAnswerValues(newQuestionProperties.answers);
        this.setChartTitle(newQuestionProperties.question_text);
      },
    },
  },

  // Lifecycle hooks
  created() {},

  mounted() {},

  // Methods
  methods: {
    setChartTitle(question_text) {
      console.log(question_text);
      this.title = this.i18nStore.getLanguageText(
        question_text.languageKeys,
        question_text.languageTexts,
        this.$i18n.locale
      );
    },

    createCategoryList(question_options) {
      this.categories = [];
      question_options.forEach((option, index) => {
        const option_text = this.i18nStore.getLanguageText(
          option.text.languageKeys,
          option.text.languageTexts,
          this.$i18n.locale
        );
        if (option_text !== -1) {
          this.categories.push(option_text);
        }
      });
    },

    sumAnswerValues(answers) {
      if (answers.length === 0) {
        this.data = [];
        return;
      }
      const columnSums = answers.reduce((acc, answer) => {
        answer.answer_value.forEach((value, index) => {
          if (acc[index] === undefined) {
            acc[index] = 0;
          }
          acc[index] += value;
        });
        return acc;
      }, []);
      this.data = columnSums;
      // console.log(this.data);
    },
  },
};
</script>

<style scoped>
.chart-component-wrapper {
  height: 100%;
  width: 100%;
}
</style>
