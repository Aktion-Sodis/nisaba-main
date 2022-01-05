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
                  <v-btn
                    fab
                    class="iv-edit-icon"
                    color="primary"
                    @click="selectImg"
                  >
                    <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                  </v-btn>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="img-upload"
                    style="display: none"
                  />
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
                <v-card-title>
                  Documents
                  <v-btn fab x-small color="primary lighten-2" class="ml-2">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <v-expansion-panels
                  accordion
                  v-if="allDocumentsOfIntervention.length > 0"
                >
                  <v-expansion-panel
                    v-for="doc in allDocumentsOfIntervention"
                    :key="doc.id"
                  >
                    <v-expansion-panel-header outlined>
                      <div class="d-flex justify-start">
                        <v-icon> mdi-file-document-outline </v-icon>
                        <p class="mb-0 pt-1 ml-2 text-subtitle-1">
                          {{ doc.name }}
                        </p>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p style="transform: translateY(-12px)" class="mb-0">
                        {{ doc.description }}
                      </p>
                      <v-chip
                        v-for="tagId in doc.tags"
                        :key="tagId"
                        class="mr-2"
                      >
                        {{ interventionContentTagById(tagId).name }}
                      </v-chip>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <p v-else>No documents uploaded.</p>

                <v-card-title>
                  Images
                  <v-btn fab x-small color="primary lighten-2" class="ml-2">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <div v-if="allImagesOfIntervention.length > 0">
                  <v-row>
                    <v-col
                      v-for="img in allImagesOfIntervention"
                      :key="img.id"
                      class="d-flex child-flex"
                      cols="3"
                    >
                      <v-img
                        src="https://picsum.photos/id/11/500/300"
                        lazy-src="https://picsum.photos/id/11/10/6"
                        aspect-ratio="1"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                </div>
                <p v-else>No images uploaded.</p>

                <v-card-title>
                  Videos
                  <v-btn fab x-small color="primary lighten-2" class="ml-2">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <div v-if="allVideosOfIntervention.length > 0">
                  <div v-for="vid in allVideosOfIntervention" :key="vid.id">
                    <video width="50"></video>
                  </div>
                </div>
                <p v-else>No videos uploaded.</p>

                <v-card-title class="mt-4">
                  Surveys
                  <v-btn fab x-small color="primary lighten-2" class="ml-2">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <p>No surveys added.</p>
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
      interventionContent: [],
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
      allContentByInterventionId: "iv/getAllContentByInterventionId",
      contentById: "iv/getContentById",
      interventionContentTagById: "iv/getInterventionContentTagById",
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
    allDocumentsOfIntervention() {
      return (
        this.interventionContent.filter((c) => c.type === "MarkdownDocument") ||
        []
      );
    },
    allVideosOfIntervention() {
      return this.interventionContent.filter((c) => c.type === "Video") || [];
    },
    allImagesOfIntervention() {
      return this.interventionContent.filter((c) => c.type === "Image") || [];
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
        content: this.interventionContent,
      });

      this.closeThenDeleteComponentData();
    },
    selectImg() {
      const imgInput = this.$refs["img-upload"];
      imgInput.click();
      console.log("TODO: do something with", imgInput);
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
