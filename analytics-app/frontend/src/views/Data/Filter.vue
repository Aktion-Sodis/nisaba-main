<template>
  <div class="container-wrapper">
    <div class="return-wrapper">
      <el-button class="sodis return"
        ><i class="fa-solid fa-arrow-left"></i
      ></el-button>
    </div>
    <div class="header">Filter</div>
    <div class="continue-wrapper">
      <el-button-group class="ml-4">
        <el-button
          class="sodis return"
          :disabled="!this.continue"
          @click="getInterventions()"
        >
          <i class="fa-solid fa-arrow-right"></i
        ></el-button>
      </el-button-group>
    </div>

    <div class="filter">
      <div class="filter-wrapper">
        <div class="filter-description">Filtern nach:</div>
        <div
          class="tag"
          :class="{ selected: tag === selectedTag }"
          v-for="tag in interventionTypes"
          :key="tag"
          @click="setTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
      <div class="intervention-wrapper">
        <div class="intervention-description" v-if="selectedTag">
          {{ selectedTag }} wählen:
        </div>
        <div
          class="intervention"
          :class="{
            selected: intervention === selectedIntervention,
          }"
          v-for="intervention in interventionCategories[selectedTag]"
          :key="intervention"
          @click="setIntervention(intervention)"
        >
          {{ intervention["es-BO"] }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="survey-wrapper">
        <SurveyCard
          v-for="survey in selectedIntervention.surveys"
          :key="survey.id"
          :survey="survey"
          :class="{ selected: survey.id === selectedSurveyID }"
          @click="selectSurvey(survey)"
        >
        </SurveyCard>
        <div v-for="item in getInterventionTypes()" :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

import axios from "axios";

import "element-plus/theme-chalk/display.css";

import SurveyCard from "../../components/commons/SurveyCard.vue";

export default {
  components: { SurveyCard },
  computed: {
    ...mapState({
      interventions: (state) => state.surveyData.interventions,
    }),
  },
  mounted() {
    this.getInterventions();
    this.getInterventionCategories();
  },
  methods: {
    getInterventions() {
      const path = "http://127.0.0.1:5000/getInterventions";
      axios
        .get(path)
        .then((res) => {
          this.interventionTypes = res.data.interventions;
          console.log(this.interventionTypes);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getInterventionCategories() {
      const path = "http://127.0.0.1:5000/getInterventionCategories";
      axios
        .get(path)
        .then((res) => {
          this.interventionCategories = res.data.interventions;
          console.log(this.interventionCategories);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getInterventionTypes() {
      //console.log(Object.keys(this.interventionTypes[0]));
      return ["hallo", "tschüss"];
    },
    uniqueInterventionTypes(interventions) {
      var uniqueTags = interventions
        .map((item) => item.tag)
        .filter((value, index, self) => self.indexOf(value) === index);
      return uniqueTags;
    },
    getEntitiesByTag(tag) {
      var entitiesByTag = this.interventions.filter((item) => {
        return item.tag === tag;
      });
      return entitiesByTag;
    },
    setTag(tag) {
      this.selectedTag = tag;
      this.selectedSurveyID = "";
      this.continue = false;
      this.setIntervention("");
      return this.selectedTag, this.selectedIntervention;
    },
    setIntervention(intervention) {
      this.selectedIntervention = intervention;
      this.selectedSurveyID = "";
      this.continue = false;
      return this.selectedIntervention;
    },
    selectSurvey(survey) {
      //check if id is already in selected array
      this.selectedSurveyID = survey.id;
      this.continue = true;
      return;
    },
  },
  data() {
    return {
      selectedTag: "",
      selectedIntervention: "",
      selectedSurveyID: "",
      continue: false,
      interventionTypes: [],
      interventionCategories: [],
      interventionType: [1, 2, 3],
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
      100vw - var(--left-menu-width) - var(--container-margin) * 2 - 60px -
        200px
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
