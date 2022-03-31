import { DataStore } from '@aws-amplify/datastore';
import { Level, I18nString } from '../../models';
import { putLevel, deleteLevel, getAllLevels } from './utils';
import { Entity } from '../entities/utils';
import { dataTypesDict, modalModesDict } from '../constants';

const levelsData = {
  namespaced: true,
  state: () => ({
    levels: [],
    levelTags: [
      { tagId: '468084f3-6ec4-42ea-bdb2-40900816b64f', name: 'Tag 1' },
      { tagId: 'e5ebc38b-abed-498d-9052-6c8767cc341e', name: 'Tag 2' },
    ],
    loading: false,
  }),
  getters: {
    /* READ */
    getLevels: ({ levels }) => levels
      .filter((l) => !l._deleted)
      .map((l) => ({ ...l, allowedInterventions: l.allowedInterventions.items ?? [] })),
    getLevelTags: ({ levelTags }) => levelTags,
    getLoading: ({ loading }) => loading,

    sortedLevels: (_, getters) => getters.getLevels.sort((a, b) => getters.hierarchySort(a, b)),
    // used in the getter "sortedLevels". Don't use directly outside of Vuex environment.
    hierarchySort: (_, getters) => (a, b) => {
      if (a.parentLevelID === null) return -1;
      if (b.parentLevelID === null) return 1;
      if (a.id === b.parentLevelID) return -1;
      return getters.hierarchySort(a, getters.LEVELById({ id: b.parentLevelID }));
    },

    lowestLevelId: (_, { sortedLevels }) => sortedLevels[sortedLevels.length - 1].id,
    upperLevelById:
      (_, { getLevels }) => ({ id }) => {
        const currentLevel = getLevels.find((l) => l.id === id);
        if (!currentLevel) return null;
        const upperLevel = getLevels.find((l) => l.id === currentLevel.parentLevelID);
        return upperLevel || null;
      },

    LEVELById:
      (_, { getLevels }) => ({ id }) => getLevels.find((i) => i.id === id),
    tagById:
      (_, { getLevelTags }) => ({ tagId }) => getLevelTags.find((t) => t.tagId === tagId),
  },
  mutations: {
    addLevel: (state, {
      id, name, description, parentLevelID, allowedInterventions, tagIds,
    }) => {
      state.levels.push(
        new Level({
          id,
          name,
          description,
          parentLevelID,
          allowedInterventions,
          tagIds,
        }),
      );
    },
    replaceLevel: (
      state,
      {
        id, name, parentLevelID, tagIds, allowedInterventions, description,
      },
    ) => {
      state.levels.splice(
        state.levels.findIndex((i) => i.id === id),
        1,
        new Level({
          id,
          name,
          description,
          parentLevelID,
          allowedInterventions,
          tagIds,
        }),
      );
    },
    deleteLevel: (state, { id }) => {
      state.levels.splice(
        Array.from(state.levels).findIndex((i) => i.id === id),
        1,
      );
    },
    setLoading: (state, { newValue }) => {
      state.loading = newValue;
    },
    setLevels: (state, { newValue }) => {
      state.levels = newValue;
    },
  },
  actions: {
    APIpost: async ({ commit, dispatch }, levelDraft) => {
      commit('setLoading', { newValue: true });
      DataStore.save(levelDraft)
        .then((postResponse) => {
          commit('addLevel', postResponse);
          dispatch(
            'dataModal/readData',
            {
              dataId: postResponse.id,
              dataType: dataTypesDict.level,
            },
            {
              root: true,
            },
          );
          commit('setLoading', { newValue: false });
        })
        .catch(() => {
          commit('setLoading', { newValue: false });
        });
    },
    APIput: async ({ commit, dispatch }, levelDraft) => {
      commit('setLoading', { newValue: true });
      const putResponse = await putLevel(levelDraft);
      commit('replaceLevel', putResponse);
      dispatch(
        'dataModal/readData',
        {
          dataId: putResponse.id,
          dataType: dataTypesDict.level,
        },
        {
          root: true,
        },
      );
      commit('setLoading', { newValue: false });
    },
    APIdelete: async ({ commit, dispatch }, { id }) => {
      commit('setLoading', { newValue: true });
      const deleteResponse = await deleteLevel();
      if (deleteResponse.errors.length > 0) {
        commit('setLoading', { newValue: false });
      }
      commit('deleteLevel', {
        id,
      });
      commit('ENTITY_Data/deleteEntitiesByLevelId', { entityLevelId: id }, { root: true });
      commit('dataModal/setDataIdInFocus', { newValue: null }, { root: true });
      commit('dataModal/setMode', { newValue: modalModesDict.read }, { root: true });
      dispatch(
        'dataModal/abortReadData',
        {},
        {
          root: true,
        },
      );

      commit('setLoading', { newValue: false });
    },
    sync: async ({ commit, dispatch }) => {
      commit('setLoading', { newValue: true });
      commit('setLevels', {
        newValue: [
          new Level({
            id: 'dummyLevel0',
            name: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Name', 'Isimo', 'İsim'],
            }),
            description: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Description', 'Desaciklamo', 'Açıklama'],
            }),
            parentLevelID: null,
            interventionsAreAllowed: true,
            allowedInterventions: [],
            customData: [],
            schemeVersion: 1020,
          }),
          new Level({
            id: 'dummyLevel1',
            name: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Name', 'Isimo', 'İsim'],
            }),
            description: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Description', 'Desaciklamo', 'Açıklama'],
            }),
            parentLevelID: null,
            interventionsAreAllowed: true,
            allowedInterventions: [],
            customData: [],
            schemeVersion: 1020,
          }),
          new Level({
            id: 'dummyLevel2',
            name: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Name', 'Isimo', 'İsim'],
            }),
            description: new I18nString({
              languageKeys: ['en-US', 'es-BO', 'tr-TR'],
              languageTexts: ['Description', 'Desaciklamo', 'Açıklama'],
            }),
            parentLevelID: null,
            interventionsAreAllowed: true,
            allowedInterventions: [],
            customData: [],
            schemeVersion: 1020,
          }),
        ],
      });
      commit(
        'ENTITY_Data/setEntities',
        {
          newValue: [
            new Entity({
              id: 'dummyEntity0',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel0',
              parentEntityID: null,
              _version: 1,
            }),
            new Entity({
              id: 'dummyEntity1',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel0',
              parentEntityID: null,
              _version: 1,
            }),
            new Entity({
              id: 'dummyEntity2',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel1',
              parentEntityID: 'dummyEntity0',
              _version: 1,
            }),
            new Entity({
              id: 'dummyEntity3',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel2',
              parentEntityID: 'dummyEntity2',
              _version: 1,
            }),
            new Entity({
              id: 'dummyEntity4',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel2',
              parentEntityID: 'dummyEntity3',
              _version: 1,
            }),
            new Entity({
              id: 'dummyEntity5',
              name: { languageKeys: ['en-US', 'es-BO', 'tr-TR'], languageTexts: ['', '', ''] },
              description: {
                languageKeys: ['en-US', 'es-BO', 'tr-TR'],
                languageTexts: ['', '', ''],
              },
              entityLevelId: 'dummyLevel2',
              parentEntityID: 'dummyEntity3',
              _version: 1,
            }),
          ],
        },
        { root: true },
      );
      const apiLevels = await dispatch('APIgetAll');
      const apiEntities = await dispatch('ENTITY_Data/APIgetAll', null, { root: true });
      commit('setLevels', {
        newValue: apiLevels.filter((l) => !l._deleted),
      });
      commit(
        'ENTITY_Data/setEntities',
        { newValue: apiEntities.filter((e) => !e._deleted) },
        { root: true },
      );
      commit('setLoading', { newValue: false });
    },
    APIgetAll: async () => (await getAllLevels()).data.listLevels.items,
  },
};

export default levelsData;
