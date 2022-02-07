<template>
  <v-card class="px-4 pt-4">
    <v-card-title>
      <h2>
        {{ surveyName }}
      </h2>
      <v-spacer></v-spacer>
      <v-btn
        x-large
        text
        class="text-none"
        @click="publishSurveyHandler"
        :disabled="false"
      >
        {{ $t("interventions.surveyModal.finalizeCard.publish-survey") }}
        <v-icon large class="ml-2"> mdi-bullhorn-outline </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text></v-card-text>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Finalize",
  watch: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      surveyName: "surveysUI/surveyNameInFocus",
      surveyModalMode: "surveysUI/getSurveyModalMode",
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
      publishSurveyHandler: "surveysUI/publishSurveyHandler",
    }),
    ...mapMutations({
      incrementCompletionIndex: "surveysUI/incrementSurveyModalCompletionIndex",
      decrementCompletionIndex: "surveysUI/decrementSurveyModalCompletionIndex",
    }),
  },
};
</script>
