<template>
  <div>
    <SurveyOverview v-if="!surveyStore.selectedSurveyID" />
    <SurveyData v-if="surveyStore.selectedSurveyID" />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useSurveyStore } from "@/store/surveys";

import SurveyOverview from "@/layouts/surveys/SurveyOverview.vue";
import SurveyData from "@/layouts/surveys/SurveyData.vue";

export default {
  name: "Surveys",
  components: { SurveyOverview, SurveyData },
  data: () => ({}),
  computed: {
    ...mapStores(useSurveyStore),
  },
  created() {
    // this.surveyStore.fetchLevels();
    // this.surveyStore.fetchEntities();
  },
  methods: {},
};
</script>

<style scoped></style>
