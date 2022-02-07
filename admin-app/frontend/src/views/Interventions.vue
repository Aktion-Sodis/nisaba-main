<template>
  <div>
    <InterventionModal />
    <SurveyModal />
    <h1 class="ml-8 mt-6">
      {{ $t("interventions.title") }}
    </h1>
    <v-container class="mt-8">
      <v-row class="mr-2 mr-md-0">
        <v-col cols="12" sm="6" md="4" lg="3">
          <div style="height: 100%" class="pa-2">
            <div
              style="height: 100%"
              class="d-flex flex-column justify-space-around"
            >
              <div class="d-flex flex-column align-center">
                <v-btn
                  fab
                  x-large
                  color="primary"
                  @click="clickOnAddNewIntervention"
                >
                  <v-icon dark> mdi-wrench </v-icon>
                </v-btn>
                <h2 class="mt-2 mb-4">
                  {{ $t("interventions.new-intervention") }}
                </h2>
              </div>
              <div class="d-flex flex-column align-center">
                <v-btn fab small color="primary" @click="newSurveyHandler">
                  <v-icon dark> mdi-crosshairs-question </v-icon>
                </v-btn>
                <h3 class="mt-2">{{ $t("interventions.new-survey") }}</h3>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          v-for="intervention in interventions"
          :key="intervention.interventionId"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <Intervention
            :interventionId="intervention.interventionId"
            :interventionName="intervention.name"
            :interventionDescription="intervention.description"
            :interventionTags="intervention.tags"
            :interventionContent="intervention.content"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Intervention from "../components/interventions/Intervention.vue";
import InterventionModal from "../components/interventions/InterventionModal.vue";
import SurveyModal from "../components/surveys/SurveyModal.vue";

export default {
  name: "Interventions",
  components: { Intervention, InterventionModal, SurveyModal },
  computed: {
    ...mapGetters({
      interventions: "iv/getInterventions",
    }),
  },
  methods: {
    ...mapActions({
      clickOnAddNewIntervention: "ivGui/clickOnAddNewIntervention",
      newSurveyHandler: "surveysUI/newSurveyHandler",
    }),
  },
};
</script>

<style scoped></style>
