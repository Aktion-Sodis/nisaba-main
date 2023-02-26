import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { AppliedCustomData, Entity, I18nString } from '../../../models';

const APIpost = async ({ commit, dispatch, rootGetters }, entityDraft) => {
  let success = true;
  commit('setLoading', { newValue: true });

  const entity = new Entity({
    ...entityDraft,
    name: new I18nString(entityDraft.name),
    description: new I18nString(entityDraft.description),
    customData: entityDraft.customData.map((cd) => new AppliedCustomData(cd)),
  });

  try {
    const postResponse = await DataStore.save(entity);

    if (rootGetters['dataModal/getImageFile'] instanceof File) {
      try {
        await Storage.put(
          rootGetters.callDeriveFilePathWithOrganizationId('entityPicPath', {
            entityID: postResponse.id,
          }),
          rootGetters['dataModal/getImageFile'],
        );
      } catch {
        success = false;
      }
    }

    commit('addEntity', postResponse);
    dispatch(
      `${vuexModulesDict.dataModal}/readData`,
      {
        dataId: postResponse.id,
        dataType: dataTypesDict.entity,
      },
      {
        root: true,
      },
    );
  } catch (error) {
    success = false;
    console.log(error);
  }

  commit('setLoading', { newValue: false });
  return success;
};
// We had to rewrite this by using graphql instead of DataStore,
// because DataStore was throwing an unrepairable error.
// Another point where we see that we are regretful for
// choosing Amplify.
const APIput = async ({
  commit, dispatch, getters, rootGetters,
}, { newData, originalId }) => {
  commit('setLoading', { newValue: true });
  let success = true;

  try {
    const original = getters.ENTITYById({ id: originalId });
    if (!original) throw new Error('Original entity not found');
    const putResponse = await DataStore.save(
      Entity.copyOf(original, (updated) => {
        updated.name = newData.name;
        updated.description = newData.description;
        updated.parentEntityID = newData.parentEntityID;
        updated.customData = newData.customData.map((cd) => new AppliedCustomData(cd));
      }),
    );

    const newEntity = putResponse;

    if (rootGetters['dataModal/getImageFile'] instanceof File) {
      try {
        await Storage.put(
          rootGetters.callDeriveFilePathWithOrganizationId('entityPicPath', {
            entityID: newEntity.id,
          }),
          rootGetters['dataModal/getImageFile'],
        );
      } catch {
        success = false;
      }
    }

    commit('replaceEntity', newEntity);

    dispatch(
      `${vuexModulesDict.dataModal}/readData`,
      {
        dataId: newEntity.id,
        dataType: dataTypesDict.entity,
      },
      {
        root: true,
      },
    );
  } catch {
    success = false;
  }

  commit('setLoading', { newValue: false });
  return success;
};
const APIdelete = async ({ commit, dispatch }, { id, _version }) => {
  let success = true;
  commit('setLoading', { newValue: true });

  try {
    const toDelete = await DataStore.query(Entity, id);
    await DataStore.delete(toDelete);
  } catch {
    success = false;
  }

  commit('deleteEntity', {
    id,
  });
  commit(`${vuexModulesDict.dataModal}/setDataIdInFocus`, { newValue: null }, { root: true });
  commit(`${vuexModulesDict.dataModal}/setMode`, { newValue: modalModesDict.read }, { root: true });
  dispatch(
    `${vuexModulesDict.dataModal}/abortReadData`,
    {},
    {
      root: true,
    },
  );

  commit('setLoading', { newValue: false });
  return success;
};
// eslint-disable-next-line no-empty-pattern
const APIgetAll = async ({}, { apiLevels }) => {
  // Apparently there is no way to get all entities in one go
  // so we have to do it in a loop over all levels
  // Another point where we see that we are regretful for
  // choosing Amplify.
  try {
    let res = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const apiLevel of apiLevels) {
      // eslint-disable-next-line no-await-in-loop
      const entitiesOApiLevel = await DataStore.query(Entity, (c) => c.entityLevelId('eq', apiLevel.id));
      res = res.concat(entitiesOApiLevel ?? []);
    }
    return res;
  } catch (error) {
    console.log({ error });
    return [];
  }
};
const setChosenEntityIdsFromApiLevels = ({ getters, dispatch }, { apiLevelIds }) => {
  // eslint-disable-next-line
  for (const levelId of apiLevelIds) {
    const firstEntity = getters.allEntitiesByLevelId({ levelId })[0] ?? null;
    if (firstEntity) {
      dispatch('addChosenEntityId', { entityId: firstEntity.id, levelId });
    }
  }
};
const addChosenEntityId = ({ state, getters, commit }, { entityId, levelId }) => {
  const alreadyChosenEntity = getters.chosenEntityByLevelId({ levelId });
  if (alreadyChosenEntity) {
    commit('removeChosenEntityId', { entityId: alreadyChosenEntity.id });
  }
  const asSet = new Set(state.chosenEntityIds);
  asSet.add(entityId);
  state.chosenEntityIds = Array.from(asSet);
};

/** @type {import("vuex").ActionTree<import("./entity.module").EntityState>} */
export default {
  APIpost,
  APIput,
  APIdelete,
  APIgetAll,
  setChosenEntityIdsFromApiLevels,
  addChosenEntityId,
};
