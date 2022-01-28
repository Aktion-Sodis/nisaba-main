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
      @deleteQuestions="deleteQuestions"
      @saveSurvey="saveSurvey"
      :initialQText="questions[qIndex].questionText"
      :initialQType="questions[qIndex].questionType"
      :initialAnswers="questions[qIndex].answers"
    />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../store/constants";

import SurveyModalFirstCard from "./surveyModalContent/SurveyModalFirstCard.vue";
import SurveyModalQuestion from "./surveyModalContent/SurveyModalQuestion.vue";
import { EmptyQuestion } from "./utils";

export default {
  name: "SurveyModal",
  components: { SurveyModalFirstCard, SurveyModalQuestion },
  data() {
    return {
      surveyId: null,
      surveyName: "",
      surveyDescription: "",
      interventionId: null,
      questions: [new EmptyQuestion()],
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
    async pushToQuestions(payload) {
      await this.$set(this.questions, this.qIndex, payload);
      this.qIndex++;
      await this.$set(this.questions, this.qIndex, new EmptyQuestion());
    },
    deleteQuestions() {
      this.qIndex = 0;
      this.questions = [new EmptyQuestion()];
    },
    saveSurvey() {},
  },
};
</script>
