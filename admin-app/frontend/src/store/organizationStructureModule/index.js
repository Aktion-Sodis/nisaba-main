const organizationStructureModule = {
  namespaced: true,
  state: () => ({
    entityIdCurrentlyBeingEdited: null,
    entityModalIsDisplayed: false,
    levelIdOfEntityBeingCreated: null,

    levelIdCurrentlyBeingEdited: null,
    levelModalIsDisplayed: false,
  }),
  getters: {
    /* ENTITY */
    getEntityModalIsEdit: (state) => state.entityIdCurrentlyBeingEdited !== null,
    getEntityCurrentlyBeingEdited: (state, getters, rootState, rootGetters) => rootGetters['entities/entityById'](state.entityIdCurrentlyBeingEdited) || null,
    getEntityModalIsDisplayed: (state) => state.entityModalIsDisplayed,
    getLevelIdOfEntityBeingCreated: (state) => state.levelIdOfEntityBeingCreated,

    /* LEVEL */
    getLevelModalIsEdit: (state) => state.levelIdCurrentlyBeingEdited !== null,
    getLevelCurrentlyBeingEdited: (state, getters, rootState, rootGetters) => rootGetters['entities/levelById'](state.levelIdCurrentlyBeingEdited) || null,
    getLevelModalIsDisplayed: (state) => state.levelModalIsDisplayed,
  },
  mutations: {
    /* ENTITY */
    setEntityIdCurrentlyBeingEdited: (state, entityId) => {
      state.entityIdCurrentlyBeingEdited = entityId;
    },
    setEntityModalIsDisplayed: (state, payload) => {
      state.entityModalIsDisplayed = payload;
    },
    setLevelIdOfEntityBeingCreated: (state, payload) => {
      state.levelIdOfEntityBeingCreated = payload;
    },

    /* LEVEL */
    setLevelIdCurrentlyBeingEdited: (state, levelId) => {
      state.levelIdCurrentlyBeingEdited = levelId;
    },
    setLevelModalIsDisplayed: (state, payload) => {
      state.levelModalIsDisplayed = payload;
    },
  },
  actions: {
    resetAll: ({ commit }) => {
      commit('setEntityIdCurrentlyBeingEdited', null);
      commit('setEntityModalIsDisplayed', false);
      commit('setLevelIdOfEntityBeingCreated', null);
      commit('setLevelIdCurrentlyBeingEdited', null);
      commit('setLevelModalIsDisplayed', false);
    },
    clickOnEditEntity: ({ commit, dispatch }, payload) => {
      dispatch('resetAll');
      commit('setEntityIdCurrentlyBeingEdited', payload);
      dispatch('showEntityModal');
    },
    clickOnAddNewEntity: ({ commit, dispatch }, payload) => {
      dispatch('resetAll');
      commit('setLevelIdOfEntityBeingCreated', payload);
      dispatch('showEntityModal');
    },
    clickOnAddNewLevel: ({ dispatch }) => {
      dispatch('resetAll');
      dispatch('showLevelModal');
    },
    clickOnEditLevel: ({ commit, dispatch }, payload) => {
      dispatch('resetAll');
      commit('setLevelIdCurrentlyBeingEdited', payload);
      dispatch('showLevelModal');
    },
    saveLevel: ({ commit }, {
      levelId, name, description, upperLevelId, allowedInterventions,
    }) => {
      if (levelId === null) {
        commit(
          'entities/injectNewLevel',
          {
            newLevel: {
              name,
              description,
              upperLevelId,
              allowedInterventions,
            },
          },
          { root: true },
        );
      } else {
        commit(
          'entities/replaceLevel',
          {
            newLevel: {
              levelId,
              name,
              description,
              upperLevelId,
              allowedInterventions,
            },
          },
          { root: true },
        );
      }
    },
    saveEntity: (
      { commit },
      {
        entityId, entityName, entityDescription, entityLevelId, entityUpperEntityId,
      },
    ) => {
      if (entityId === null) {
        commit(
          'entities/injectNewEntity',
          {
            newEntity: {
              entityName,
              entityDescription,
              entityLevelId,
              entityUpperEntityId,
            },
          },
          { root: true },
        );
      } else {
        commit(
          'entities/replaceEntity',
          {
            newEntity: {
              entityId,
              entityName,
              entityDescription,
              entityLevelId,
              entityUpperEntityId,
            },
          },
          { root: true },
        );
      }
    },
    showEntityModal: ({ commit }) => {
      commit('setEntityModalIsDisplayed', true);
    },
    showLevelModal: ({ commit }) => {
      commit('setLevelModalIsDisplayed', true);
    },
    closeEntityModal: ({ commit }) => {
      commit('setEntityIdCurrentlyBeingEdited', null);
      commit('setEntityModalIsDisplayed', false);
    },
    closeLevelModal: ({ commit }) => {
      commit('setLevelIdCurrentlyBeingEdited', null);
      commit('setLevelModalIsDisplayed', false);
    },
  },
};

export default organizationStructureModule;
