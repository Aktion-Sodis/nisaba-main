<template>
  <v-dialog v-model="surveyModalIsDisplayed" max-width="1200px" persistent>
    <SurveyModalFirstCard
      v-if="isOnFirstCard"
      @setIsOnFirstCard="setIsOnFirstCard"
    />
    <SurveyModalQuestion v-else />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../store/constants";

import SurveyModalFirstCard from "./surveyModalContent/SurveyModalFirstCard.vue";
import SurveyModalQuestion from "./surveyModalContent/SurveyModalQuestion.vue";

export default {
  name: "SurveyModal",
  components: { SurveyModalFirstCard, SurveyModalQuestion },
  data() {
    return {
      surveyId: null,
      surveyName: "",
      surveyDescription: "",
      interventionId: null,
      questions: [],
      modalModesDict,
      isOnFirstCard: true,
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
    ...mapActions({}),
    ...mapMutations({}),
    setIsOnFirstCard(payload) {
      this.isOnFirstCard = payload;
    },
  },
};
</script>
