<template>
  <v-card class="px-4 pt-4">
    <v-form ref="form" @submit.prevent="submitSurvey" lazy-validation>
      <v-card-title>
        <h2 v-if="edit">
          TODO i18n Editing survey
          <i>{{ surveyCurrentlyBeingEdited.name }}</i>
        </h2>
        <h2 v-else-if="create">New survey TODO i18n</h2>
        <h2 v-else>Viewing survey TODO i18n</h2>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2 v-if="read">
                {{ surveyName }}
              </h2>
              <v-text-field
                v-else
                :autofocus="edit || create"
                v-model="surveyName"
                label="Survey name TODO i18n"
                outlined
                dense
              ></v-text-field>

              <h3 v-if="read" class="py-12">
                {{ surveyDescription }}
              </h3>
              <v-textarea
                v-else
                v-model="surveyDescription"
                :counter="
                  surveyDescription.length > surveyDescriptionMaxChar - 20
                "
                :rules="[rules.maxChar]"
                label="
                    TODO: i18n
                  "
                outlined
                dense
                class="mt-4"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                max-height="200px"
              >
                <v-btn
                  v-if="!read"
                  fab
                  class="iv-edit-icon"
                  color="primary"
                  @click="selectImg"
                >
                  <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                </v-btn>
                <input
                  v-if="!read"
                  type="file"
                  accept="image/png, image/jpeg"
                  ref="img-upload"
                  style="display: none"
                />
              </v-img>

              <div v-if="read">
                <v-card-title> Tags TODO: i18n </v-card-title>
                <v-chip v-for="tagId in surveyTags" :key="tagId">
                  {{ tagById(tagId).name }}
                </v-chip>
              </div>
              <v-select
                v-else
                v-model="surveyTags"
                :items="allSurveyTags"
                item-value="tagId"
                item-text="name"
                deletable-chips
                chips
                dense
                label="Tags TODO i18n"
                multiple
                outlined
                class="mt-8"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="secondary"
          text
          @click="
            read || create ? closeThenDeleteComponentData() : switchToReading()
          "
        >
          {{ read ? "Close" : $t("general.cancel") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="clickOnNext"
          :disabled="!canAdvance"
        >
          {{ read ? "Questions" : "Next step" }}
          <v-icon large> mdi-chevron-right </v-icon>
          <!-- TODO: i18n -->
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../../store/constants";

const surveyDescriptionMaxChar = Math.max(
  parseInt(process.env.VUE_APP_SURVEY_DESCRIPTION_MAX_CHAR, 10),
  0
);

export default {
  name: "SurveyModalFirstCard",
  data() {
    return {
      surveyDescriptionMaxChar,
      rules: {
        maxChar: (value) =>
          value.length <= surveyDescriptionMaxChar || this.maxCharExceededi18n,
      },
      modalModesDict,
      surveyName: "",
      surveyDescription: "",
      surveyTags: [],
    };
  },
  computed: {
    ...mapGetters({
      surveyModalMode: "ivGui/getSurveyModalMode",
      tagById: "surveys/getSurveyTagById",
      surveyCurrentlyBeingEdited: "ivGui/getSurveyCurrentlyBeingEdited",
      allSurveyTags: "surveys/getSurveyTags",
    }),
    edit() {
      return this.surveyModalMode === this.modalModesDict.edit;
    },
    create() {
      return this.surveyModalMode === this.modalModesDict.create;
    },
    read() {
      return this.surveyModalMode === this.modalModesDict.read;
    },
    canAdvance() {
      return this.surveyName !== "";
    },
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({
      setSurveyNameCurrentlyBeingEdited:
        "ivGui/setSurveyNameCurrentlyBeingEdited",
    }),
    selectImg() {
      const imgInput = this.$refs["img-upload"];
      imgInput.click();
      console.log("TODO: do something with", imgInput);
    },
    closeThenDeleteComponentData() {
      this.$emit("close");
      this.deleteComponentData();
    },
    deleteComponentData() {
      this.surveyId = null;
      this.surveyName = "";
      this.surveyDescription = "";
      this.surveyTags = [];
    },
    clickOnNext() {
      this.$emit("setIsOnFirstCard", false);
      this.setSurveyNameCurrentlyBeingEdited(this.surveyName);
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
