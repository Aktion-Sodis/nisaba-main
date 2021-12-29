const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventionIdCurrentlyBeingEdited: null,
    interventionModalIsDisplayed: false,
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
  },
  mutations: {
    setInterventionIdCurrentlyBeingEdited: (state, interventionId) => {
      state.interventionIdCurrentlyBeingEdited = interventionId;
    },
    setInterventionModalIsDisplayed: (state, payload) => {
      state.interventionModalIsDisplayed = payload;
    },
  },
  actions: {
    resetAll: ({ commit }) => {
      commit("setInterventionIdCurrentlyBeingEdited", null);
      commit("setInterventionModalIsDisplayed", false);
    },
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
      if (interventionId === null)
        commit(
          "iv/addIntervention",
          {
            name,
            description,
            tags,
          },
          { root: true }
        );
      else
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
  },
};

export default interventionsModule;
