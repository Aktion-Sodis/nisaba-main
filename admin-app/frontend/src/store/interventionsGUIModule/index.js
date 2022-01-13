import { modalModesDict } from "../../store/constants";

const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventionIdCurrentlyBeingEdited: null,
    interventionModalIsDisplayed: false,
    interventionModalMode: modalModesDict.read,

    surveyIdCurrentlyBeingEdited: null,
    surveyModalIsDisplayed: false,
    surveyModalMode: modalModesDict.read,
  }),
  getters: {
    getInterventionModalMode: (state) => state.interventionModalMode,
    getInterventionModalIsEdit: (state) =>
      state.interventionIdCurrentlyBeingEdited !== null,
    getInterventionCurrentlyBeingEdited: (
      state,
      getters,
      rootState,
      rootGetters
    ) =>
      rootGetters["iv/getInterventionById"](
        state.interventionIdCurrentlyBeingEdited
      ) || null,
    getInterventionModalIsDisplayed: (state) =>
      state.interventionModalIsDisplayed,

    getSurveyModalMode: (state) => state.surveyModalMode,
    getSurveyModalIsEdit: (state) =>
      state.surveyIdCurrentlyBeingEdited !== null,
    getSurveyCurrentlyBeingEdited: (state, getters, rootState, rootGetters) =>
      rootGetters["surveys/getSurveyById"](
        state.surveyIdCurrentlyBeingEdited
      ) || null,
    getSurveyModalIsDisplayed: (state) => state.surveyModalIsDisplayed,
  },
  mutations: {
    setInterventionIdCurrentlyBeingEdited: (state, interventionId) => {
      state.interventionIdCurrentlyBeingEdited = interventionId;
    },
    setInterventionModalIsDisplayed: (state, payload) => {
      state.interventionModalIsDisplayed = payload;
    },
    setInterventionModalMode: (state, payload) => {
      state.interventionModalMode = payload;
    },

    setSurveyIdCurrentlyBeingEdited: (state, surveyId) => {
      state.surveyIdCurrentlyBeingEdited = surveyId;
    },
    setSurveyModalIsDisplayed: (state, payload) => {
      state.surveyModalIsDisplayed = payload;
    },
    setSurveyModalMode: (state, payload) => {
      state.surveyModalMode = payload;
    },
  },
  actions: {
    resetAll: ({ commit }) => {
      commit("setInterventionIdCurrentlyBeingEdited", null);
      commit("setInterventionModalIsDisplayed", false);
      commit("setSurveyIdCurrentlyBeingEdited", null);
      commit("setSurveyModalIsDisplayed", false);
    },

    /* INTERVENTION */
    viewIntervention: ({ commit, dispatch }) => {
      dispatch("resetAll");
      commit("setInterventionModalMode", modalModesDict.read);
      dispatch("showInterventionModal");
    },
    clickOnEditIntervention: ({ commit, dispatch }, interventionId) => {
      dispatch("resetAll");
      commit("setInterventionIdCurrentlyBeingEdited", interventionId);
      dispatch("showInterventionModal");
    },
    clickOnAddNewIntervention: ({ commit, dispatch }) => {
      dispatch("resetAll");
      commit("setInterventionModalMode", modalModesDict.create);
      dispatch("showInterventionModal");
    },
    saveIntervention: (
      { commit },
      { interventionId, name, description, tags }
    ) => {
      if (interventionId === null) {
        commit(
          "iv/addIntervention",
          {
            name,
            description,
            tags,
          },
          { root: true }
        );
        return;
      }
      commit(
        "iv/replaceIntervention",
        {
          interventionId,
          name,
          description,
          tags,
        },
        { root: true }
      );
    },
    deleteIntervention: ({ commit, dispatch }, interventionId) => {
      commit("iv/deleteIntervention", interventionId, { root: true });
      dispatch("resetAll");
    },
    showInterventionModal: ({ commit }) => {
      commit("setInterventionModalIsDisplayed", true);
    },
    closeInterventionModal: ({ commit }) => {
      commit("setInterventionModalIsDisplayed", false);
    },
    switchToEditing: ({ commit }, interventionId) => {
      commit("setInterventionIdCurrentlyBeingEdited", interventionId);
      commit("setInterventionModalMode", modalModesDict.edit);
    },
    switchToReading: ({ commit }) => {
      console.log("hey");
      commit("setInterventionModalMode", modalModesDict.read);
      commit("setInterventionIdCurrentlyBeingEdited", null);
    },

    /* SURVEY */
    clickOnEditSurvey: ({ commit, dispatch }, surveyId) => {
      dispatch("resetAll");
      commit("setSurveyIdCurrentlyBeingEdited", surveyId);
      dispatch("showSurveyModal");
    },
    clickOnAddNewSurvey: ({ dispatch }) => {
      dispatch("resetAll");
      dispatch("showSurveyModal");
    },
    saveSurvey: ({ commit }, { surveyId, name, description, tags }) => {
      if (surveyId === null) {
        commit(
          "iv/addSurvey",
          {
            name,
            description,
            tags,
          },
          { root: true }
        );
        return;
      }
      commit(
        "iv/replaceSurvey",
        {
          surveyId,
          name,
          description,
          tags,
        },
        { root: true }
      );
    },
    deleteSurvey: ({ commit, dispatch }, surveyId) => {
      commit("iv/deleteSurvey", surveyId, { root: true });
      dispatch("resetAll");
    },
    showSurveyModal: ({ commit }) => {
      commit("setSurveyModalIsDisplayed", true);
    },
    closeSurveyModal: ({ commit }) => {
      commit("setSurveyModalIsDisplayed", false);
    },
  },
};

export default interventionsModule;
