<template>
  <div class="text-wrapper">
    <div
      class="text-answer"
      v-for="(answer, index) in filteredAnswers"
      :key="index"
    >
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TextComponent",
  props: ["question", "selectedIDs"],
  created() {
    this.filterDataByIDs(this.selectedIDs);
  },
  watch: {
    selectedIDs: function (newVal, oldVal) {
      this.filteredAnswers = this.filterDataByIDs(this.selectedIDs);
    },
    question: function (newVal, oldVal) {
      this.filteredAnswers = this.filterDataByIDs(this.selectedIDs);
    },
  },
  methods: {
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
  },
  data: function () {
    return {
      filteredAnswers: [],
    };
  },
};
</script>

<style scoped>
.text-answer {
  border: 1px solid rgb(125, 125, 125);
  border-radius: 5px;
  margin-top: 20px;
  padding: 15px 0;
}
</style>
