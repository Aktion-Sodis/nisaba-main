import { DataStore } from '@aws-amplify/datastore';
import { API } from 'aws-amplify';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { deleteEntity } from '../../../graphql/mutations';
import { AppliedCustomData, Entity, I18nString } from '../../../models';
import { deriveFilePath } from '../../../lib/utils';

/** @type {import("vuex").ActionTree<import("./entity.module").EntityState>} */
const actions = {
  APIpost: async ({ commit, dispatch, rootGetters }, entityDraft) => {
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
            deriveFilePath('entityPicPath', { entityID: postResponse.id }),
            rootGetters['dataModal/getImageFile']
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
        }
      );
    } catch (error) {
      success = false;
      console.log(error);
    }

    commit('setLoading', { newValue: false });
    return success;
  },
  APIput: async ({ commit, dispatch, getters, rootGetters }, { newData, originalId }) => {
    commit('setLoading', { newValue: true });
    let success = true;

    const original = getters.ENTITYById({ id: originalId });

    try {
      const putResponse = await DataStore.save(
        Entity.copyOf(original, (updated) => {
          updated.name = newData.name;
          updated.description = newData.description;
          updated.parentEntityID = newData.parentEntityID;
          updated.customData = newData.customData.map((cd) => new AppliedCustomData(cd));
        })
      );

      if (rootGetters['dataModal/getImageFile'] instanceof File) {
        try {
          console.log(deriveFilePath('entityPicPath', { entityID: putResponse.id }));
          await Storage.put(
            deriveFilePath('entityPicPath', { entityID: putResponse.id }),
            rootGetters['dataModal/getImageFile']
          );
        } catch {
          success = false;
        }
      }

      commit('replaceEntity', putResponse);

      dispatch(
        `${vuexModulesDict.dataModal}/readData`,
        {
          dataId: putResponse.id,
          dataType: dataTypesDict.entity,
        },
        {
          root: true,
        }
      );
    } catch (error) {
      console.log('hey', error);
      success = false;
    }

    commit('setLoading', { newValue: false });
    return success;
  },
  APIdelete: async ({ commit, dispatch }, { id, _version }) => {
    let success = true;
    commit('setLoading', { newValue: true });

    try {
      await API.graphql({
        query: deleteEntity,
        variables: { input: { id, _version } },
      });
    } catch {
      success = false;
    }

    commit('deleteEntity', {
      id,
    });
    commit(`${vuexModulesDict.dataModal}/setDataIdInFocus`, { newValue: null }, { root: true });
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

    commit('setLoading', { newValue: false });
    return success;
  },
  APIgetAll: async () => {
    try {
      return await DataStore.query(Entity);
    } catch {
      return [];
    }
  },
};

export default actions;
