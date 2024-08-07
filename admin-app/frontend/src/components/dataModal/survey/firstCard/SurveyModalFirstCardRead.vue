<template>
  <v-form lazy-validation>
    <v-card-title>
      <h2 v-if="surveyInFocus">
        {{
          calculateUILocaleString({
            languageTexts: surveyInFocus.name.languageTexts,
          })
        }}
      </h2>
      <v-spacer></v-spacer>
      <v-btn x-large text class="text-none" @click="incrementCompletionIndex">
        {{
          $vuetify.breakpoint.name === "xs"
            ? ""
            : $t("surveys.modal.firstCard.questions")
        }}
        <v-icon large> mdi-chevron-right </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="pb-0 px-0 px-md-3">
            <v-card-title class="pt-0 pt-sm-2">
              {{ $t("surveys.modal.firstCard.form.name") }}
            </v-card-title>
            <h2 v-if="surveyInFocus">
              {{
                calculateUILocaleString({
                  languageTexts: surveyInFocus.name.languageTexts,
                })
              }}
            </h2>

            <v-card-title class="pt-4">
              {{ $t("surveys.modal.firstCard.form.description") }}
            </v-card-title>
            <div
              v-if="surveyInFocus"
              class="d-flex flex-column justify-center"
              style="min-height: 10rem"
            >
              <h3>
                {{
                  calculateUILocaleString({
                    languageTexts: surveyInFocus.description.languageTexts,
                  })
                }}
              </h3>
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 px-0 px-md-3">
            <v-card-title class="pt-0 pt-sm-2">
              {{ $t("surveys.type.title") }}:
              <div v-if="surveyInFocus">
                <v-chip class="ml-2">
                  <v-icon>
                    {{
                      surveyInFocus.surveyType === initialSurveyType
                        ? "mdi-lightbulb-question-outline"
                        : "mdi-crosshairs-question"
                    }}
                  </v-icon>
                  {{ $t(`surveys.type.types.${surveyInFocus.surveyType}`) }}
                </v-chip>
              </div>
            </v-card-title>

            <v-card-title class="pr-0 d-flex" v-if="surveyInFocus">
              <span class="mr-2">
                {{ $t("surveys.modal.intervention") }}
              </span>
              <v-chip v-if="interventionOfSurveyInFocus">
                {{
                  calculateUILocaleString({
                    languageTexts:
                      interventionOfSurveyInFocus.name.languageTexts,
                  })
                }}
              </v-chip>
            </v-card-title>

            <v-card-title class="pt-0 pt-sm-2">
              {{ $t("surveys.modal.image") }}
            </v-card-title>

            <ImgFromS3
              v-if="surveyInFocus"
              :assumedSrc="deriveImgPath"
              dataType="survey"
              :key="rerenderImgFromS3"
            >
              <template v-slot:v-img="slotProps">
                <v-img max-height="200px" :src="slotProps.src"> </v-img>
              </template>
            </ImgFromS3>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn x-large color="secondary" text @click="abortReadData">
        {{ $t("general.close") }}
      </v-btn>
      <v-btn x-large color="primary" text @click="editData">
        {{ $t("general.edit") }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ImgFromS3 from "../../../commons/ImgFromS3.vue";
import { SurveyType } from "../../../../models";

export default {
  name: "SurveyModalFirstCardRead",
  components: { ImgFromS3 },
  data() {
    return {
      rerenderImgFromS3: false,
    };
  },
  watch: {
    deriveImgPath() {
      this.rerenderImgFromS3 = !this.rerenderImgFromS3;
    },
  },
  computed: {
    ...mapGetters({
      dataIdInFocus: "dataModal/getDataIdInFocus",
      SURVEYById: "SURVEY_Data/SURVEYById",
      calculateUILocaleString: "calculateUILocaleString",
      INTERVENTIONById: "INTERVENTION_Data/INTERVENTIONById",
      interventions: "INTERVENTION_Data/getInterventions",
      deriveFilePath: "callDeriveFilePathWithOrganizationId",
    }),
    surveyInFocus() {
      return this.SURVEYById({ id: this.dataIdInFocus });
    },
    interventionOfSurveyInFocus() {
      return this.INTERVENTIONById({
        id: this.surveyInFocus.interventionSurveysId,
      });
    },
    deriveImgPath() {
      return this.deriveFilePath("interventionSurveyPicPath", {
        interventionID: this.surveyInFocus.interventionSurveysId,
        surveyID: this.dataIdInFocus,
      });
    },
    initialSurveyType() {
      return SurveyType.INITIAL;
    },
  },
  methods: {
    ...mapActions({
      abortReadData: "dataModal/abortReadData",
      editData: "dataModal/editData",
    }),
    ...mapMutations({
      incrementCompletionIndex: "incrementSurveyModalCompletionIndex",
    }),
  },
};
</script>
