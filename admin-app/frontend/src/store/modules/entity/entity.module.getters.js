import { DataStore } from '@aws-amplify/datastore';
import { API } from 'aws-amplify';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { deleteEntity } from '../../../graphql/mutations';
import { AppliedCustomData, Entity, I18nString } from '../../../models';
import { deriveFilePath } from '../../../lib/utils';

/** @type {import("vuex").GetterTree<import("./entity.module").EntityState>} */
const getters = {
  getEntities: ({ entities }) => entities.filter((e) => !e._deleted),
  getLoading: ({ loading }) => loading,
  getChosenEntityIds: ({ chosenEntityIds }) => chosenEntityIds,

  // sort by id for consistency
  allEntitiesByLevelId:
    (_, { getEntities }) =>
    ({ levelId }) =>
      getEntities.filter((e) => e.entityLevelId === levelId).sort((a, b) => a.id - b.id),

  isEntityChosen:
    (_, { getChosenEntityIds }) =>
    ({ entityId }) =>
      getChosenEntityIds.includes(entityId),

  isEntityActive:
    (_, { getChosenEntityIds }) =>
    ({ parentEntityId }) =>
      !!getChosenEntityIds.find((id) => id === parentEntityId) || parentEntityId === null,

  allActiveEntitiesByLevelId:
    (_, { isEntityActive, allEntitiesByLevelId }) =>
    ({ levelId }) =>
      allEntitiesByLevelId({ levelId }).filter((e) =>
        isEntityActive({ parentEntityId: e.parentEntityID })
      ),

  /** @returns { (payload: {entityId: string, entityLevelId: string}) => number } */
  verticalOrderByEntityId:
    (_, { allEntitiesByLevelId }) =>
    ({ entityId, entityLevelId }) =>
      allEntitiesByLevelId({ entityLevelId }).findIndex((e) => e.id === entityId),

  maxVerticalOrderOfChildren:
    (_, { allEntitiesByLevelId }, rootState, rootGetters) =>
    ({ entityId, entityLevelId }) => {
      const allEntitiesInLowerLevel = allEntitiesByLevelId({
        entityLevelId: rootGetters[`${vuexModulesDict.level}/getLevels`].find(
          (l) => l.parentLevelID === entityLevelId
        )?.id,
      });
      const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
        (e) => e.parentEntityID === entityId
      );
      return lowerLevelContainsChildren
        ? allEntitiesInLowerLevel.length -
            allEntitiesInLowerLevel.reverse().findIndex((e) => e.parentEntityID === entityId) -
            1
        : -1;
    },
  minVerticalOrderOfChildren:
    (_, { allEntitiesByLevelId }, rootState, rootGetters) =>
    ({ entityId, entityLevelId }) => {
      const allEntitiesInLowerLevel = allEntitiesByLevelId({
        entityLevelId: rootGetters[`${vuexModulesDict.level}/getLevels`].find(
          (l) => l.parentLevelID === entityLevelId
        )?.id,
      });
      const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
        (e) => e.parentEntityID === entityId
      );
      return lowerLevelContainsChildren
        ? allEntitiesInLowerLevel.findIndex((e) => e.parentEntityID === entityId)
        : -1;
    },

  hasDescendantsById:
    (_, { getEntities }) =>
    ({ id }) =>
      getEntities.some((e) => e.parentEntityID === id),

  hasParentByUpperEntityId:
    (_, { getEntities }) =>
    ({ parentEntityID }) =>
      parentEntityID && getEntities.some((e) => e.id === parentEntityID),

  ENTITYById:
    (_, { getEntities }) =>
    ({ id }) =>
      getEntities.find((i) => i.id === id),
};

export default getters;
