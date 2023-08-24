import { defineStore } from 'pinia';
import { getRequest } from '@/axios/backend-api';

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    totalNumberOfSurveys: 0,
    surveyList: [],
    levelList: [],
    entitiesList: "Test",
    selectedSurveyID: null,
    selectedSurvey: null,
    selectedSurveyData: null,
  }),

  persist: {
    key: 'surveys',
    storage: sessionStorage,
  },


  actions: {

    setSelectedSurveyID(surveyID) {
      this.selectedSurveyID = surveyID;
      console.log(this.selectedSurveyID)
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

    async fetchLevels() {
      try {
        const response = await getRequest('/getLevels')
        this.levelList = response;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchEntities() {
      try {
        const response = await getRequest('/getEntities')
        this.entitiesList = response;
      } catch (error) {
        console.log(error);
      }
    },

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
        this.selectedSurveyData = response;
      } catch (error) {
        console.log(error)
      }
    },

    async fetchExecutedSurveysBySurveyID(surveyID) {
      try {
        const response = await getRequest('/getExecutedSurveysBySurveyID', { SurveyID: surveyID })
        this.selectedSurveyData = response;
      } catch (error) {
        console.log(error)
      }
    },

  },
});