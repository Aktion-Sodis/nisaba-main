<template>
  <v-row class="ma-0">
    <v-col class="pa-0">
      <v-row class="ma-0 mr-2 ml-2 top-row align-center">
        <v-col cols="10" class="pa-0">
          <v-btn
            @click="resetSelectedSurvey"
            :ripple="false"
            class="reset-btn"
            color="primary"
          >
            <v-icon size="25">mdi-arrow-left</v-icon>
          </v-btn>
          <v-tooltip
            :text="
              questionListExpanded ? 'Hide Question List' : 'Show Question List'
            "
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                @click="toggleQuestionList"
                :ripple="false"
                class="toggle-btn"
                variant="text"
                color="primary"
                v-bind="props"
              >
                <v-icon v-if="questionListExpanded" size="25"
                  >mdi-chevron-double-left</v-icon
                >
                <v-icon v-else size="25">mdi-chevron-double-right</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <div class="d-inline survey-name">
            {{ surveyName }}
          </div>
        </v-col>
        <v-col cols="2" class="settings text-right pa-0">
          <v-btn class="settings-btn">
            <v-icon icon="mdi-filter"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="loading" class="ma-0 mr-2 align-center">
        <v-col class="d-flex justify-center align-center pa-0">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else class="content-row ma-0 mr-2 ml-2">
        <v-col :cols="questionListExpanded ? 3 : 1" class="sidebar-panel pa-0">
          <div class="sidebar-panel-inside">
            <v-list-item
              v-for="(question, i) in surveyQuestions"
              :key="i"
              :value="question"
              color="primary"
              class="list-item mb-2"
              :class="{
                collapsed: questionListExpanded === false,
                active:
                  this.selectedQuestion.question_id === question.question_id,
              }"
              @click="selectQuestion(question)"
            >
              <template v-slot:prepend>
                <div class="list-item-title">{{ question.id }}</div>
              </template>
              <v-list-item-subtitle
                v-if="questionListExpanded"
                class="list-item-subtitle"
              >
                {{ question.name }}
              </v-list-item-subtitle>
            </v-list-item>
          </div>
        </v-col>
        <v-col :cols="questionListExpanded ? 9 : 11" class="answers pa-0">
          <TextComponent
            v-if="selectedQuestion.type === 'TEXT'"
            :questionProperties="selectedQuestionProperties"
          />
          <MultipleChoiceComponent
            v-if="selectedQuestion.type === 'MULTIPLECHOICE'"
            :questionProperties="selectedQuestionProperties"
          />
          <SingleChoiceComponent
            v-if="selectedQuestion.type === 'SINGLECHOICE'"
            :questionProperties="selectedQuestionProperties"
          />
          <div v-else>{{ selectedQuestion.type }}</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useSurveyStore } from "@/store/surveys";
import { usei18nStore } from "@/store/i18n";

import MultipleChoiceComponent from "@/components/data/MultipleChoiceComponent.vue";
import SingleChoiceComponent from "@/components/data/SingleChoiceComponent.vue";
import TextComponent from "@/components/data/TextComponent.vue";

export default {
  name: "SurveyData",
  components: { MultipleChoiceComponent, TextComponent, SingleChoiceComponent },
  data: () => ({
    questionListExpanded: true,
    surveyName: "",
    surveyQuestions: [],
    loading: false,
    selectedQuestion: [],
    selectedQuestionProperties: [],
  }),

  computed: {
    ...mapStores(useSurveyStore, usei18nStore),
  },

  watch: {
    "surveyStore.selectedSurvey"(newData) {
      this.loading = true;
      this.getSurveyName(newData);
      this.getQuestions(newData);
      this.loading = false;
    },
  },

  mounted() {
    this.surveyStore
      .fetchSurveyBySurveyID(this.surveyStore.selectedSurveyID)
      .then(() => {
        // Call fetchSurveyDataBySurveyID after fetchSurveyBySurveyID is completed
        this.surveyStore
          .fetchSurveyDataBySurveyID(this.surveyStore.selectedSurveyID)
          .then(() => {
            // Call selectQuestion after fetchSurveyDataBySurveyID is completed
            this.selectQuestion(this.surveyQuestions[0]);
          });
      });
  },

  methods: {
    toggleQuestionList() {
      this.questionListExpanded = !this.questionListExpanded;
    },

    resetSelectedSurvey() {
      this.surveyStore.setSelectedSurveyID(null);
    },

    selectQuestion(question) {
      console.log(this.selectedQuestionProperties);
      this.selectedQuestion = { ...question };
      this.getQuestionProperties(
        this.surveyStore.selectedSurveyData,
        this.selectedQuestion.question_id
      );
    },

    getSurveyName(data) {
      const languageKeys = data.name.languageKeys;
      const languageTexts = data.name.languageTexts;

      this.surveyName = this.i18nStore.getLanguageText(
        languageKeys,
        languageTexts,
        this.$i18n
      );
    },

    getQuestions(data) {
      this.surveyQuestions = [];
      data.questions.forEach((question, index) => {
        let questionText = this.i18nStore.getLanguageText(
          question.text.languageKeys,
          question.text.languageTexts,
          this.$i18n.locale
        );
        const formattedQuestion = {
          id: index + 1,
          name: questionText,
          question_id: question.id,
          type: question.type,
        };
        this.surveyQuestions.push(formattedQuestion);
        if (index === 0) {
          this.selectQuestion(formattedQuestion);
        }
      });
    },

    getQuestionProperties(dataset, questionId) {
      this.selectedQuestionProperties = dataset.find(
        (item) => item.question_id === questionId
      );
    },
  },
};
</script>

<style scoped>
.survey-name {
  font-size: 18px;
  margin-left: 10px;
}
.answers {
  overflow-y: auto;
  max-height: 100%;
}
.reset-btn {
  max-width: 55px;
  min-width: 55px;
}
.toggle-btn {
  max-width: 35px;
  min-width: 35px;
  min-height: 35px;
  max-height: 35px;
}
.top-row {
  height: 50px;
}
.list-item {
  /* border: 1px black solid; */
  padding-top: 10px;
  padding-bottom: 10px;
  height: 70px;
  /* width: 300px; */
  border-radius: 5px;
  background-color: #2d91be;
}
.list-item:hover {
  background-color: #feaa3a;
  opacity: 0.9;
}
.active {
  background-color: #feaa3a;
}
.collapsed {
  width: 53px;
}
.list-item-title {
  margin: 5px;
  color: white;
  max-width: 40px;
}
.list-item-subtitle {
  color: white;
  opacity: 1;
  margin-left: 10px;
}
.content-row {
  height: calc(100vh - 96px - 70px);
}

.sidebar-panel {
  overflow-y: auto;
  max-height: 100%;
  direction: rtl;
}

.sidebar-panel-inside {
  direction: ltr;
}

.sidebar-panel::-webkit-scrollbar {
  width: 2px;
}

.sidebar-panel::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.sidebar-panel::-webkit-scrollbar-thumb {
  background-color: #888888;
  border-radius: 5px;
}

.scrolling-area {
  max-width: 250px;
  max-height: 250px;
  overflow: auto;
  padding: 1rem;
  background: white;
  direction: rtl;
}

.scrolling-element-inside {
  direction: ltr;
}
</style>
