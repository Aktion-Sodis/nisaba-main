import { DataStore } from '@aws-amplify/datastore';
import { API } from 'aws-amplify';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { deleteEntity } from '../../../graphql/mutations';
import { AppliedCustomData, Entity, I18nString } from '../../../models';
import { deriveFilePath } from '../../../lib/utils';

/** @type {import("vuex").GetterTree<import("./entity.module").EntityState>} */
const getters = {
  /* READ */
  getEntities: ({ entities }) => entities.filter((e) => !e._deleted),
  getLoading: ({ loading }) => loading,

  // sort by id for consistency
  allEntitiesByLevelId:
    (_, { getEntities }) =>
    ({ entityLevelId }) =>
      getEntities.filter((e) => e.entityLevelId === entityLevelId).sort((a, b) => a.id - b.id),

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

  /* returns "lines" with the schema {id, id, indentation, y0, y1} */
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
    rootGetters
  ) => {
    const lines = [];
    rootGetters[`${vuexModulesDict.level}/sortedLevels`].forEach((l) => {
      const allParentsInLevel = allEntitiesByLevelId({ entityLevelId: l.id }).filter((e) =>
        hasDescendantsById({ id: e.id })
      );
      allParentsInLevel.forEach((p, index) => {
        const parentVerticalOrder = verticalOrderByEntityId({
          entityId: p.id,
          entityLevelId: p.entityLevelId,
        });
        const newLine = {
          entityLevelId: l.id,
          entityId: p.id,
          indentation: index,
          y0: Math.min(
            minVerticalOrderOfChildren({ entityId: p.id, entityLevelId: l.id }),
            parentVerticalOrder
          ),
          y1: Math.max(
            maxVerticalOrderOfChildren({ entityId: p.id, entityLevelId: l.id }),
            parentVerticalOrder
          ),
        };
        lines.push(newLine);
      });
    });
    return lines;
  },

  calculatedLinesByLevelId:
    (_, { calculatedLines }, rootState, rootGetters) =>
    ({ entityLevelId }) =>
      calculatedLines.filter(
        (li) =>
          rootGetters[`${vuexModulesDict.level}/getLevels`].find(
            (le) => le.parentLevelID === li.entityLevelId
          ).id === entityLevelId
      ),

  lineByEntityId:
    (_, { calculatedLines }) =>
    ({ id }) =>
      calculatedLines.find((l) => l.entityId === id) || {
        indentation: 0,
      },
};

export default getters;
