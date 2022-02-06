import { modalModesDict } from "../../store/constants";

const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventionIdCurrentlyBeingEdited: null,
    interventionModalIsDisplayed: false,
    interventionModalMode: modalModesDict.read,
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
  },
  actions: {
    resetAll: ({ commit }) => {
      commit("setInterventionIdCurrentlyBeingEdited", null);
      commit("setInterventionModalIsDisplayed", false);
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
      commit("setInterventionModalMode", modalModesDict.read);
      commit("setInterventionIdCurrentlyBeingEdited", null);
    },
  },
};

export default interventionsModule;
