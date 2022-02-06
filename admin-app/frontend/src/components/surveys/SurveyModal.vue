<template>
  <v-dialog
    @keydown.esc="exitHandler"
    v-model="isSurveyModalDisplayed"
    max-width="1200px"
    persistent
  >
    <SurveyModalStepper />

    <SurveyModalFirstCard v-if="completionIndex === 1" />

    <SurveyModalQuestion v-if="completionIndex === 2" />
    <QuestionTabs v-if="completionIndex === 2" />

    <SurveyModalFinalize v-else-if="completionIndex === 3" />
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

import SurveyModalStepper from "./surveyModalContent/SurveyModalStepper.vue";
import QuestionTabs from "./surveyModalContent/QuestionTabs.vue";
import SurveyModalFirstCard from "./surveyModalContent/SurveyModalFirstCard.vue";
import SurveyModalQuestion from "./surveyModalContent/SurveyModalQuestion.vue";
import SurveyModalFinalize from "./surveyModalContent/SurveyModalFinalize.vue";

export default {
  name: "SurveyModal",
  components: {
    SurveyModalFirstCard,
    SurveyModalQuestion,
    SurveyModalFinalize,
    QuestionTabs,
    SurveyModalStepper,
  },
  computed: {
    ...mapGetters({
      isSurveyModalDisplayed: "surveysUI/getIsSurveyModalDisplayed",
      completionIndex: "surveysUI/getSurveyModalCompletionIndex",
    }),
  },
};
</script>
