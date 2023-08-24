<template>
  <v-row class="ma-0">
    <v-col class="pa-0">
      <v-row class="ma-0 mr-2 ml-2 top-row align-center">
        <v-col class="pa-0 title" cols="10">
          <div>Surveys:</div>
        </v-col>
        <v-col cols="2" class="pa-0 settings text-right">
          <v-btn class="settings-btn">
            <v-icon icon="mdi-filter"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-col cols="12" class="pa-0 surveys">
          <v-row class="ma-0">
            <v-col
              v-for="(survey, index) in surveyStore.surveyList"
              :key="survey.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="pa-2"
            >
              <SurveyCard
                :surveyData="survey"
                @click="handleSurveyClick(survey.id)"
              ></SurveyCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useSurveyStore } from "@/store/surveys";

import SurveyCard from "@/components/surveys/SurveyCard.vue";

export default {
  name: "Surveys",
  components: { SurveyCard },
  data: () => ({}),
  computed: {
    ...mapStores(useSurveyStore),
  },
  created() {
    this.surveyStore.fetchAllSurveys();
  },
  methods: {
    handleSurveyClick(surveyId) {
      this.surveyStore.setSelectedSurveyID(surveyId);
    },
  },
};
</script>

<style scoped>
.settings-btn {
  margin-left: 10px;
}
.title {
  font-size: 18px;
}
.top-row {
  height: 50px;
}
.surveys {
  height: calc(100vh - 96px - 50px);
  border-radius: 5px;
  overflow: auto;
}
</style>
