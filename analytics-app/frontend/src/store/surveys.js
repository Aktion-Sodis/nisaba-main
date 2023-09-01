import { defineStore } from 'pinia';
import { getRequest } from '@/axios/backend-api';

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    totalNumberOfSurveys: 0,
    surveyList: [],
    levelList: [],
    entitiesList: [],
    selectedSurveyID: null,
    selectedSurvey: null,
    selectedSurveyData: null,
  }),

  persist: {
    key: 'surveys',
    storage: sessionStorage,
  },


  actions: {

    resetSelectedSurvey() {
      this.selectedSurveyID = null;
      this.selectedSurvey = null;
      this.selectedSurveyData = null;
      this.levelList = [];
      this.entitiesList = [];
    },

    setSelectedSurveyID(surveyID) {
      this.selectedSurveyID = surveyID;
    },

    async fetchTotalNumberOfSurveys() {
      try {
        const response = await getRequest('/getTotalNumberOfSurveys')
        this.totalNumberOfSurveys = response;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchAllSurveys() {
      try {
        const response = await getRequest('/getAllSurveys')
        this.surveyList = response;
      } catch (error) {
        console.log(error);
      }
    },

    // async fetchLevels() {
    //   try {
    //     const response = await getRequest('/getLevels')
    //     this.levelList = response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async fetchEntities() {
    //   try {
    //     const response = await getRequest('/getEntities')
    //     this.entitiesList = response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async fetchSurveyBySurveyID(surveyID) {
      try {
        const response = await getRequest('/getSurveyBySurveyID', { SurveyID: surveyID })
        this.selectedSurvey = response;
      } catch (error) {
        console.log(error)
      }
    },

    async fetchSurveyDataBySurveyID(surveyID) {
      try {
        const response = await getRequest('/getSurveyDataBySurveyID', { SurveyID: surveyID})
        this.selectedSurveyData = response.dataset;
        this.levelList = response.levels;
        this.entitiesList = response.entities;
      } catch (error) {
        console.log(error)
      }
    },

    // async fetchExecutedSurveysBySurveyID(surveyID) {
    //   try {
    //     const response = await getRequest('/getExecutedSurveysBySurveyID', { SurveyID: surveyID })
    //     this.selectedSurveyData = response;
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

  },
});