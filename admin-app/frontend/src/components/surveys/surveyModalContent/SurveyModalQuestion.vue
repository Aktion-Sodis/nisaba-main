<template>
  <v-card class="px-4 pt-4">
    <v-form ref="form" lazy-validation>
      <v-card-title>
        <h2>
          {{ surveyName }}
        </h2>
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
                  class="ml-2"
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
        <v-spacer></v-spacer>
        <v-btn x-large text class="text-none" @click="clickOnNextQuestion">
          Next question
          <v-icon large> mdi-chevron-right </v-icon>
        </v-btn>
      </v-card-actions>
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
  data() {
    return {
      rules: {
        required: (value) => !!value || this.requiredi18n,
        maxChar: (value) =>
          value.length <= questionTextMaxChar || this.maxCharExceededi18n,
      },
      modalModesDict,
      questionText: "",
      questionTypesDict,
      questionType: "text",
      answers: [{ answerText: "" }],
    };
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
    clickOnAddAudio() {
      const audioInput = this.$refs["question-audio-upload"];
      audioInput.click();
      console.log("TODO: do something with", audioInput);
    },
    clickOnAddAnswer() {
      this.answers.push({ answerText: "" });
    },
    clickOnNextQuestion() {},
    clickOnRemoveAnswer(index) {
      this.answers = this.answers.filter((a, i) => i !== index);
    },
  },
};
</script>
