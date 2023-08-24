<template>
  <v-card class="survey-card" :ripple="false">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <v-card-title class="survey-name">{{
      getLocalizedSurveyName
    }}</v-card-title>

    <v-card-subtitle class="survey-date">{{ formattedDate }}</v-card-subtitle>

    <!-- <v-card-subtitle class="survey-description">{{ surveyData.description }}</v-card-subtitle> -->
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useSurveyStore } from "@/store/surveys";
import { usei18nStore } from "@/store/i18n";

export default {
  // Component name
  name: "SurveyCard",

  // Component props
  props: {
    surveyData: {
      type: Object,
      required: true,
    },
  },

  // Computed properties
  computed: {
    ...mapStores(useSurveyStore, usei18nStore),
    formattedDate() {
      const createdAt = new Date(this.surveyData.createdAt);
      return createdAt.toISOString().split("T")[0];
    },
    getLocalizedSurveyName() {
      const name = this.surveyData.name;
      const languageKeys = name.languageKeys;
      const languageTexts = name.languageTexts;

      return this.i18nStore.getLanguageText(
        languageKeys,
        languageTexts,
        this.$i18n
      );
    },
  },

  // Methods
  methods: {},
};
</script>

<style scoped>
.survey-card {
  min-width: 250px;
  /* max-width: 250px; */
  transition: box-shadow 0.1s ease-in-out;
}

.survey-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.survey-name {
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.survey-date {
  margin-bottom: 10px;
}
</style>
