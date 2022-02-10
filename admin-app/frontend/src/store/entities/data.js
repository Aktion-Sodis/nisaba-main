import {
  Entity, postNewEntity, putEntity, deleteEntity,
} from './utils';
import { modalModesDict } from '../constants';

const entitiesData = {
  namespaced: true,
  state: () => ({
    entities: [
      {
        entityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        name: 'Aachen',
        description: 'Some description',
        levelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        upperEntityId: null,
        tagIds: ['2b6e7572-c026-48bf-aa54-0201d1a98e39'],
      },
      {
        entityId: 'afd8874d-ac52-4508-8351-f35f8f7e28a0',
        name: 'Sinop',
        description: 'Some description',
        levelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        upperEntityId: null,
        tagIds: [],
      },
      {
        entityId: '0b38df2a-84f5-4066-9c0c-f447b93e8278',
        name: 'Nizzaallee',
        description: 'Some description',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        tagIds: [],
      },
      {
        entityId: '3d29c7aa-f422-41bc-99ae-35480a1f415e',
        name: 'Mies van der Rohe Straße',
        description: 'Some description',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        tagIds: [],
      },
      {
        entityId: '327ac9b8-ab56-47e0-a1c5-bd4c978645a0',
        name: 'Atatürk Caddesi',
        description: 'Some description',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'afd8874d-ac52-4508-8351-f35f8f7e28a0',
        tagIds: [],
      },
      {
        entityId: 'b046cde7-4f18-4fc9-9b13-eb49c98f226c',
        name: 'Eine 4er WG',
        description: 'Some description',
        levelId: 'd1faef12-cf15-4b5e-9637-b4ffbd156954',
        upperEntityId: '0b38df2a-84f5-4066-9c0c-f447b93e8278',
        tagIds: [],
      },
    ],

    entityTags: [
      { tagId: '2b6e7572-c026-48bf-aa54-0201d1a98e39', name: 'Tag 1' },
      { tagId: '6bc8b24c-9faa-47ad-973e-85b135136f08', name: 'Tag 2' },
    ],

    loading: false,
  }),
  getters: {
    /* READ */
    getEntities: ({ entities }) => entities,
    getEntityTags: ({ entityTags }) => entityTags,
    getLoading: ({ loading }) => loading,

    // sort by entityId for consistency
    allEntitiesByLevelId:
      (_, { getEntities }) => (levelId) => getEntities.filter((e) => e.levelId === levelId).sort((a, b) => a.entityId - b.entityId),

    verticalOrderByEntityId:
      (_, { allEntitiesByLevelId }) => (entityId, levelId) => allEntitiesByLevelId(levelId).findIndex((e) => e.entityId === entityId),

    maxVerticalOrderOfChildren:
      (_, { allEntitiesByLevelId }, rootState, rootGetters) => (entityId, levelId) => {
        const allEntitiesInLowerLevel = allEntitiesByLevelId(
          rootGetters['levelsData/getLevels'].find((l) => l.upperLevelId === levelId).levelId,
        );
        const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
          (e) => e.upperEntityId === entityId,
        );
        return lowerLevelContainsChildren
          ? allEntitiesInLowerLevel.length
              - allEntitiesInLowerLevel.reverse().findIndex((e) => e.upperEntityId === entityId)
              - 1
          : -1;
      },
    minVerticalOrderOfChildren:
      (_, { allEntitiesByLevelId }, rootState, rootGetters) => (entityId, levelId) => {
        const allEntitiesInLowerLevel = allEntitiesByLevelId(
          rootGetters['levelsData/getLevels'].find((l) => l.upperLevelId === levelId).levelId,
        );
        const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
          (e) => e.upperEntityId === entityId,
        );
        return lowerLevelContainsChildren
          ? allEntitiesInLowerLevel.findIndex((e) => e.upperEntityId === entityId)
          : -1;
      },

    hasDescendantsById:
      (_, { getEntities }) => (entityId) => getEntities.some((e) => e.upperEntityId === entityId),

    hasParentByUpperEntityId:
      (_, { getEntities }) => (upperEntityId) => upperEntityId && getEntities.some((e) => e.entityId === upperEntityId),

    entityById:
      (_, { getEntities }) => ({ entityId }) => getEntities.find((i) => i.entityId === entityId),
    entityTagById:
      (_, { getEntityTags }) => ({ tagId }) => getEntityTags.find((t) => t.tagId === tagId),

    /* returns "lines" with the schema {levelId, entityId, indentation, y0, y1} */
    calculatedLines: (
      _,
      {
        allEntitiesByLevelId,
        hasDescendantsById,
        verticalOrderByEntityId,
        minVerticalOrderOfChildren,
        maxVerticalOrderOfChildren,
      },
      rootState,
      rootGetters,
    ) => {
      const lines = [];
      rootGetters['levelsData/sortedLevels'].forEach((h) => {
        const allParentsInLevel = allEntitiesByLevelId(h.levelId).filter((e) => hasDescendantsById(e.entityId));
        allParentsInLevel.forEach((p, index) => {
          const parentVerticalOrder = verticalOrderByEntityId(p.entityId, p.levelId);
          const newLine = {
            levelId: h.levelId,
            entityId: p.entityId,
            indentation: index,
            y0: Math.min(minVerticalOrderOfChildren(p.entityId, h.levelId), parentVerticalOrder),
            y1: Math.max(maxVerticalOrderOfChildren(p.entityId, h.levelId), parentVerticalOrder),
          };
          lines.push(newLine);
        });
      });
      return lines;
    },

    calculatedLinesByLevelId:
      (_, { calculatedLines }, rootState, rootGetters) => (levelId) => calculatedLines.filter(
        (li) => rootGetters['levelsData/getLevels'].find((le) => le.upperLevelId === li.levelId)
          .levelId === levelId,
      ),

    lineByEntityId:
      (_, { calculatedLines }) => (entityId) => calculatedLines.find((l) => l.entityId === entityId) || {
        indentation: 0,
      },
  },
  mutations: {
    addEntity: (state, {
      entityId, name, description, levelId, upperEntityId, tagIds,
    }) => {
      state.entities.push(
        new Entity({
          entityId,
          name,
          description,
          levelId,
          upperEntityId,
          tagIds,
        }),
      );
    },
    replaceEntity: (state, {
      entityId, name, description, levelId, upperEntityId, tagIds,
    }) => {
      state.entities.splice(
        state.entities.findIndex((i) => i.entityId === entityId),
        1,
        new Entity({
          entityId,
          name,
          description,
          levelId,
          upperEntityId,
          tagIds,
        }),
      );
    },
    deleteEntity: (state, { entityId }) => {
      state.entities.splice(
        Array.from(state.entities).findIndex((i) => i.entityId === entityId),
        1,
      );
    },
    setLoading: (state, { newValue }) => {
      state.loading = newValue;
    },
  },
  actions: {
    APIpostNewEntity: async ({ commit, dispatch }, entityDraft) => {
      commit('setLoading', { newValue: true });
      const postResponse = await postNewEntity(entityDraft);
      commit('addEntity', postResponse);
      dispatch(
        'entitiesUI/readEntityHandler',
        {
          entityId: postResponse.entityId,
        },
        {
          root: true,
        },
      );

      commit('setLoading', { newValue: false });
    },
    APIputEntity: async ({ commit, dispatch }, entityDraft) => {
      commit('setLoading', { newValue: true });
      const putResponse = await putEntity(entityDraft);
      commit('replaceEntity', putResponse);
      dispatch(
        'entitiesUI/readEntityHandler',
        {
          entityId: putResponse.entityId,
        },
        {
          root: true,
        },
      );
      commit('setLoading', { newValue: false });
    },
    APIdeleteEntity: async ({ commit, dispatch, rootGetters }) => {
      commit('setLoading', { newValue: true });
      const deleteResponse = await deleteEntity();
      if (deleteResponse.errors.length > 0) {
        commit('setLoading', { newValue: false });
      }
      commit('deleteEntity', {
        entityId: rootGetters['entitiesUI/getEntityIdInFocus'],
      });
      commit('entitiesUI/setEntityIdInFocus', { newValue: null }, { root: true });
      commit('entitiesUI/setEntityModalMode', { newValue: modalModesDict.read }, { root: true });
      dispatch(
        'entitiesUI/abortReadEntityHandler',
        {},
        {
          root: true,
        },
      );

      commit('setLoading', { newValue: false });
    },
  },
};

export default entitiesData;
