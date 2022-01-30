<template>
  <v-dialog
    @keydown.esc="exitHandler"
    v-model="surveyModalIsDisplayed"
    max-width="1200px"
    persistent
  >
    <v-stepper alt-labels v-model="completionIndex">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="completionIndex > 1">
          Survey details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" :complete="completionIndex > 2"
          >Questions
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Finalize </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <SurveyModalFirstCard
      v-if="isOnFirstCard"
      @setIsOnFirstCard="setIsOnFirstCard"
      @close="closeSurveyModal"
      @incrementCompletionIndex="incrementCompletionIndex"
    />
    <SurveyModalQuestion v-else />

    <v-tabs
      background-color="grey lighten-3"
      show-arrows
      centered
      center-active
      v-if="!isOnFirstCard && nQuestions > 0"
      v-model="iQ"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab v-for="(q, i) in questions" :key="i" :value="i">
        <v-icon v-if="i === nQuestions - 1" large> mdi-plus </v-icon>
        <div v-else>
          <div v-if="q.questionType === 'multipleChoice'">
            <v-icon> mdi-checkbox-outline </v-icon>
            <v-icon> mdi-checkbox-outline </v-icon>
            <v-icon> mdi-checkbox-blank-outline </v-icon>
          </div>
          <div v-else-if="q.questionType === 'singleChoice'">
            <v-icon> mdi-checkbox-outline </v-icon>
            <v-icon> mdi-checkbox-blank-outline </v-icon>
            <v-icon> mdi-checkbox-blank-outline </v-icon>
          </div>
          <v-icon v-else large>
            {{ questionTypesIconDict[q.questionType] }}
          </v-icon>
        </div>
      </v-tab>
    </v-tabs>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict, questionTypesIconDict } from "../../store/constants";

import SurveyModalFirstCard from "./surveyModalContent/SurveyModalFirstCard.vue";
import SurveyModalQuestion from "./surveyModalContent/SurveyModalQuestion.vue";
import { EmptyQuestion } from "../../store/questionsModule/utils";

export default {
  name: "SurveyModal",
  components: { SurveyModalFirstCard, SurveyModalQuestion },
  data() {
    return {
      surveyId: null,
      surveyName: "",
      surveyDescription: "",
      surveyTags: [],
      completionIndex: 1,
      iQ: 0,
      interventionId: null,
      isOnFirstCard: true,
      modalModesDict,
      questionTypesIconDict,
    };
  },
  watch: {
    iQ: function (newVal) {
      // this.replaceQuestionAtIndex({newQuestion: {}})
      // TODO: save changes in SurveyModalQuestion and don't block manual nav
      // this.iQ = oldVal;
      this.setIQuestions({ payload: newVal });
    },
    iQuestions: function (newVal) {
      this.iQ = newVal;
    },
  },
  computed: {
    ...mapGetters({
      surveyModalMode: "ivGui/getSurveyModalMode",
      surveyModalIsDisplayed: "ivGui/getSurveyModalIsDisplayed",
      questions: "q/getQuestions",
      iQuestions: "q/getIQuestions",
      nQuestions: "q/nQuestions",
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
    ...mapMutations({
      setSurveyModalIsDisplayed: "ivGui/setSurveyModalIsDisplayed",
      setIQuestions: "q/setIQuestions",
      replaceQuestionAtIndex: "q/replaceQuestionAtIndex",
    }),
    setIsOnFirstCard(payload) {
      this.isOnFirstCard = payload;
    },
    deleteQuestions() {
      this.qIndex = 0;
      this.questions = [new EmptyQuestion()];
    },
    exitHandler() {
      if (this.read) {
        this.setSurveyModalIsDisplayed(false);
        return;
      }
      if (this.edit) {
        return;
      }
      /* create */
      if (
        this.surveyName !== "" ||
        this.surveyDescription !== "" ||
        this.surveyTags.length > 0
      ) {
        // TODO: ask are you serious
      }
    },
    incrementCompletionIndex() {
      this.completionIndex++;
    },
  },
};
</script>
