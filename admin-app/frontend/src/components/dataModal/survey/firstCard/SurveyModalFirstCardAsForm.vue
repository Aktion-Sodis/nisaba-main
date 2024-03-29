<template>
  <v-card class="px-0 pt-0 px-md-4 pt-md-4">
    <v-form lazy-validation>
      <v-card-title>
        <h2 v-if="edit && surveyInFocus">
          {{ $t("surveys.modal.firstCard.title.edit") }}
          <i>
            {{
              calculateUILocaleString({
                languageTexts: surveyInFocus.name.languageTexts,
              })
            }}
          </i>
        </h2>
        <h2 v-else>
          {{ $t("surveys.modal.firstCard.title.create") }}
        </h2>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" class="pb-0 px-0 px-md-3">
              <v-card-title class="pt-0 pt-sm-2">
                {{ $t("surveys.modal.firstCard.form.name") }}
                <span color="darkred">*</span>
              </v-card-title>
              <LocaleTextBox
                labelPrefixI18nSelector="surveys.modal.firstCard.form.name"
                :initVal="name"
                @res="nameUpdatedHandler"
                :key="rerenderNameLocaleTextBox"
              >
                <template v-slot:text-input="slotProps">
                  <v-text-field
                    :label="slotProps.label"
                    v-model="slotProps.model"
                    autofocus
                    required
                    outlined
                    dense
                    @input="slotProps.inputHandler"
                  ></v-text-field>
                </template>
              </LocaleTextBox>

              <v-card-title class="pt-4">
                {{ $t("surveys.modal.firstCard.form.description") }}
              </v-card-title>
              <LocaleTextBox
                labelPrefixI18nSelector="surveys.modal.firstCard.form.description"
                :initVal="description"
                @res="descriptionUpdatedHandler"
                :key="rerenderDescriptionLocaleTextBox"
              >
                <template v-slot:text-input="slotProps">
                  <v-textarea
                    autofocus
                    required
                    outlined
                    dense
                    :label="slotProps.label"
                    v-model="slotProps.model"
                    @input="slotProps.inputHandler"
                  ></v-textarea>
                </template>
              </LocaleTextBox>
            </v-col>
            <v-col cols="12" sm="6" class="pt-0 px-0 px-md-3">
              <v-card-title class="pt-0 pt-sm-2">
                {{ $t("surveys.type.title") }}:
                <v-btn-toggle v-model="typeIndex" mandatory class="ml-2">
                  <v-btn>
                    <v-icon>mdi-lightbulb-question-outline</v-icon>
                    <span class="ml-1">
                      {{ $t("surveys.type.types.INITIAL") }}
                    </span>
                  </v-btn>
                  <v-btn>
                    <v-icon>mdi-crosshairs-question</v-icon>
                    <span class="ml-1">
                      {{ $t("surveys.type.types.DEFAULT") }}
                    </span>
                  </v-btn>
                </v-btn-toggle>
              </v-card-title>

              <div class="d-flex">
                <v-card-title class="pr-0 flex-grow-1">
                  <span class="mr-2" style="white-space: nowrap">
                    {{ $t("surveys.modal.intervention") }}
                    <span color="darkred">*</span>
                  </span>
                </v-card-title>
                <v-select
                  v-model="interventionId"
                  :items="interventions"
                  item-value="id"
                  dense
                  :label="$t('interventions.title')"
                  outlined
                  class="mt-6"
                >
                  <template v-slot:selection="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.name.languageTexts,
                      })
                    }}
                  </template>
                  <template v-slot:item="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.name.languageTexts,
                      })
                    }}
                  </template>
                </v-select>
              </div>

              <v-card-title class="pt-0 pt-sm-2">
                {{ $t("surveys.modal.image") }}
              </v-card-title>

              <ImgFromS3
                :assumedSrc="assumedSrc"
                :key="rerenderImgFromS3"
                dataType="survey"
              >
                <template v-slot:v-img="slotProps">
                  <v-img max-height="200px" :src="slotProps.src">
                    <v-btn
                      class="iv-edit-icon"
                      color="primary"
                      @click="selectImg"
                    >
                      <v-icon color="darken-2"> mdi-plus </v-icon>
                      <span>
                        {{
                          edit
                            ? $t("general.editImage")
                            : $t("general.addImage")
                        }}
                      </span>
                    </v-btn>

                    <FileInput
                      ref="img-upload"
                      style="display: none"
                      :acceptedType="'image/png'"
                    />
                  </v-img>
                </template>
              </ImgFromS3>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn x-large color="secondary" text @click="closeHandler">
          {{ $t("general.cancel") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          v-if="edit"
          @click="archiveData(!surveyInFocus.archived)"
          :color="surveyInFocus.archived ? 'green' : 'destructive'"
          text
        >
          {{
            surveyInFocus.archived
              ? $t("general.restore")
              : $t("general.archive")
          }}
          <v-icon large> mdi-archive </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!edit"
          x-large
          text
          class="text-none"
          @click="nextStepHandler"
          :disabled="!canAdvance"
        >
          {{
            $vuetify.breakpoint.name === "xs"
              ? ""
              : $t(`surveys.modal.firstCard.next-step`)
          }}
          <v-icon large> mdi-chevron-right </v-icon>
        </v-btn>
        <v-btn
          x-large
          v-if="edit"
          type="submit"
          color="primary"
          text
          @click.prevent="submitHandler"
          :disabled="!canAdvance"
        >
          {{ $t("general.save") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict } from "../../../../lib/constants";
import ImgFromS3 from "../../../commons/ImgFromS3.vue";
import { Survey, SurveyType } from "../../../../models";
import {
  emptyMutableI18nString,
  mutableI18nString,
} from "../../../../lib/classes";
import LocaleTextBox from "../../../commons/form/LocaleTextBox.vue";
import FileInput from "../../../commons/form/FileInput.vue";

export default {
  name: "SurveyModalFirstCardAsForm",
  components: {
    LocaleTextBox,
    ImgFromS3,
    FileInput
  },
  data() {
    return {
      name: emptyMutableI18nString(),
      description: emptyMutableI18nString(),
      SurveyType,
      typeIndex: 0,
      types: [SurveyType.INITIAL, SurveyType.DEFAULT],
      interventionId: null,
      rerenderNameLocaleTextBox: 0, // increment this
      rerenderDescriptionLocaleTextBox: 1, // decrement this
      rerenderImgFromS3: false,
    };
  },
  watch: {
    imageFile() {
      this.rerenderImgFromS3 = !this.rerenderImgFromS3;
    },
  },
  mounted() {
    this.prefillComponentDataFromDataDraft();
  },
  computed: {
    ...mapGetters({
      modalMode: "dataModal/getMode",
      dataIdInFocus: "dataModal/getDataIdInFocus",
      dataDraft: "dataModal/getDataDraft",
      imageFile: "dataModal/getImageFile",
      SURVEYById: "SURVEY_Data/SURVEYById",
      fallbackLocaleIndex: "fallbackLocaleIndex",
      calculateUILocaleString: "calculateUILocaleString",
      INTERVENTIONById: "INTERVENTION_Data/INTERVENTIONById",
      interventions: "INTERVENTION_Data/getInterventions",
      deriveFilePath: "callDeriveFilePathWithOrganizationId",
    }),
    surveyInFocus() {
      return this.SURVEYById({ id: this.dataIdInFocus });
    },
    edit() {
      return this.modalMode === modalModesDict.edit;
    },
    canAdvance() {
      return (
        this.name.languageTexts[this.fallbackLocaleIndex] && this.interventionId
      );
    },
    type() {
      return this.types[this.typeIndex];
    },
    deriveImgPath() {
      return this.edit
        ? this.deriveFilePath("interventionSurveyPicPath", {
            interventionID: this.surveyInFocus.interventionSurveysId,
            surveyID: this.dataIdInFocus,
          })
        : null;
    },
    assumedSrc() {
      return this.imageFile ?? this.deriveImgPath;
    },
  },
  methods: {
    ...mapActions({
      editData: "dataModal/editData",
      saveData: "dataModal/saveData",
      archiveData: "dataModal/archiveData",
      abortCreateData: "dataModal/abortCreateData",
      abortEditData: "dataModal/abortEditData",
    }),
    ...mapMutations({
      setDraft: "dataModal/setDraft",
      incrementCompletionIndex: "incrementSurveyModalCompletionIndex",
    }),
    async submitHandler() {
      this.setDraftFromComponentData();
      await this.$nextTick();
      this.saveData();
    },
    setDraftFromComponentData() {
      this.setDraft(
        new Survey({
          name: this.name,
          description: this.description,
          tags: [],
          questions: [],
          surveyType: this.type,
          // intervention: this.INTERVENTIONById({ id: this.interventionId }),
          interventionSurveysId: this.interventionId,
        })
      );
    },
    selectImg() {
      const imgInput = this.$refs["img-upload"];
      imgInput.$el.click();
    },
    nextStepHandler() {
      const surveyDraftFromLocalStorage = JSON.parse(
        localStorage.getItem("surveyDraft")
      );
      localStorage.setItem(
        "surveyDraft",
        JSON.stringify({
          ...surveyDraftFromLocalStorage,
          dataDraft: {
            name: this.name,
            description: this.description,
            interventionId: this.interventionId,
            typeIndex: this.typeIndex,
          },
        })
      );

      this.setDraftFromComponentData();
      this.incrementCompletionIndex();
    },
    prefillComponentDataFromDataDraft() {
      // this.name =
      //   mutableI18nString({
      //     languageTexts: this.dataDraft?.name.languageTexts,
      //   }) ?? emptyMutableI18nString();
      // this.description =
      //   mutableI18nString({
      //     languageTexts: this.dataDraft?.description.languageTexts,
      //   }) ?? emptyMutableI18nString();
      // // this.surveyTags = this.tagIdsBySurveyId({ surveyId: this.dataIdInFocus }) ?? [];
      // this.interventionId = this.dataDraft?.intervention?.id ?? null;

      const surveyDraftFromLocalStorage = JSON.parse(
        localStorage.getItem("surveyDraft")
      );

      this.name =
        mutableI18nString({
          languageTexts:
            surveyDraftFromLocalStorage?.dataDraft?.name?.languageTexts,
        }) ?? emptyMutableI18nString();

      this.description =
        mutableI18nString({
          languageTexts:
            surveyDraftFromLocalStorage?.dataDraft?.description?.languageTexts,
        }) ?? emptyMutableI18nString();

      this.interventionId =
        surveyDraftFromLocalStorage?.dataDraft?.interventionId ?? null;

      this.typeIndex =
        surveyDraftFromLocalStorage?.dataDraft?.typeIndex ?? this.typeIndex;

      this.rerenderDescriptionLocaleTextBox += 1;
      this.rerenderNameLocaleTextBox -= 1;
    },
    closeHandler() {
      if (this.edit) this.abortEditData();
      else this.abortCreateData();
    },
    nameUpdatedHandler(res) {
      this.name = res;
    },
    descriptionUpdatedHandler(res) {
      this.description = res;
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
