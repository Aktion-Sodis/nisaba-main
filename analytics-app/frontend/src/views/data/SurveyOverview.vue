<template>
  <div class="container-wrapper">
    <div class="return-wrapper">
      <el-button class="sodis return" @click="$router.back()"
        ><i class="fa-solid fa-arrow-left"></i
      ></el-button>
    </div>
    <div class="header">{{ $t("surveyOverview.title") }}</div>
    <div class="continue-wrapper">
      <el-button-group class="ml-4">
        <el-button class="sodis return" :disabled="!this.continue">
          <i class="fa-solid fa-arrow-right"></i
        ></el-button>
      </el-button-group>
    </div>

    <div class="filter">
      <div class="filter-wrapper">
        <div class="filter-description">
          {{ $t("surveyOverview.filterBy") }}
        </div>
        <div
          class="tag"
          :class="{ selected: interventionType === selectedInterventionType }"
          v-for="interventionType in interventionTypes"
          :key="interventionType"
          @click="setInterventionType(interventionType)"
        >
          {{ interventionType }}
        </div>
      </div>
      <div class="intervention-wrapper">
        <div class="intervention-description" v-if="selectedInterventionType">
          {{ $t("surveyOverview.choose") }} {{ selectedInterventionType }}:
        </div>
        <div
          class="intervention"
          :class="{
            selected: intervention === selectedIntervention,
          }"
          v-for="intervention in selectedInterventions"
          :key="intervention.id"
          @click="setIntervention(intervention)"
        >
          {{ getLanguageTextFromLanguageKey(intervention["name"]) }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="survey-wrapper">
        <SurveyCard
          v-for="survey in selectedSurveys"
          :key="survey.id"
          :survey="survey"
          @click="selectSurvey(survey)"
        >
        </SurveyCard>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";

import { getRequest } from '../../backend/backend-api.js';

import "element-plus/theme-chalk/display.css";

import SurveyCard from "../../components/commons/SurveyCard.vue";

// const backendURL = process.env.VITE_APP_BACKEND_URL;
const backendURL = import.meta.env.VITE_APP_BACKEND_URL;
// const backendURL =
//   "http://analytics-app-demo-backend-env.eba-j42cqsa2.eu-central-1.elasticbeanstalk.com";

export default {
  components: { SurveyCard },
  mounted() {
    this.getInterventionTypes();
    this.getInterventions();
    this.getSurveys();
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
    ...mapGetters(
      //
      ["getSelectedSurveyID"]
    ),
    ...mapMutations([
      // `mapMutations` also supports payloads:
      // 'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
      "setSelectedSurveyID",
    ]),
    getInterventionTypes() {
      getRequest("/getInterventionTypes")
        .then((res) => {
          this.interventionTypes = res.data.inteventionTypes;
          // console.log(this.interventionTypes);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getInterventions() {
      getRequest("/getInterventions")
        .then((res) => {
          this.interventions = res.data.interventions;
          // console.log(this.interventions);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getSurveys() {
      getRequest("/getSurveys")
        .then((res) => {
          this.surveys = res.data.surveys;
          // console.log(this.surveys);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    setInterventionType(interventionType) {
      this.selectedInterventionType = interventionType;
      this.selectedInterventions = this.interventions.filter((item) => {
        return item["interventionType"] === this.selectedInterventionType;
      });
      return this.selectedInterventionType, this.selectedInterventions;
    },
    setIntervention(intervention) {
      this.selectedIntervention = intervention;
      this.selectedSurveys = this.surveys.filter((item) => {
        return (
          item["interventionSurveysId"] === this.selectedIntervention["id"]
        );
      });
      return this.selectedSurveys, this.selectedIntervention;
    },
    selectSurvey(survey) {
      this.selectedSurvey = survey;
      this.setSelectedSurveyID(this.selectedSurvey["id"]);
      this.$router.push({ name: "Survey" });
    },
  },
  data() {
    return {
      backendURL,
      interventionTypes: null,
      selectedInterventionType: null,
      interventions: null,
      selectedIntervention: null,
      selectedInterventions: null,
      surveys: null,
      selectedSurvey: null,
      selectedSurveys: null,
      continue: false,
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
  grid-template-rows: 60px 85px calc(
      100vh - var(--navbar-height) - var(--container-margin) - 60px - 85px
    );
  grid-template-columns:
    60px calc(
      100vw - var(--sidebar-width) - var(--container-margin) * 2 - 60px - 200px
    )
    200px;

  grid-template-areas:
    "return header buttons"
    "filter filter filter"
    "main main main";
}

.return-wrapper {
  grid-area: return;
  justify-self: start;
  border: none;
  margin: auto 0;
}
.sodis {
  background-color: #2d91be;
  color: white;
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

.main {
  grid-area: main;
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
  overflow-y: scroll;
}

.filter {
  padding-left: 20px;
  border-bottom: 1px solid var(--bg-color);
  grid-area: filter;
  background-color: rgb(255, 255, 255);
  font-size: 15px;
}

.continue-wrapper {
  grid-area: buttons;
  justify-self: end;
  margin: auto 0;
}
.continue {
  width: 50px;
}

/* Main */
.filter-wrapper,
.intervention-wrapper {
  display: flex;
  margin: 10px 0;
  /* overflow-y: scroll; */
}
.filter-description,
.intervention-description {
  text-align: left;
  font-size: 15px;
}

.intervention,
.tag {
  font-size: 15px;
  min-width: 150px;
  box-shadow: 0px 0px 1px rgb(0, 0, 0, 0.5);
  border-radius: 10px;
  color: black;
  background-color: white;

  margin: 0 10px;
  transition: box-shadow 0.3s;
}

.intervention:hover,
.tag:hover {
  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.5);
}
.intervention.selected,
.tag.selected {
  background-color: var(--bg-color);
  color: white;
}

.survey-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  gap: 5px 5px;

  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
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
