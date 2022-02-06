<template>
  <v-card class="px-4 pt-4">
    <v-form lazy-validation>
      <v-card-title>
        <h2 v-if="edit">
          {{ $t("interventionView.surveyModal.firstCard.title.edit") }}
          <i>{{ surveyInFocus.name }}</i>
        </h2>
        <h2 v-else-if="create">
          {{ $t("interventionView.surveyModal.firstCard.title.create") }}
        </h2>
        <h2 v-else-if="read">{{ surveyInFocus.name }}</h2>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="nextStepHandler"
          :disabled="!canAdvance"
        >
          {{
            read
              ? $t("interventionView.surveyModal.firstCard.questions")
              : $t(`interventionView.surveyModal.firstCard.next-step`)
          }}
          <v-icon large> mdi-chevron-right </v-icon>
        </v-btn>
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
                autofocus
                v-model="surveyName"
                :label="$t('interventionView.surveyModal.firstCard.form.name')"
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
                :label="
                  $t('interventionView.surveyModal.firstCard.form.description')
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
                <div v-if="!read" class="iv-edit-icon">
                  <v-btn fab color="primary" @click="selectImg">
                    <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                  </v-btn>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="img-upload"
                    style="display: none"
                  />
                </div>
              </v-img>

              <div v-if="read">
                <h2>
                  {{ $t("interventionView.surveyModal.firstCard.form.tags") }}
                </h2>
                <v-chip v-for="tag in tagsInFocus" :key="tag.tagId">
                  {{ tag }}
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
                :label="$t('interventionView.surveyModal.firstCard.form.tags')"
                multiple
                outlined
                class="mt-8"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="warning" text @click="exitHandler">
          {{ read ? "Close" : $t("general.cancel") }}
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
  mounted() {
    this.prefillComponentDataFromSurveyDraft();
  },
  computed: {
    ...mapGetters({
      surveyModalMode: "surveysUI/getSurveyModalMode",
      surveyInFocus: "surveysUI/surveyInFocus",
      surveyDraft: "surveysUI/getSurveyDraft",
      allSurveyTags: "surveysData/getSurveyTags",
      tagsInFocus: "surveysUI/tagsInFocus",
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
      return this.read || this.surveyName !== "";
    },
    maxCharExceededi18n() {
      return this.$t("login.maxCharExceeded", {
        maxChar: surveyDescriptionMaxChar,
      });
    },
  },
  methods: {
    ...mapActions({
      abortNewSurveyHandler: "surveysUI/abortNewSurveyHandler",
      abortReadSurveyHandler: "surveysUI/abortReadSurveyHandler",
      abortEditSurveyHandler: "surveysUI/abortEditSurveyHandler",
    }),
    ...mapMutations({
      setSurveyDraft: "surveysUI/setSurveyDraft",
      incrementCompletionIndex: "surveysUI/incrementSurveyModalCompletionIndex",
    }),
    selectImg() {
      const imgInput = this.$refs["img-upload"];
      imgInput.click();
      console.log("TODO: do something with", imgInput);
    },
    nextStepHandler() {
      this.setSurveyDraft({
        name: this.surveyName,
        description: this.surveyDescription,
        tags: this.surveyTags,
      });
      this.incrementCompletionIndex();
    },
    prefillComponentDataFromSurveyDraft() {
      this.surveyName = this.surveyDraft?.name ?? "";
      this.surveyDescription = this.surveyDraft?.description ?? "";
      this.surveyTags = this.surveyDraft?.tags ?? [];
    },
    exitHandler() {
      if (this.read) {
        this.abortReadSurveyHandler();
        return;
      }
      if (this.edit) {
        this.abortEditSurveyHandler();
        return;
      }
      if (this.create) {
        this.abortNewSurveyHandler();
      }
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
