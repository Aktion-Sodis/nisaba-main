<template>
  <v-card style="height: 100%" class="pa-2" outlined tile>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    >
      <v-btn
        fab
        class="iv-edit-icon"
        color="primary"
        @click="callVuexActionThenFillInterventionModalForm"
      >
        <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
      </v-btn>
    </v-img>
    <v-card-title>
      {{ interventionName }}
    </v-card-title>
    <v-card-subtitle>
      {{ interventionDescription }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { validate as uuidValidate } from "uuid";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Intervention",
  props: {
    interventionId: {
      required: true,
      validator: (e) => uuidValidate(e) || e === null,
    },
    interventionName: {
      type: String,
      required: true,
    },
    interventionDescription: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      clickOnEditIntervention: "ivGui/clickOnEditIntervention",
    }),
    callVuexActionThenFillInterventionModalForm() {
      this.clickOnEditIntervention(this.interventionId);

      /* TODO: This is bad, bad practice. */
      const InterventionModal = this.$parent.$children.find(
        (c) => c.$options.name === "InterventionModal"
      );
      InterventionModal.interventionName = this.interventionName || "";
      InterventionModal.interventionDescription =
        this.interventionDescription || "";
    },
  },
};
</script>

<style scoped>
.iv-edit-icon {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
