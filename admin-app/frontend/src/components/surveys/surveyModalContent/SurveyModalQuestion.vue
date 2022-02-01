<template>
  <v-card class="px-4 pt-4">
    <v-form ref="form" lazy-validation>
      <v-card-title>
        <h2>
          {{ surveyName }}
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="saveSurveyHandler"
          :disabled="true"
        >
          {{ $t("interventionView.surveyModalQuestionCard.publish-survey") }}
          <v-icon large class="ml-2"> mdi-upload </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2 class="mb-2">
                {{
                  $t(
                    "interventionView.surveyModalQuestionCard.form.question.title"
                  )
                }}
              </h2>
              <v-textarea
                v-if="read || create"
                :autofocus="edit || create"
                v-model="questionText"
                :rules="[rules.maxChar]"
                :label="
                  $t(
                    'interventionView.surveyModalQuestionCard.form.question.textLabel'
                  )
                "
                outlined
                dense
                ref="question-text"
              ></v-textarea>

              <h3>
                {{
                  $t(
                    "interventionView.surveyModalQuestionCard.form.question.imageTitle"
                  )
                }}
              </h3>
              <div class="d-flex justify-center">
                <v-btn
                  v-if="read || create"
                  color="primary"
                  rounded
                  x-large
                  @click="clickOnAddImage"
                  class="mt-4"
                >
                  <v-icon class="mr-2"> mdi-image </v-icon>
                  <span class="overflow-hidden">
                    {{
                      $t(
                        "interventionView.surveyModalQuestionCard.form.question.addImage"
                      )
                    }}
                  </span>
                </v-btn>
              </div>

              <h3 class="mt-8">
                {{
                  $t(
                    "interventionView.surveyModalQuestionCard.form.question.audioTitle"
                  )
                }}
              </h3>
              <div class="d-flex justify-center">
                <v-btn
                  v-if="read || create"
                  color="primary"
                  rounded
                  x-large
                  @click="clickOnAddAudio"
                  class="mt-4"
                >
                  <v-icon class="mr-2"> mdi-waveform </v-icon>
                  <span class="overflow-hidden">
                    {{
                      $t(
                        "interventionView.surveyModalQuestionCard.form.question.addAudio"
                      )
                    }}
                  </span>
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <h2 class="mb-2">
                {{
                  $t(
                    "interventionView.surveyModalQuestionCard.form.answer.title"
                  )
                }}
              </h2>
              <v-select
                v-if="read || create"
                :autofocus="edit || create"
                v-model="questionType"
                :items="questionTypesItemValue"
                :label="
                  $t(
                    'interventionView.surveyModalQuestionCard.form.answer.typeLabel'
                  )
                "
                outlined
                dense
                ref="question-type"
              ></v-select>

              <v-divider class="mb-4"></v-divider>

              <div v-if="areAnswersNeeded">
                <div v-for="(answer, index) in answers" :key="index">
                  <h3>
                    {{
                      $t(
                        "interventionView.surveyModalQuestionCard.form.answer.answer"
                      )
                    }}
                    {{ index + 1 }}
                  </h3>
                  <div class="d-flex justify-space-between">
                    <v-text-field
                      v-model="answers[index].answerText"
                      :label="
                        $t(
                          'interventionView.surveyModalQuestionCard.form.answer.textLabel'
                        )
                      "
                      outlined
                      dense
                      :ref="`answer-text-${index}`"
                      :hide-details="true"
                      class="mb-2"
                    ></v-text-field>

                    <div class="d-flex">
                      <v-btn
                        v-if="read || create"
                        color="primary"
                        rounded
                        outlined
                        @click="clickOnAddImgToAnswer"
                        class="ml-2"
                      >
                        <v-icon class="mr-2"> mdi-image </v-icon>
                        <span class="overflow-hidden">
                          {{
                            $t(
                              "interventionView.surveyModalQuestionCard.form.answer.addImage"
                            )
                          }}
                        </span>
                      </v-btn>
                      <input
                        v-if="!read"
                        type="file"
                        accept="image/png, image/jpeg"
                        ref="question-img-upload"
                        style="display: none"
                      />
                      <v-btn
                        v-if="read || create"
                        color="primary"
                        outlined
                        icon
                        @click="clickOnRemoveAnswer(index)"
                        class="ml-2"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-center">
                  <v-btn
                    v-if="read || create"
                    color="primary"
                    rounded
                    x-large
                    @click="clickOnAddAnswer"
                    class="mt-2"
                  >
                    <v-icon class="mr-2"> mdi-plus </v-icon>
                    <span class="overflow-hidden">
                      {{
                        $t(
                          "interventionView.surveyModalQuestionCard.form.answer.addAnswer"
                        )
                      }}
                    </span>
                  </v-btn>
                  <input
                    v-if="!read"
                    type="file"
                    accept="audio/*"
                    ref="question-audio-upload"
                    style="display: none"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          x-large
          text
          color="warning"
          class="text-none"
          @click="discardQuestionHandler"
        >
          {{ $t("interventionView.surveyModalQuestionCard.discard-question") }}
          <v-icon large> mdi-delete </v-icon>
        </v-btn>
        <v-spacer v-if="!isAtLastQuestion"></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="priorQuestion"
          :disabled="!canAdvanceBack"
          v-if="!isAtLastQuestion"
        >
          <v-icon large> mdi-chevron-left </v-icon>
          {{ $t("interventionView.surveyModalQuestionCard.prior-question") }}
        </v-btn>
        <v-btn
          x-large
          text
          class="text-none"
          @click="nextQuestion"
          :disabled="!canAdvance"
          v-if="!isAtLastQuestion"
        >
          {{ $t("interventionView.surveyModalQuestionCard.next-question") }}
          <v-icon large> mdi-chevron-right </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="saveQuestion"
          :disabled="!canSave"
        >
          {{ $t("interventionView.surveyModalQuestionCard.save-question") }}
          <v-icon large class="ml-2"> mdi-content-save-outline </v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict, questionTypesDict } from "../../../store/constants";
import {
  EmptyQuestion,
  EmptyAnswer,
  Answer,
} from "../../../store/questionsModule/utils";

const questionTextMaxChar = Math.max(
  parseInt(process.env.VUE_APP_QUESTION_TEXT_MAX_CHAR, 10),
  0
);

export default {
  name: "SurveyModalQuestion",
  watch: {
    iQuestions: "updateComponentData",
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || this.requiredi18n,
        maxChar: (value) =>
          value.length <= questionTextMaxChar || this.maxCharExceededi18n,
      },
      modalModesDict,
      questionTypesDict,
      questionText: new EmptyQuestion().questionText,
      questionType: new EmptyQuestion().questionType,
      answers: [new EmptyAnswer()],
    };
  },
  computed: {
    ...mapGetters({
      surveyName: "ivGui/getSurveyNameCurrentlyBeingEdited",
      surveyModalMode: "ivGui/getSurveyModalMode",
      canAdvanceForward: "q/canAdvanceForward",
      currentQuestion: "q/currentQuestion",
      currentAnswers: "q/currentAnswers",
      currentQuestionWithAnswers: "q/currentQuestionWithAnswers",
      nQuestions: "q/nQuestions",
      iQuestions: "q/getIQuestions",
      isAtLastQuestion: "q/isAtLastQuestion",
      isAtFirstQuestion: "q/isAtFirstQuestion",
    }),
    questionTypesItemValue() {
      let res = [];
      for (const key in questionTypesDict) {
        res.push({
          text: this.$t(
            `interventionView.surveyModalQuestionCard.form.answer.questionTypes.${key}`
          ),
          value: key,
        });
      }
      return res;
    },
    requiredi18n() {
      return this.$t("login.required");
    },
    maxCharExceededi18n() {
      return this.$t("login.maxCharExceeded", {
        maxChar: questionTextMaxChar,
      });
    },
    areThereChanges() {
      if (this.questionText !== this.currentQuestion.questionText) return true;
      if (this.areAnswersNeeded) {
        if (this.answers.length !== this.currentAnswers.length) return true;
        if (
          this.answers.filter(
            (a, i) => a.answerText !== this.currentAnswers[i].answerText
          ).length > 0
        )
          return true;
      }
      return false;
    },
    edit() {
      return this.surveyModalMode === this.modalModesDict.edit;
    },
    create() {
      return this.surveyModalMode === this.modalModesDict.create;
    },
    read() {
      return this.surveyModalMode === this.modalModesDict.read;
    },
    canAdvanceBack() {
      return !this.isAtFirstQuestion && !this.areThereChanges;
    },
    canAdvance() {
      return this.iQuestions < this.nQuestions - 2 && !this.areThereChanges;
    },
    canSave() {
      return (
        this.questionText !== "" &&
        (!this.areAnswersNeeded ||
          (this.answers.length > 0 &&
            !this.answers.find((a) => a.answerText === ""))) &&
        (!(this.currentQuestion.isEmptyQuestion ?? true) ||
          this.areThereChanges)
      );
    },
    areAnswersNeeded() {
      return (
        this.questionType === "text" ||
        this.questionType === "singleChoice" ||
        this.questionType === "multipleChoice"
      );
    },
  },
  methods: {
    ...mapActions({
      nextQuestionHandler: "q/nextQuestionHandler",
      priorQuestionHandler: "q/priorQuestionHandler",
      discardQuestionHandler: "q/discardQuestionHandler",
      saveQuestionHandler: "q/saveQuestionHandler",
    }),
    saveSurveyHandler() {},
    updateComponentData() {
      const q = this.currentQuestion;
      const currentAnswers = this.currentAnswers;

      this.questionText = q.questionText;
      this.questionType = q.questionType;
      for (let index = 0; index < currentAnswers.length; index++) {
        const cA = currentAnswers[index];
        const nA = new Answer({ answerText: cA.answerText });
        this.answers.splice(index, 1, nA);
      }
    },
    saveQuestion() {
      this.saveQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        newAnswers: Array.from(this.answers),
      });
    },
    ...mapMutations({}),
    clickOnAddImage() {
      const imgInput = this.$refs["question-img-upload"];
      imgInput.click ? imgInput.click() : imgInput[0].click();
    },
    clickOnAddAudio() {
      const audioInput = this.$refs["question-audio-upload"];
      audioInput.click();
      console.log("TODO: do something with", audioInput);
    },
    clickOnAddAnswer() {
      this.answers.push({ answerText: "" });
    },
    clickOnAddImgToAnswer() {},
    clickOnRemoveAnswer(index) {
      this.answers.splice(index, 1);
    },
    nextQuestion() {
      this.nextQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        newAnswers: Array.from(this.answers),
      });
    },
    priorQuestion() {
      this.priorQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        newAnswers: Array.from(this.answers),
      });
    },
  },
};
</script>
