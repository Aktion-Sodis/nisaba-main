<template>
  <v-card
    style="height: 100%"
    class="pa-2"
    outlined
    tile
    @click="clickOnIntervention"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    >
    </v-img>
    <v-card-title>
      {{ interventionName }}
      <v-spacer></v-spacer>
      <v-chip v-for="tagId in interventionTags" :key="tagId" class="ml-2"
        >{{ interventionTagById(tagId).name }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle class="mt-0">
      {{ interventionDescription }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { validate as uuidValidate } from 'uuid';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Intervention',
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
    interventionTags: {
      type: Array,
      validator: (a) => a.every((e) => uuidValidate(e)),
    },
    interventionContent: {
      type: Array,
      validator: (a) => a.every((e) => uuidValidate(e.id)),
    },
  },
  computed: {
    ...mapGetters({
      interventionTagById: 'iv/getInterventionTagById',
    }),
  },
  methods: {
    clickOnIntervention() {
      this.viewIntervention();

      /* TODO: This is bad, bad practice. */
      const InterventionModal = this.$parent.$children.find(
        (c) => c.$options.name === 'InterventionModal',
      );
      InterventionModal.interventionId = this.interventionId || '';
      InterventionModal.interventionName = this.interventionName || '';
      InterventionModal.interventionDescription = this.interventionDescription || '';
      InterventionModal.interventionTags = this.interventionTags || [];
      InterventionModal.interventionContent = this.interventionContent || [];
    },
    ...mapActions({
      viewIntervention: 'ivGui/viewIntervention',
      clickOnEditIntervention: 'ivGui/clickOnEditIntervention',
    }),
    // callVuexActionThenFillInterventionModalForm() {
    //   this.clickOnEditIntervention(this.interventionId);

    //   /* TODO: This is bad, bad practice. */
    //   const InterventionModal = this.$parent.$children.find(
    //     (c) => c.$options.name === "InterventionModal"
    //   );
    //   InterventionModal.interventionName = this.interventionName || "";
    //   InterventionModal.interventionDescription =
    //     this.interventionDescription || "";
    //   InterventionModal.interventionTags = this.interventionTags || [];
    //   InterventionModal.interventionContent = this.interventionContent || [];
    // },
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
