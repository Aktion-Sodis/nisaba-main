<template>
  <div class="container-wrapper">
    <div class="return-wrapper">
      <el-button class="sodis return" @click="$router.back()"
        ><i class="fa-solid fa-arrow-left"></i
      ></el-button>
    </div>
    <div class="header">{{ surveyID }}</div>
    <div class="button-wrapper">
      <el-button @click="openSurveyModal" class="sodis download"
        ><i class="fa-solid fa-filter"></i
      ></el-button>
      <el-button class="sodis download"
        ><i class="fa-solid fa-download"></i
      ></el-button>
    </div>
    <div class="side">
      <div
        class="icon-wrapper"
        @click="toggleQuestionList"
        @mouseover="showInfo()"
        @mouseleave="hideInfo()"
      >
        <span class="collapse-icon" :class="{ 'rotate-180': collapsed }">
          <i class="fas fa-angle-double-left" />
        </span>
        <div>
          <span
            class="collapse-info"
            :class="{ collapseInfo: collapseInfo }"
            v-if="collapsed"
            >{{ $t("survey.infoBox.open") }}</span
          >
          <span
            class="collapse-info"
            :class="{ collapseInfo: collapseInfo }"
            v-else
            >{{ $t("survey.infoBox.close") }}</span
          >
        </div>
      </div>
      <div class="questions">
        <div
          class="question"
          :class="{
            collapsed: collapsed,
            active: this.selectedQuestion.question_id === question.question_id,
          }"
          v-for="(question, index) in surveyData.questions"
          :key="question.question_id"
          @click="selectQuestion(question)"
        >
          <div class="index-wrapper">{{ index + 1 }}</div>
          <div class="question-wrapper" :class="{ collapsed: collapsed }">
            <!-- {{ question.question_name["en-US"] }} -->
            <!-- TODO: it is better to pass just question.text. Then user can see any filled language, if their language contains an empty string -->
            {{ getLanguageTextFromLanguageKey(question.text.languageTexts) }}
          </div>
        </div>
      </div>
    </div>
    <div class="content-header-wrapper">
      <div class="content-header">
        <div v-if="selectedQuestion !== null">
          <!-- {{ selectedQuestion.question_name["en-US"] }} -->
          {{ getLanguageTextFromLanguageKey(selectedQuestion.text) }}
        </div>
      </div>
    </div>
    <div v-if="selectedQuestion !== null" class="main">
      <ChartComponent
        v-if="
          selectedQuestion.question_type == 'MULTIPLECHOICE' ||
          selectedQuestion.question_type == 'SINGLECHOICE'
        "
        :question="selectedQuestion"
        :selectedIDs="selected_IDs"
      ></ChartComponent>
      <TextComponent
        v-if="selectedQuestion.question_type == 'TEXT'"
        :question="selectedQuestion"
        :selectedIDs="selected_IDs"
      ></TextComponent>
    </div>
  </div>
  <SurveyFilterModalVue
    v-if="showSurveyModal"
    :answerIDs="selectedQuestion.answer_IDs"
    :selectedIDs="selected_IDs"
    @save-IDs="saveIDs"
  ></SurveyFilterModalVue>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import { getRequest } from '../../backend/backend-api.js';

import "element-plus/theme-chalk/display.css";

import ChartComponent from "../../components/data/ChartComponent.vue";
import TextComponent from "../../components/data/TextComponent.vue";
import ImageComponent from "../../components/data/ImageComponent.vue";

import SurveyFilterModalVue from "../../components/commons/SurveyFilterModal.vue";

var collapsed = ref(true);
var collapseInfo = ref(true);

// const backendURL = process.env.VITE_APP_BACKEND_URL;
const backendURL = import.meta.env.VITE_APP_BACKEND_URL;
// const backendURL =
//   "http://analytics-app-demo-backend-env.eba-j42cqsa2.eu-central-1.elasticbeanstalk.com";

export default {
  components: {
    ImageComponent,
    ChartComponent,
    TextComponent,
    SurveyFilterModalVue,
  },
  setup() {
    return { collapsed, collapseInfo };
  },
  mounted() {
    this.getSurveyData();
  },
  computed: {
    ...mapState({
      selectedSurveyID: (state) => state.survey.selectedSurveyID,
    }),
  },
  watch: {
    "$i18n.locale": function (newVal, oldVal) {
      this.$forceUpdate();
    },
  },
  methods: {
    getLanguageTextFromLanguageKey(languageText) {
      if(languageText == null || languageText == undefined) {
        return "[PROBLEM HERE]";
      }
      // check selected Locale
      const languageKey = localStorage.getItem("lang");
      if (
        languageText[languageKey] !== undefined &&
        languageText[languageKey] !== ""
      ) {
        return languageText[languageKey];
      }
      // Check default Locale
      const defaultLocale = import.meta.env.VITE_APP_I18N_LOCALE;
      if (
        languageText[defaultLocale] !== undefined &&
        languageText[defaultLocale] !== ""
      ) {
        return languageText[defaultLocale];
      }
      // Check fallback Locale
      const fallbackLocale = import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE;
      if (
        languageText[fallbackLocale] !== undefined &&
        languageText[fallbackLocale] !== ""
      ) {
        return languageText[fallbackLocale];
      }

      // Use first Locale thats in the Data
      for (const [key, value] of Object.entries(languageText)) {
        if (value != "") {
          return value;
        }
      }
    },
    initIDs() {
      console.log("initIDs", this.selectedQuestion);
      if(this.selectedQuestion !== null && this.selectedQuestion !== undefined){
        this.selected_IDs = this.selectedQuestion.answer_IDs;
      }
      else {
        this.selected_IDs = [];
      }
      return this.selected_IDs;
    },
    openSurveyModal() {
      this.showSurveyModal = true;
      return this.showSurveyModal;
    },
    saveIDs(selectedIDs) {
      this.selected_IDs = selectedIDs;
      this.showSurveyModal = false;
      return this.showSurveyModal, this.selected_IDs;
    },
    getSurveyData() {
      this.surveyID = this.selectedSurveyID;
      console.log(this.surveyID);
      // this.surveyID = "6b3175ea-e2b8-44a9-9836-99e71c2001ac";
      getRequest("/getExecutedSurveysByID",{SurveyID: this.surveyID})
        .then((res) => {
          this.surveyData = res.data.executedSurveys;
          this.selectQuestion(this.surveyData.questions[0]);
          this.initIDs();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    selectQuestion(question) {
      return (this.selectedQuestion = question), (collapsed.value = true);
    },
    toggleQuestionList() {
      return (collapsed.value = !collapsed.value);
    },
    showInfo() {
      return (collapseInfo.value = false);
    },
    hideInfo() {
      return (collapseInfo.value = true);
    },
  },
  data() {
    return {
      showSurveyModal: false,
      backendURL,
      surveyData: null,
      selectedQuestion: null,
      surveyID: "",
      isSurveyModalVisible: false,
      selected_IDs: [],
    };
  },
};
</script>

<style>
:root {
  --container-margin: 25px;
}
</style>

<style scoped>
.container-wrapper {
  box-sizing: border-box;
  margin-left: var(--container-margin);
  margin-right: var(--container-margin);
  margin-bottom: var(--container-margin);
  height: calc(100vh - var(--navbar-height) - 1 * var(--container-margin));

  display: grid;
  grid-template-rows: 60px 50px calc(
      100vh - var(--navbar-height) - var(--container-margin) - 60px - 50px
    );
  grid-template-columns:
    60px calc(
      100vw - var(--sidebar-width) - var(--container-margin) * 2 - 60px - 200px
    )
    200px;

  grid-template-areas:
    "return header buttons"
    "side question-text question-text"
    "side main main";
}

.return-wrapper {
  grid-area: return;
  justify-self: start;
  border: none;
  margin: auto 0;
}
.sodis {
  background-color: var(--bg-color);
  color: white;
}
.sodis-icon {
  color: var(--bg-color);
}
.return {
  width: 50px;
}
.header {
  grid-area: header;
  margin: auto 0;
  text-align: left;
  font-size: 20px;
}

.side {
  grid-area: side;
  background-color: white;
}

.main {
  grid-area: main;
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
  overflow-y: scroll;
}

.content-header-wrapper {
  grid-area: question-text;
  background-color: white;
  z-index: 0;
}

.button-wrapper {
  grid-area: buttons;
  justify-self: end;
  margin: auto 0;
}

.download {
  width: 50px;
}

/* Question Text */

.content-header {
  margin-top: 12px;
  text-align: left;
  font-size: 20px;
  z-index: 0;
}

/* Main */

/* Sidebar */

.icon-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  height: 50px;
  width: 20px;
  margin: auto;
}
.collapse-icon {
  color: var(--bg-color);
  transition: var(--transition-time);
  display: inline-block;
}
.rotate-180 {
  color: var(--bg-color);
  transform: rotate(180deg);
}
.collapse-info {
  display: block;
  float: right;
  width: 200px;

  background-color: white;
  border: 0.5px solid grey;
  border-radius: 5px;

  margin-left: 10px;
  z-index: 1;
  position: absolute;
}
.collapse-info.collapseInfo {
  display: none;
}
.surveys-wrapper {
  border-right: 2px solid var(--bg-color);
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: 12px;

  position: absolute;
  left: calc(var(--sidebar-width) + var(--container-margin));
  top: calc(var(--navbar-height) + 60px + 50px);
  bottom: var(--container-margin);
  z-index: 1;

  background-color: white;

  direction: rtl;
}

.questions {
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;

  border-right: 2px solid var(--bg-color);

  transition: var(--transition-time);

  position: absolute;
  left: calc(var(--sidebar-width) + var(--container-margin));
  top: calc(var(--navbar-height) + 60px + 50px);
  bottom: var(--container-margin);
  z-index: 1;

  direction: rtl;
}

.question {
  box-sizing: border-box;
  max-width: 450px;
  min-height: 80px;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 2px;
  margin-top: 2px;
  padding: 0.5rem 1rem;
  box-shadow: 0px 0px 1px rgb(0, 0, 0, 0.25);
  border-radius: 5px;

  text-align: left;
  padding-left: 5px;

  display: flex;
  background-color: #2d91be;
  color: white;
  transition: var(--transition-time);

  direction: ltr;
}

.question.active {
  background-color: #feaa3a;
  color: rgb(255, 255, 255);
}
.question.collapsed {
  width: 40px;
}

.index-wrapper {
  min-width: 20px;
  margin: auto 5px;
  text-align: center;
}
.question-wrapper {
  margin: auto 0;
  padding: 0 0.5rem;
  transition: 0s linear var(--transition-time);
  opacity: 1;
}
.question-wrapper.collapsed {
  opacity: 0;
  transition: 0s;
  display: none;
}

/* Designing for scroll-bar */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--bg-color);
  border-radius: 1px;
}
</style>
