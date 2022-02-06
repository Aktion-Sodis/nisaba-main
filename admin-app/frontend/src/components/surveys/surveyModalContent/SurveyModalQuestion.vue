<template>
  <v-card class="px-4 pt-4">
    <v-form lazy-validation>
      <v-card-title>
        <h2 v-if="read">
          {{ surveyNameInFocus }}
        </h2>
        <h2 v-else>
          {{ surveyDraft.name }}
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="backToDetailsHandler"
          :disabled="!canGoBackToDetails"
        >
          <v-icon large class="ml-2"> mdi-chevron-left </v-icon>
          {{ $t("interventionView.surveyModal.questionCard.back-to-details") }}
        </v-btn>
        <v-btn
          x-large
          text
          class="text-none"
          @click="finalizeSurveyHandler"
          :disabled="!canFinalize"
        >
          {{ $t("interventionView.surveyModal.questionCard.finalize-survey") }}
          <v-icon large class="ml-2"> mdi-chevron-right </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2 class="mb-2">
                {{
                  $t(
                    "interventionView.surveyModal.questionCard.form.question.title"
                  )
                }}
              </h2>
              <h3 v-if="read">
                {{ questionTextInFocus }}
              </h3>
              <v-textarea
                v-else
                autofocus
                v-model="questionText"
                :rules="[rules.maxChar]"
                :label="
                  $t(
                    'interventionView.surveyModal.questionCard.form.question.textLabel'
                  )
                "
                outlined
                dense
              ></v-textarea>

              <h3>
                {{
                  $t(
                    "interventionView.surveyModal.questionCard.form.question.imageTitle"
                  )
                }}
              </h3>
              <div class="d-flex justify-center">
                <v-btn
                  v-if="edit || create"
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
                        "interventionView.surveyModal.questionCard.form.question.addImage"
                      )
                    }}
                  </span>
                </v-btn>
              </div>

              <h3 class="mt-8">
                {{
                  $t(
                    "interventionView.surveyModal.questionCard.form.question.audioTitle"
                  )
                }}
              </h3>
              <div class="d-flex justify-center">
                <v-btn
                  v-if="edit || create"
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
                        "interventionView.surveyModal.questionCard.form.question.addAudio"
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
                    "interventionView.surveyModal.questionCard.form.answer.title"
                  )
                }}
              </h2>
              <v-select
                v-if="edit || create"
                v-model="questionType"
                :items="questionTypesItemValue"
                :label="
                  $t(
                    'interventionView.surveyModal.questionCard.form.answer.typeLabel'
                  )
                "
                outlined
                dense
              ></v-select>

              <v-divider class="mb-4"></v-divider>

              <div v-if="areAnswersNeeded">
                <div v-for="(answer, index) in answers" :key="index">
                  <h3>
                    {{
                      $t(
                        "interventionView.surveyModal.questionCard.form.answer.answer"
                      )
                    }}
                    {{ index + 1 }}
                  </h3>
                  <div class="d-flex justify-space-between">
                    <v-text-field
                      v-model="answers[index].answerText"
                      :label="
                        $t(
                          'interventionView.surveyModal.questionCard.form.answer.textLabel'
                        )
                      "
                      outlined
                      dense
                      :hide-details="true"
                      class="mb-2"
                    ></v-text-field>

                    <div class="d-flex">
                      <v-btn
                        v-if="edit || create"
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
                              "interventionView.surveyModal.questionCard.form.answer.addImage"
                            )
                          }}
                        </span>
                      </v-btn>
                      <input
                        v-if="edit || create"
                        type="file"
                        accept="image/png, image/jpeg"
                        ref="question-img-upload"
                        style="display: none"
                      />
                      <v-btn
                        v-if="edit || create"
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
                    v-if="edit || create"
                    color="primary"
                    rounded
                    x-large
                    class="mt-2"
                    @click="clickOnAddAnswer"
                  >
                    <v-icon class="mr-2"> mdi-plus </v-icon>
                    <span class="overflow-hidden">
                      {{
                        $t(
                          "interventionView.surveyModal.questionCard.form.answer.addAnswer"
                        )
                      }}
                    </span>
                  </v-btn>
                  <input
                    v-if="edit || create"
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
          {{ $t("interventionView.surveyModal.questionCard.discard-question") }}
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
          <v-icon large> mdi-skip-previous </v-icon>
          {{ $t("interventionView.surveyModal.questionCard.prior-question") }}
        </v-btn>
        <v-btn
          x-large
          text
          class="text-none"
          @click="nextQuestion"
          :disabled="!canAdvance"
          v-if="!isAtLastQuestion"
        >
          {{ $t("interventionView.surveyModal.questionCard.next-question") }}
          <v-icon large> mdi-skip-next </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="saveQuestion"
          :disabled="!canSave"
        >
          {{ $t("interventionView.surveyModal.questionCard.save-draft") }}
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
    questionCurrentDraft: "updateComponentData",
  },
  data() {
    return {
      rules: {
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
      surveyNameInFocus: "surveysUI/surveyNameInFocus",
      surveyModalMode: "surveysUI/getSurveyModalMode",
      questionCurrentDraft: "questionsUI/questionCurrentDraft",
      answersCurrentDraft: "questionsUI/answersCurrentDraft",
      nQuestions: "questionsUI/nQuestions",
      iQuestions: "questionsUI/getIQuestions",
      isAtLastQuestion: "questionsUI/isAtLastQuestion",
      isAtFirstQuestion: "questionsUI/isAtFirstQuestion",
      surveyDraft: "surveysUI/getSurveyDraft",
      questionTextInFocus: "surveysUI/questionTextInFocus",
    }),
    questionTypesItemValue() {
      return Object.keys(questionTypesDict).map((key) => ({
        text: this.$t(
          `interventionView.surveyModal.questionCard.form.answer.questionTypes.${key}`
        ),
        value: key,
      }));
    },
    maxCharExceededi18n() {
      return this.$t("login.maxCharExceeded", {
        maxChar: questionTextMaxChar,
      });
    },
    areThereChanges() {
      if (this.questionText !== this.questionCurrentDraft.questionText)
        return true;
      if (this.questionType !== this.questionCurrentDraft.questionType)
        return true;
      if (this.areAnswersNeeded) {
        if (this.answers.length !== this.answersCurrentDraft.length)
          return true;
        if (
          this.answers.filter(
            (a, i) => a.answerText !== this.answersCurrentDraft[i].answerText
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
      if (this.read) return false;
      return (
        (!this.areAnswersNeeded ||
          (this.answers.length > 0 &&
            !this.answers.find((a) => a.answerText === ""))) &&
        (!(this.questionCurrentDraft.isEmptyQuestion ?? true) ||
          this.areThereChanges)
      );
    },
    canFinalize() {
      return this.nQuestions > 1 && !this.areThereChanges;
    },
    canGoBackToDetails() {
      return this.read || !this.areThereChanges;
    },
    areAnswersNeeded() {
      return (
        this.questionType === "singleChoice" ||
        this.questionType === "multipleChoice"
      );
    },
  },
  methods: {
    ...mapActions({
      nextQuestionHandler: "questionsUI/nextQuestionHandler",
      priorQuestionHandler: "questionsUI/priorQuestionHandler",
      discardQuestionHandler: "questionsUI/discardQuestionHandler",
      saveQuestionHandler: "questionsUI/saveQuestionHandler",
    }),
    ...mapMutations({
      incrementCompletionIndex: "surveysUI/incrementSurveyModalCompletionIndex",
      decrementCompletionIndex: "surveysUI/decrementSurveyModalCompletionIndex",
    }),
    finalizeSurveyHandler() {
      this.incrementCompletionIndex();
    },
    backToDetailsHandler() {
      this.decrementCompletionIndex();
    },
    updateComponentData() {
      const q = this.questionCurrentDraft;
      const answersCurrentDraft = this.answersCurrentDraft;

      this.questionText = q.questionText;
      this.questionType = q.questionType;
      this.answers = [new EmptyAnswer()];
      if (answersCurrentDraft[0].isEmptyAnswer) return;

      for (let index = 0; index < answersCurrentDraft.length; index++) {
        const _answer = answersCurrentDraft[index];
        const newAnswer = new Answer({ answerText: _answer.answerText });
        this.answers.splice(index, 1, newAnswer);
      }
    },
    saveQuestion() {
      this.saveQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        // TODO: See whether reactivity breaks when direct reference is used
        // instead of generating a new array instance as follows
        newAnswers: [
          ...this.answers.map((a) => ({ answerText: a.answerText })),
        ],
      });
    },
    clickOnAddImage() {
      const imgInput = this.$refs["question-img-upload"];
      imgInput.click ? imgInput.click() : imgInput[0].click();
      console.log("TODO: do something with", imgInput);
    },
    clickOnAddAudio() {
      const audioInput = this.$refs["question-audio-upload"];
      audioInput.click();
      console.log("TODO: do something with", audioInput);
    },
    clickOnAddAnswer() {
      this.answers.push({ answerText: "" });
    },
    clickOnAddImgToAnswer() {
      console.log("TODO: hanle adding image to answer");
    },
    clickOnRemoveAnswer(index) {
      this.answers.splice(index, 1);
    },
    nextQuestion() {
      this.nextQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        // TODO: See whether reactivity breaks when direct reference is used
        // instead of generating a new array instance as follows
        newAnswers: [
          ...this.answers.map((a) => ({ answerText: a.answerText })),
        ],
      });
    },
    priorQuestion() {
      this.priorQuestionHandler({
        newQuestion: {
          questionText: this.questionText,
          questionType: this.questionType,
        },
        // TODO: See whether reactivity breaks when direct reference is used
        // instead of generating a new array instance as follows
        newAnswers: [
          ...this.answers.map((a) => ({ answerText: a.answerText })),
        ],
      });
    },
  },
};
</script>
