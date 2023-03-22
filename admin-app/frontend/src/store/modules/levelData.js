import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import {
  Level,
  I18nString,
  LevelInterventionRelation,
  CustomData,
} from "../../models";
import {
  dataTypesDict,
  modalModesDict,
  vuexModulesDict,
} from "../../lib/constants";

/** @type {{levels: Level[], loading: boolean, relationLevelIntervention: LevelInterventionRelation[]}} */
const moduleState = {
  levels: [],
  loading: false,
  relationLevelIntervention: [],
};

/** @type {import("vuex").GetterTree<typeof moduleState>} */
const moduleGetters = {
  /* READ */
  getLevels: ({ levels }) => levels.filter((l) => !l._deleted),
  // getLevelTags: ({ levelTags }) => levelTags,
  getLoading: ({ loading }) => loading,
  getRelationLevelIntervention: ({ relationLevelIntervention }) =>
    relationLevelIntervention.filter((r) => r?.levelId),

  hasEntities:
    (state, getters, rootState, rootGetters) =>
    ({ id }) =>
      rootGetters[`${vuexModulesDict.entity}/allEntitiesByLevelId`]({
        levelId: id,
      }).length > 0,

  interventionIdsOfLevelById:
    (_, { getRelationLevelIntervention }) =>
    ({ levelId }) =>
      getRelationLevelIntervention
        .filter((rel) => rel.levelId === levelId)
        .map(({ interventionId }) => interventionId),

  interventionsOfLevelById:
    (_, { interventionIdsOfLevelById }, rootState, rootGetters) =>
    ({ levelId }) =>
      interventionIdsOfLevelById({ levelId }).map((id) =>
        rootGetters[`${vuexModulesDict.intervention}/INTERVENTIONById`]({ id })
      ),

  sortedLevels: (_, getters) =>
    getters.getLevels.sort((a, b) => getters.hierarchySort(a, b)),
  // used in the getter "sortedLevels". Don't use directly outside of Vuex environment.
  hierarchySort: (_, getters) => (a, b) => {
    if (a.parentLevelID === null) return -1;
    if (b.parentLevelID === null) return 1;
    if (a.id === b.parentLevelID) return -1;
    return getters.hierarchySort(a, getters.LEVELById({ id: b.parentLevelID }));
  },

  lowestLevelId: (_, { sortedLevels }) =>
    sortedLevels[sortedLevels.length - 1].id,
  highestLevelId: (_, { sortedLevels }) => sortedLevels[0].id,
  upperLevelById:
    (_, { getLevels }) =>
    ({ id }) => {
      const currentLevel = getLevels.find((l) => l.id === id);
      if (!currentLevel) return null;
      const upperLevel = getLevels.find(
        (l) => l.id === currentLevel.parentLevelID
      );
      return upperLevel || null;
    },

  LEVELById:
    (_, { getLevels }) =>
    ({ id }) =>
      getLevels.find((i) => i.id === id),

  nLevels: (_, { getLevels }) => getLevels.length,
};

/** @type {import("vuex").MutationTree<typeof moduleState>} */
const moduleMutations = {
  addLevel: (state, level) => {
    state.levels.push(level);
  },
  replaceLevel: (state, level) => {
    state.levels.splice(
      state.levels.findIndex((i) => i.id === level.id),
      1,
      level
    );
  },
  deleteLevel: (state, { id }) => {
    state.levels.splice(
      Array.from(state.levels).findIndex((i) => i.id === id),
      1
    );
  },
  setLoading: (state, { newValue }) => {
    state.loading = newValue;
  },
  setLevels: (state, { newValue }) => {
    state.levels = newValue;
  },
  setRelationLevelIntervention: (state, { newValue }) => {
    state.relationLevelIntervention = newValue;
  },
};

/** @type {import("vuex").ActionTree<typeof moduleState>} */
const moduleActions = {
  APIpost: async ({ commit, dispatch, rootGetters }, levelDraft) => {
    let success = true;
    commit("setLoading", { newValue: true });
    const level = new Level({
      ...levelDraft,
      name: new I18nString(levelDraft.name),
      description: new I18nString(levelDraft.description),
      customData: levelDraft.customData.map((cd) => new CustomData(cd)),
    });

    try {
      const postResponse = await DataStore.save(level);

      // eslint-disable-next-line no-restricted-syntax
      for (const interventionId of levelDraft.allowedInterventions) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await DataStore.save(
            new LevelInterventionRelation({
              level: postResponse,
              intervention: rootGetters[
                `${vuexModulesDict.intervention}/INTERVENTIONById`
              ]({
                id: interventionId,
              }),
            })
          );
        } catch (error) {
          success = false;
          console.log(error);
        }
      }

      if (rootGetters["dataModal/getImageFile"] instanceof File) {
        try {
          await Storage.put(
            rootGetters.callDeriveFilePathWithOrganizationId("levelPicPath", {
              levelID: postResponse.id,
            }),
            rootGetters["dataModal/getImageFile"]
          );
        } catch {
          success = false;
        }
      }
      commit("addLevel", postResponse);

      dispatch(
        `${vuexModulesDict.dataModal}/readData`,
        {
          dataId: postResponse.id,
          dataType: dataTypesDict.level,
        },
        {
          root: true,
        }
      );
    } catch {
      success = false;
    }
    commit("setLoading", { newValue: false });
    return success;
  },
  APIput: async (
    { commit, dispatch, getters, rootGetters },
    { newData, originalId }
  ) => {
    commit("setLoading", { newValue: true });
    let success = true;

    const original = getters.LEVELById({ id: originalId });
    const relationsOfOriginal = getters.getRelationLevelIntervention.filter(
      (rel) => rel.levelId === original.id
    );
    console.log({ relationsOfOriginal });

    try {
      const putResponse = await DataStore.save(
        Level.copyOf(original, (updated) => {
          updated.name = newData.name;
          updated.description = newData.description;
          updated.parentLevelID = newData.parentLevelID;
          updated.interventionsAreAllowed = newData.interventionsAreAllowed;
          updated.tags = [];
          updated.customData = newData.customData.map(
            (cd) => new CustomData(cd)
          );
        })
      );

      console.log({ putResponse });

      if (rootGetters["dataModal/getImageFile"] instanceof File) {
        try {
          await Storage.put(
            rootGetters.callDeriveFilePathWithOrganizationId("levelPicPath", {
              levelID: putResponse.id,
            }),
            rootGetters["dataModal/getImageFile"]
          );
        } catch {
          success = false;
        }
      }

      commit("replaceLevel", putResponse);

      // FIRST DELETE ALL INTERVENTION RELATIONS OF THE LEVEL

      // eslint-disable-next-line no-restricted-syntax
      for (const relation of relationsOfOriginal) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await DataStore.delete(relation);
        } catch {
          success = false;
        }
      }

      // THEN RECREATE THEM AS WHAT IS GIVEN IN THE MODAL

      // eslint-disable-next-line no-restricted-syntax
      for (const interventionId of newData.allowedInterventions) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const rel = await DataStore.save(
            new LevelInterventionRelation({
              level: putResponse,
              intervention: rootGetters[
                `${vuexModulesDict.intervention}/INTERVENTIONById`
              ]({
                id: interventionId,
              }),
            })
          );
          console.log({ rel });
        } catch {
          success = false;
        }
      }
    } catch {
      success = false;
    }

    if (success) {
      dispatch(
        `${vuexModulesDict.dataModal}/readData`,
        {
          dataType: dataTypesDict.level,
        },
        {
          root: true,
        }
      );
    }

    commit("setLoading", { newValue: false });
    return success;
  },
  APIdelete: async ({ commit, dispatch, getters, rootGetters }, { id }) => {
    let success = true;
    commit("setLoading", { newValue: true });

    try {
      const toDelete = await DataStore.query(Level, id);
      await DataStore.delete(toDelete);
    } catch {
      success = false;
    }

    const relationsOfOriginal = getters.getRelationLevelIntervention.filter(
      (rel) => rel.levelId === id
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const relation of relationsOfOriginal) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await DataStore.delete(relation);
      } catch {
        success = false;
      }
    }

    if (success) {
      Storage.put(
        rootGetters.callDeriveFilePathWithOrganizationId("levelPicPath", {
          levelID: id,
        })
      );

      commit("deleteLevel", {
        id,
      });
      commit(
        `${vuexModulesDict.dataModal}/setDataIdInFocus`,
        { newValue: null },
        { root: true }
      );
      commit(
        `${vuexModulesDict.dataModal}/setMode`,
        { newValue: modalModesDict.read },
        { root: true }
      );
      dispatch(
        `${vuexModulesDict.dataModal}/abortReadData`,
        {},
        {
          root: true,
        }
      );
    }

    commit("setLoading", { newValue: false });
    return success;
  },
  APIgetAll: async () => {
    let apiLevelInterventionRelations = [];
    let apiLevels = [];
    try {
      apiLevels = await DataStore.query(Level);
    } catch (error) {
      console.log({ error });
    }
    try {
      apiLevelInterventionRelations = await DataStore.query(
        LevelInterventionRelation
      );
    } catch (error) {
      console.log({ error });
    }
    return { apiLevelInterventionRelations, apiLevels };
  },
};

const levelsData = {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations: moduleMutations,
  actions: moduleActions,
};

export default levelsData;
