<template>
  <v-card class="px-4 pt-4">
    <v-card-title>
      <h2>
        {{
          calculateUILocaleString({
            languageTexts: surveyDraft.name.languageTexts,
          })
        }}
      </h2>
      <v-spacer></v-spacer>
      <v-btn x-large text class="text-none" @click="saveData" :disabled="false">
        {{ $t("surveys.modal.finalizeCard.publishSurvey") }}
        <v-icon large class="ml-2"> mdi-bullhorn-outline </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-list>
        <div
          v-for="(questionDraft, i) in questionDraftsWithoutLast"
          :key="questionDraft.id"
        >
          <v-list-group
            v-if="
              questionDraft.type === QuestionType.MULTIPLECHOICE ||
              questionDraft.type === QuestionType.SINGLECHOICE
            "
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-badge :content="i + 1" bottom overlap>
                  <div>
                    <div
                      v-if="questionDraft.type === QuestionType.MULTIPLECHOICE"
                      class="d-flex flex-row"
                    >
                      <v-icon> mdi-checkbox-outline </v-icon>
                      <v-icon> mdi-checkbox-blank-outline </v-icon>
                    </div>
                    <div
                      v-else-if="
                        questionDraft.type === QuestionType.SINGLECHOICE
                      "
                      class="d-flex flex-row"
                    >
                      <v-icon> mdi-radiobox-marked </v-icon>
                      <v-icon> mdi-radiobox-blank </v-icon>
                    </div>
                  </div>
                </v-badge>
              </v-list-item-icon>
              <v-list-item-title>
                (
                {{
                  $t(
                    `surveys.modal.questionCard.form.answer.questionTypes.${questionDraft.type}`
                  )
                }})
                {{
                  calculateUILocaleString({
                    languageTexts: questionDraft.text.languageTexts,
                  })
                }}
              </v-list-item-title>
            </template>

            <v-list-item
              v-for="optionDraft in optionDrafts[i]"
              :key="optionDraft.id"
            >
              <v-list-item-title>
                {{
                  calculateUILocaleString({
                    languageTexts: optionDraft?.text?.languageTexts,
                  })
                }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else>
            <v-list-item-icon>
              <div
                v-if="questionDraft.type === QuestionType.RATING"
                class="d-flex flex-row"
              >
                <v-icon> mdi-star </v-icon>
                <v-icon> mdi-star-half-full </v-icon>
              </div>
              <v-icon v-else large>
                {{ questionTypesIconDict[questionDraft.type] }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{
                `(${$t(
                  `surveys.modal.questionCard.form.answer.questionTypes.${questionDraft.type}`
                )}) ${calculateUILocaleString({
                  languageTexts: questionDraft.text.languageTexts,
                })}`
              }}
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn
        x-large
        text
        class="text-none"
        @click="decrementCompletionIndex"
        :disabled="false"
      >
        {{ $t("surveys.modal.finalizeCard.backToQuestions") }}
        <v-icon large class="ml-2"> mdi-arrow-left </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { questionTypesIconDict, vuexModulesDict } from "../../../lib/constants";
import { QuestionType } from "../../../models";

export default {
  name: "SurveyModalFinalize",
  computed: {
    ...mapGetters({
      surveyDraft: `${vuexModulesDict.dataModal}/getDataDraft`,
      questionDrafts: `${vuexModulesDict.question}/getQuestionDrafts`,
      optionDrafts: `${vuexModulesDict.question}/getOptionDrafts`,
      calculateUILocaleString: "calculateUILocaleString",
      dataIdInFocus: `${vuexModulesDict.dataModal}/getDataIdInFocus`,
      SURVEYById: `${vuexModulesDict.survey}/SURVEYById`,
    }),
    QuestionType() {
      return QuestionType;
    },
    questionTypesIconDict() {
      return questionTypesIconDict;
    },
    questionDraftsWithoutLast() {
      return this.questionDrafts.slice(0, -1);
    },
  },
  methods: {
    ...mapActions({
      saveData: `${vuexModulesDict.dataModal}/saveData`,
    }),
    ...mapMutations({
      incrementCompletionIndex: "incrementSurveyModalCompletionIndex",
      decrementCompletionIndex: "decrementSurveyModalCompletionIndex",
    }),
  },
};
</script>
