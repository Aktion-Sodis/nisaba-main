<template>
  <v-dialog v-model="surveyModalIsDisplayed" max-width="1200px" persistent>
    <SurveyModalFirstCard
      v-if="isOnFirstCard"
      @setIsOnFirstCard="setIsOnFirstCard"
      @close="closeSurveyModal"
    />
    <SurveyModalQuestion
      v-else
      @close="closeSurveyModal"
      @pushToQuestions="pushToQuestions"
      :initialQText="questions[qIndex].questionText"
      :initialQType="questions[qIndex].questionType"
      :initialAnswers="questions[qIndex].answers"
    />
    {{ questions[qIndex].answers }}
    {{ qIndex }}
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../store/constants";

import SurveyModalFirstCard from "./surveyModalContent/SurveyModalFirstCard.vue";
import SurveyModalQuestion from "./surveyModalContent/SurveyModalQuestion.vue";

// const emptyQuestion = Object.freeze({
//   questionText: "",
//   questionType: "text",
//   answers: [{ answerText: "" }],
// });

export default {
  name: "SurveyModal",
  components: { SurveyModalFirstCard, SurveyModalQuestion },
  data() {
    return {
      surveyId: null,
      surveyName: "",
      surveyDescription: "",
      interventionId: null,
      questions: [
        {
          questionText: "",
          questionType: "text",
          answers: [{ answerText: "" }],
        },
      ],
      modalModesDict,
      isOnFirstCard: true,
      qIndex: 0,
    };
  },
  computed: {
    ...mapGetters({
      surveyModalMode: "ivGui/getSurveyModalMode",
      surveyModalIsDisplayed: "ivGui/getSurveyModalIsDisplayed",
    }),
    edit() {
      return this.surveyModalMode === this.modalModesDict.edit;
    },
    create() {
      return this.surveyModalMode === this.modalModesDict.create;
    },
    read() {
      return this.surveyModalMode === this.modalModesDict.read;
    },
  },
  methods: {
    ...mapActions({
      closeSurveyModal: "ivGui/closeSurveyModal",
    }),
    ...mapMutations({}),
    setIsOnFirstCard(payload) {
      this.isOnFirstCard = payload;
    },
    pushToQuestions(payload) {
      console.log({ payload });
      // this.$set(this.questions, this.qIndex, payload);
      this.questions[this.qIndex] = payload;
      this.questions = this.questions.concat({
        questionText: "",
        questionType: "text",
        answers: [{ answerText: "" }],
      });
      this.qIndex++;
    },
  },
};
</script>
