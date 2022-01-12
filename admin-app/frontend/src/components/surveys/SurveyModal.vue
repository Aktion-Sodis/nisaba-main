<template>
  <v-dialog v-model="surveyModalIsDisplayed" max-width="1200px" persistent>
    <SurveyModalFirstCard v-if="progress === 0" />
    <SurveyModalQuestion v-if="progress === 1" />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../store/constants";

export default {
  name: "SurveyModal",
  data() {
    return {
      surveyId: null,
      surveyName: "",
      surveyDescription: "",
      interventionId: null,
      questions: [],
      modalModesDict,
      progress: 0,
    };
  },
  computed: {
    ...mapGetters({
      interventionModalMode: "ivGui/getSurveyModalMode",
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
    incrementProgress() {
      this.progress += 1;
    },
    decrementProgress() {
      this.progress -= 1;
    },
  },
};
</script>
