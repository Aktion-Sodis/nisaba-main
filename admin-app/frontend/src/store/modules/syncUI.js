import { DataStore } from "@aws-amplify/datastore";
import { Hub } from "@aws-amplify/core";
import { syncStatusDict, vuexModulesDict } from "../../lib/constants";
import { waitForMilliseconds } from "../../lib/utils";

const SYNC_UI = {
  namespaced: true,
  state: () => ({
    status: syncStatusDict.synched,
    isStatusLocked: false,
    isDataStoreReady: false,
  }),
  getters: {
    getStatus: ({ status }) => status,
    syncActionIcon: (_, { getState }) => getState,
    getIsDataStoreReady: ({ isDataStoreReady }) => isDataStoreReady,
  },
  mutations: {
    setStatus: (state, { newStatus }) => {
      if (!state.isStatusLocked) state.status = newStatus;
    },
    setIsStatusLocked: (state, { newValue }) => {
      state.isStatusLocked = newValue;
    },
    setIsDataStoreReady: (state, { newValue }) => {
      state.isDataStoreReady = newValue;
    },
  },
  actions: {
    refreshHandler: async ({ commit, dispatch, getters }) => {
      commit("setStatus", { newStatus: syncStatusDict.synchronizing });
      await DataStore.start();
      if (!getters.getIsDataStoreReady) {
        Hub.listen("datastore", async ({ payload: { event } }) => {
          if (event === "ready") {
            await dispatch("syncRoutine");
            commit("setIsDataStoreReady", { newValue: true });
          }
        });
      } else {
        await dispatch("syncRoutine");
      }
    },
    async syncRoutine({ commit, dispatch }) {
      await dispatch("syncAll");
      commit("setStatus", { newStatus: syncStatusDict.synched });
      commit("setIsStatusLocked", { newValue: true });
      await waitForMilliseconds(2000);
      commit("setIsStatusLocked", { newValue: false });
      commit("setStatus", { newStatus: syncStatusDict.inSync });
    },
    /* Don't call this directly. Call the refreshHandler. */
    syncAll: async ({ commit, dispatch }) => {
      const { apiLevelInterventionRelations, apiLevels } = await dispatch(
        `${vuexModulesDict.level}/APIgetAll`,
        {},
        { root: true }
      );
      commit(
        `${vuexModulesDict.level}/setRelationLevelIntervention`,
        {
          newValue: apiLevelInterventionRelations,
        },
        { root: true }
      );
      commit(
        `${vuexModulesDict.level}/setLevels`,
        {
          newValue: apiLevels,
        },
        { root: true }
      );

      const apiEntities = await dispatch(
        `${vuexModulesDict.entity}/APIgetAll`,
        { apiLevels },
        { root: true }
      );
      commit(
        `${vuexModulesDict.entity}/setEntities`,
        { newValue: apiEntities },
        { root: true }
      );

      dispatch(
        `${vuexModulesDict.entity}/setChosenEntityIdsFromApiLevels`,
        { apiLevelIds: apiLevels.map((l) => l.id) },
        { root: true }
      );

      const apiInterventions = await dispatch(
        `${vuexModulesDict.intervention}/APIgetAll`,
        {},
        { root: true }
      );
      commit(
        `${vuexModulesDict.intervention}/setInterventions`,
        { newValue: apiInterventions },
        { root: true }
      );

      const { apiSurveys, apiSurveyTags, apiSurveyTagRelations } =
        await dispatch(
          `${vuexModulesDict.survey}/APIgetAll`,
          {},
          { root: true }
        );
      commit(
        `${vuexModulesDict.survey}/setSurveys`,
        { newValue: apiSurveys },
        { root: true }
      );
      commit(
        `${vuexModulesDict.survey}/setTags`,
        { newValue: apiSurveyTags },
        { root: true }
      );
      commit(
        `${vuexModulesDict.survey}/setTagRelations`,
        { newValue: apiSurveyTagRelations },
        { root: true }
      );
    },
  },
};

export default SYNC_UI;
