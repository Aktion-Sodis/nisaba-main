<template>
  <div>
    <h1 class="ml-8 mt-6">Interventions</h1>
    <v-container class="mt-8">
      <v-row class="mr-2 mr-md-0">
        <v-col>
          <div
            style="height: 100%"
            class="pa-2 d-flex justify-center align-center"
          >
            <div class="d-flex flex-column align-center">
              <v-btn fab x-large color="primary lighten-2">
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
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Intervention from "../components/interventions/Intervention.vue";

export default {
  name: "Interventions",
  components: { Intervention },
  computed: {
    ...mapGetters({
      interventions: "iv/getInterventions",
    }),
  },
};
</script>

<style scoped></style>
