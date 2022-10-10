<template>
  <div class="text-wrapper">
    <div v-for="(answer, index) in filteredAnswers" :key="index">
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

<style></style>
