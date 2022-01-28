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
          @click="clickOnNextQuestion"
          :disabled="!isSaveable"
        >
          Save survey
          <v-icon large class="ml-2"> mdi-content-save-outline </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2>Question</h2>
              <v-textarea
                v-if="read || create"
                :autofocus="edit || create"
                v-model="questionText"
                :rules="[rules.required, rules.maxChar]"
                label="Question text TODO i18n"
                required
                outlined
                dense
                ref="question-text"
              ></v-textarea>

              <h3>Question Image TODO: i18n</h3>
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
                  <span class="overflow-hidden"> Add Image TODO: i18n </span>
                </v-btn>
              </div>

              <h3 class="mt-8">Question Audio TODO: i18n</h3>
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
                  <span class="overflow-hidden"> Add Audio TODO: i18n </span>
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <h2>Answer</h2>
              <v-select
                v-if="read || create"
                :autofocus="edit || create"
                v-model="questionType"
                :items="Object.keys(questionTypesDict)"
                :rules="[rules.required, rules.maxChar]"
                label="Question type TODO i18n"
                outlined
                dense
                ref="question-type"
              ></v-select>

              <div>
                <h3>Answer 1</h3>
                <div
                  class="d-flex justify-space-between"
                  v-for="(answer, index) in answers"
                  :key="index"
                >
                  <v-text-field
                    v-model="answers[index].answerText"
                    :rules="[rules.required]"
                    label="Answer text TODO i18n"
                    required
                    outlined
                    dense
                    :ref="`answer-text-${index}`"
                  ></v-text-field>

                  <div class="d-flex">
                    <v-btn
                      v-if="read || create"
                      color="primary"
                      rounded
                      outlined
                      @click="clickOnAddAnswer"
                      class="ml-2"
                    >
                      <v-icon class="mr-2"> mdi-image </v-icon>
                      <span class="overflow-hidden"> Add image to answer </span>
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
                  <span class="overflow-hidden"> Add answer </span>
                </v-btn>
                <input
                  v-if="!read"
                  type="file"
                  accept="audio/*"
                  ref="question-audio-upload"
                  style="display: none"
                />
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
          @click="closeThenDeleteComponentData"
        >
          Discard question
          <v-icon large> mdi-delete </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          text
          class="text-none"
          @click="clickOnNextQuestion"
          :disabled="!canAdvance"
        >
          Next question
          <v-icon large> mdi-chevron-right </v-icon>
        </v-btn>
      </v-card-actions>
      {{ initialAnswers }}
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modalModesDict, questionTypesDict } from "../../../store/constants";

const questionTextMaxChar = Math.max(
  parseInt(process.env.VUE_APP_QUESTION_TEXT_MAX_CHAR, 10),
  0
);

export default {
  name: "SurveyModalQuestion",
  props: {
    initialQText: {
      type: String,
      required: true,
    },
    initialQType: {
      type: String,
      required: true,
      validator: (value) => {
        Object.keys(questionTypesDict).includes(value);
      },
    },
    initialAnswers: {
      type: Array,
      required: true,
    },
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
      questionText: "",
      questionType: "text",
      answers: [{ answerText: "" }],
    };
  },
  mounted() {
    this.resetComponentData();
  },
  computed: {
    ...mapGetters({
      surveyName: "ivGui/getSurveyNameCurrentlyBeingEdited",
      surveyModalMode: "ivGui/getSurveyModalMode",
    }),
    requiredi18n() {
      return this.$t("login.required");
    },
    maxCharExceededi18n() {
      return this.$t("login.maxCharExceeded", {
        maxChar: questionTextMaxChar,
      });
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
    canAdvance() {
      return (
        this.questionText !== "" &&
        this.answers.length > 0 &&
        !new Set(this.answers.map((a) => a.answerText === "")).has(true)
      );
    },
    isSaveable() {
      return this.canAdvance;
    },
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    clickOnAddImage() {
      const imgInput = this.$refs["question-img-upload"];
      console.log({ imgInput });
      imgInput.click ? imgInput.click() : imgInput[0].click();
      console.log("TODO: do something with", imgInput);
    },
    resetComponentData() {
      this.questionText = this.initialQText;
      this.questionType = this.initialQType;
      this.answers = this.initialAnswers;
      console.log({ answers: this.answers });
      console.log({ initialAnswers: this.initialAnswers });
      for (let index = 0; index < this.initialAnswers.length; index++) {
        const initialAnswer = this.initialAnswers[index];
        console.log(initialAnswer.answerText);

        this.answers[index].answerText = initialAnswer.answerText;
      }
    },
    clickOnAddAudio() {
      const audioInput = this.$refs["question-audio-upload"];
      audioInput.click();
      console.log("TODO: do something with", audioInput);
    },
    clickOnAddAnswer() {
      this.answers.push({ answerText: "" });
    },
    async clickOnNextQuestion() {
      await this.$emit("pushToQuestions", {
        questionText: this.questionText,
        questionType: this.questionType,
        answers: this.answers,
      });
      await this.$nextTick();
      this.resetComponentData();
    },
    clickOnRemoveAnswer(index) {
      this.answers = this.answers.filter((a, i) => i !== index);
    },
    closeThenDeleteComponentData() {
      this.$emit("close");
      this.deleteComponentData();
    },
    deleteComponentData() {
      this.questionText = "";
      this.questionType = "text";
      this.answers = [{ answerText: "" }];
    },
  },
};
</script>
