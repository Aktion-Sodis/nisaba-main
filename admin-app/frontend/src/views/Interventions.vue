<template>
  <div>
    <h1 class="ml-8 mt-6">Interventions</h1>
    <v-container class="mt-8">
      <v-row class="mr-2 mr-md-0">
        <v-col cols="12" sm="6" md="4" lg="3">
          <div
            style="height: 100%"
            class="pa-2 d-flex justify-center align-center"
          >
            <div class="d-flex flex-column align-center">
              <v-btn
                fab
                x-large
                color="primary lighten-2"
                @click="clickOnAddNewIntervention"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              <h2 class="mt-4">New intervention</h2>
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
          />
        </v-col>
      </v-row>
    </v-container>
    <InterventionModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Intervention from "../components/interventions/Intervention.vue";
import InterventionModal from "../components/interventions/InterventionModal.vue";

export default {
  name: "Interventions",
  components: { Intervention, InterventionModal },
  computed: {
    ...mapGetters({
      interventions: "iv/getInterventions",
    }),
  },
  methods: {
    ...mapActions({
      clickOnAddNewIntervention: "ivGui/clickOnAddNewIntervention",
    }),
  },
};
</script>

<style scoped></style>
