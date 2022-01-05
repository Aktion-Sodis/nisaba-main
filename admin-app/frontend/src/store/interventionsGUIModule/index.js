const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventionIdCurrentlyBeingEdited: null,
    interventionModalIsDisplayed: false,

    surveyIdCurrentlyBeingEdited: null,
    surveyModalIsDisplayed: false,
  }),
  getters: {
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

    setSurveyIdCurrentlyBeingEdited: (state, surveyId) => {
      state.surveyIdCurrentlyBeingEdited = surveyId;
    },
    setSurveyModalIsDisplayed: (state, payload) => {
      state.surveyModalIsDisplayed = payload;
    },
  },
  actions: {
    resetAll: ({ commit }) => {
      commit("setInterventionIdCurrentlyBeingEdited", null);
      commit("setInterventionModalIsDisplayed", false);
      commit("surveyIdCurrentlyBeingEdited", null);
      commit("surveyModalIsDisplayed", false);
    },

    /* INTERVENTION */
    clickOnEditIntervention: ({ commit, dispatch }, interventionId) => {
      dispatch("resetAll");
      commit("setInterventionIdCurrentlyBeingEdited", interventionId);
      dispatch("showInterventionModal");
    },
    clickOnAddNewIntervention: ({ dispatch }) => {
      dispatch("resetAll");
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
