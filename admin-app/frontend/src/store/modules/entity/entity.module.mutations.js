import { DataStore } from '@aws-amplify/datastore';
import { API } from 'aws-amplify';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { deleteEntity } from '../../../graphql/mutations';
import { AppliedCustomData, Entity, I18nString } from '../../../models';
import { deriveFilePath } from '../../../lib/utils';

/** @type {import("vuex").MutationTree<import("./entity.module").EntityState>} */
const mutations = {
  addEntity: (state, entity) => {
    state.entities.push(entity);
  },
  replaceEntity: (state, entity) => {
    state.entities.splice(
      state.entities.findIndex((i) => i.id === entity.id),
      1,
      entity
    );
  },
  deleteEntity: (state, { id }) => {
    state.entities.splice(
      Array.from(state.entities).findIndex((i) => i.id === id),
      1
    );
  },
  setLoading: (state, { newValue }) => {
    state.loading = newValue;
  },

  removeChosenEntityId: (state, { entityId }) => {
    const asSet = new Set(state.chosenEntityIds);
    asSet.delete(entityId);
    state.chosenEntityIds = Array.from(asSet);
  },

  deleteEntitiesByLevelId: (state, { entityLevelId }) => {
    state.entities = state.entities.filter((e) => e.entityLevelId !== entityLevelId);
  },
  setEntities: (state, { newValue }) => {
    state.entities = newValue;
  },
};

export default mutations;
