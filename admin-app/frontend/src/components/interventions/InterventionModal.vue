<template>
  <v-dialog v-model="interventionModalIsDisplayed" max-width="800px" persistent>
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
              <v-col cols="12" sm="6">
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
              </v-col>

              <v-col cols="12" sm="6">
                <v-card-title> Here be some other things </v-card-title>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
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
    };
  },
  computed: {
    ...mapGetters({
      interventions: "iv/getInterventions",
      interventionModalIsEdit: "ivGui/getInterventionModalIsEdit",
      interventionModalIsDisplayed: "ivGui/getInterventionModalIsDisplayed",
      interventionCurrentlyBeingEdited:
        "ivGui/getInterventionCurrentlyBeingEdited",
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
    }),
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
      });

      this.closeThenDeleteComponentData();
    },
  },
};
</script>
