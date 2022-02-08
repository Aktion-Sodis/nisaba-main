import { modalModesDict } from '../constants';

const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventionIdCurrentlyBeingEdited: null,
    isInterventionModalDisplayed: false,
    interventionModalMode: modalModesDict.read,
  }),
  getters: {
    getInterventionIdCurrentlyBeingEdited: ({ interventionIdCurrentlyBeingEdited }) => interventionIdCurrentlyBeingEdited,
    getInterventionModalMode: ({ interventionModalMode }) => interventionModalMode,
    interventionCurrentlyBeingEdited: (state, getters, rootState, rootGetters) => rootGetters['iv/interventionById'](state.interventionIdCurrentlyBeingEdited) || null,
    getInterventionModalIsDisplayed: ({ isInterventionModalDisplayed }) => isInterventionModalDisplayed,
  },
  mutations: {
    setInterventionIdCurrentlyBeingEdited: (state, { newId }) => {
      state.interventionIdCurrentlyBeingEdited = newId;
    },
    setIsInterventionModalDisplayed: (state, { newValue }) => {
      state.isInterventionModalDisplayed = newValue;
    },
    setInterventionModalMode: (state, { newMode }) => {
      state.interventionModalMode = newMode;
    },
  },
  actions: {
    resetAll: ({ commit }) => {
      commit('setInterventionModalMode', { newMode: modalModesDict.read });
      commit('setInterventionIdCurrentlyBeingEdited', { newId: null });
      commit('setIsInterventionModalDisplayed', { newValue: false });
    },

    /* INTERVENTION */
    viewIntervention: ({ commit, dispatch }) => {
      dispatch('resetAll');
      commit('setInterventionModalMode', { newMode: modalModesDict.read });
      dispatch('showInterventionModal');
    },
    clickOnEditIntervention: ({ commit, dispatch }, interventionId) => {
      dispatch('resetAll');
      commit('setInterventionIdCurrentlyBeingEdited', { newId: interventionId });
      dispatch('showInterventionModal');
    },
    clickOnAddNewIntervention: ({ commit, dispatch }) => {
      dispatch('resetAll');
      commit('setInterventionModalMode', { newMode: modalModesDict.create });
      dispatch('showInterventionModal');
    },
    saveIntervention: ({ commit }, {
      interventionId, name, description, tags,
    }) => {
      if (interventionId === null) {
        commit(
          'iv/addIntervention',
          {
            newIntervention: {
              name,
              description,
              tags,
            },
          },
          { root: true },
        );
        return;
      }
      commit(
        'iv/replaceIntervention',
        {
          newIntervention: {
            interventionId,
            name,
            description,
            tags,
          },
        },
        { root: true },
      );
    },
    deleteIntervention: ({ commit, dispatch }, { interventionId }) => {
      commit('iv/deleteIntervention', { interventionId }, { root: true });
      dispatch('resetAll');
    },
    showInterventionModal: ({ commit }) => {
      commit('setIsInterventionModalDisplayed', { newValue: true });
    },
    closeInterventionModal: ({ commit }) => {
      commit('setIsInterventionModalDisplayed', { newValue: false });
    },
    switchToEditing: ({ commit }, { interventionId }) => {
      commit('setInterventionIdCurrentlyBeingEdited', { newId: interventionId });
      commit('setInterventionModalMode', { newMode: modalModesDict.edit });
    },
    switchToReading: ({ commit }) => {
      commit('setInterventionModalMode', { newMode: modalModesDict.read });
      commit('setInterventionIdCurrentlyBeingEdited', { newId: null });
    },
  },
};

export default interventionsModule;
