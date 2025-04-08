<template>
  <v-row class="ma-0 cards-container">
    <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col>
    <!-- <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Executed Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Executed Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Executed Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Executed Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" class="pa-2">
      <KPICard
        title="Executed Surveys"
        :number="surveyStore.totalNumberOfSurveys"
        :refreshMethod="refreshNumberOfSurveys"
      />
    </v-col> -->
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useSurveyStore } from "@/store/surveys";

import KPICard from "@/components/dashboard/KPICard.vue";

export default {
  name: "Dashboard",
  components: { KPICard },
  data: () => ({
    title: "Title",
    number: 10,
  }),
  computed: {
    ...mapStores(useSurveyStore),
  },
  created() {
    this.surveyStore.fetchTotalNumberOfSurveys();
  },
  methods: {
    refreshNumberOfSurveys() {
      this.surveyStore.fetchTotalNumberOfSurveys();
    },
  },
};
</script>

<style scoped></style>
