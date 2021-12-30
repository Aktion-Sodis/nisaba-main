<template>
  <v-dialog
    v-model="interventionModalIsDisplayed"
    max-width="1200px"
    persistent
  >
    <v-card class="px-4 pt-4">
      <v-form ref="form" @submit.prevent="submitIntervention" lazy-validation>
        <v-card-title>
          <h2 v-if="interventionModalIsEdit">
            {{ $t("interventionView.interventionModal.title.edit") }}
            <i>{{ interventionCurrentlyBeingEdited.name }}</i>
          </h2>
          <h2 v-else>
            {{ $t("interventionView.interventionModal.title.create") }}
          </h2>
        </v-card-title>
        <v-card-subtitle v-if="interventionModalIsEdit">
          {{ $t("interventionView.interventionModal.description.edit") }}
        </v-card-subtitle>
        <v-card-subtitle v-else>
          {{ $t("interventionView.interventionModal.description.create") }}
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title> Intervention information </v-card-title>
                <v-text-field
                  v-model="interventionName"
                  :rules="[rules.required]"
                  :label="
                    $t('interventionView.interventionModal.interventionName')
                  "
                  required
                  outlined
                  dense
                ></v-text-field>
                <v-textarea
                  v-model="interventionDescription"
                  :counter="
                    interventionDescription.length >
                    interventionDescriptionMaxChar - 20
                  "
                  :rules="[rules.maxChar]"
                  :label="
                    $t(
                      'interventionView.interventionModal.interventionDescription'
                    )
                  "
                  required
                  outlined
                  dense
                ></v-textarea>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  max-height="200px"
                >
                  <v-btn fab class="iv-edit-icon" color="primary">
                    <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                  </v-btn>
                </v-img>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="interventionTags"
                  :items="allInterventionTags"
                  item-value="tagId"
                  item-text="name"
                  deletable-chips
                  chips
                  dense
                  label="Tags"
                  multiple
                  outlined
                ></v-select>
                <v-card-title> Documents </v-card-title>
                <v-select
                  v-model="interventionDocs"
                  :items="allInterventionDocs"
                  item-value="docId"
                  item-text="name"
                  label="Select the documents for the intervention"
                  multiple
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="interventionModalIsEdit"
            @click="clickOnDeleteIntervention"
            color="warning"
            text
          >
            {{ $t("general.delete") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeThenDeleteComponentData">
            {{ $t("general.cancel") }}
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            text
            @click.prevent="submitIntervention"
            :disabled="!interventionFormIsInvalid"
          >
            {{ $t("general.save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const interventionDescriptionMaxChar = Math.max(
  parseInt(process.env.VUE_APP_INTERVENTION_DESCRIPTION_MAX_CHAR, 10),
  0
);

export default {
  name: "InterventionModal",
  data() {
    return {
      interventionDescriptionMaxChar,
      rules: {
        required: (value) => !!value || this.requiredi18n,
        maxChar: (value) =>
          value.length <= interventionDescriptionMaxChar ||
          this.maxCharExceededi18n,
      },
      interventionName: "",
      interventionDescription: "",
      interventionTags: [],
      interventionDocs: [],
    };
  },
  computed: {
    ...mapGetters({
      interventions: "iv/getInterventions",
      interventionModalIsEdit: "ivGui/getInterventionModalIsEdit",
      interventionModalIsDisplayed: "ivGui/getInterventionModalIsDisplayed",
      interventionCurrentlyBeingEdited:
        "ivGui/getInterventionCurrentlyBeingEdited",
      allInterventionTags: "iv/getInterventionTags",
      allInterventionDocs: "iv/getInterventionDocs",
    }),
    requiredi18n() {
      return this.$t("login.required");
    },
    maxCharExceededi18n() {
      return this.$t("login.maxCharExceeded", {
        maxChar: interventionDescriptionMaxChar,
      });
    },
    interventionFormIsInvalid() {
      return !!this.interventionName;
    },
  },
  methods: {
    ...mapActions({
      saveIntervention: "ivGui/saveIntervention",
      showInterventionModal: "ivGui/showInterventionModal",
      closeInterventionModal: "ivGui/closeInterventionModal",
      deleteIntervention: "ivGui/deleteIntervention",
    }),
    clickOnDeleteIntervention() {
      this.deleteIntervention(
        this.interventionCurrentlyBeingEdited.interventionId
      );
      this.interventionName = "";
      this.interventionDescription = "";
    },
    closeThenDeleteComponentData() {
      this.closeInterventionModal();

      this.interventionName = "";
      this.interventionDescription = "";
    },
    submitIntervention() {
      this.saveIntervention({
        interventionId: this.interventionCurrentlyBeingEdited
          ? this.interventionCurrentlyBeingEdited.interventionId
          : null,
        name: this.interventionName,
        description: this.interventionDescription,
        tags: this.interventionTags,
        docs: this.interventionDocs,
      });

      this.closeThenDeleteComponentData();
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
