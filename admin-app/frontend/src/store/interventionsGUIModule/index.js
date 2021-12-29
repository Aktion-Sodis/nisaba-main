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
    clickOnEditIntervention: ({ commit, dispatch }, payload) => {
      dispatch("resetAll");
      commit("setInterventionIdCurrentlyBeingEdited", payload);
      dispatch("showInterventionModal");
    },
    clickOnAddNewIntervention: ({ dispatch }) => {
      dispatch("resetAll");
      dispatch("showInterventionModal");
    },
    saveIntervention: ({ commit }, { interventionId, name, description }) => {
      if (interventionId === null)
        commit(
          "iv/addIntervention",
          {
            name,
            description,
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
          },
          { root: true }
        );
    },
    showInterventionModal: ({ commit }) => {
      commit("setInterventionModalIsDisplayed", true);
    },
  },
};

export default interventionsModule;
