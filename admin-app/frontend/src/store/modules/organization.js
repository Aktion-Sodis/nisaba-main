import {
  Auth, API, graphqlOperation, DataStore,
} from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { createUser } from '../../graphql/mutations';

import i18n from '../../i18n';
import { authChallengeNamesDict, signInStatusDict, vuexModulesDict } from '../../lib/constants';
import { Organization } from '../../models';

/** @type {{nameCamelCase: string, nameVerbose: string, nameKebabCase: string}} */
const moduleState = {
  nameCamelCase: null,
  nameVerbose: null,
  nameKebabCase: null,
};

/** @type {import("vuex").GetterTree<typeof moduleState>} */
const moduleGetters = {
  getNameCamelCase: ({ nameCamelCase }) => nameCamelCase,
  getNameVerbose: ({ nameVerbose }) => nameVerbose,
  getNameKebabCase: ({ nameKebabCase }) => nameKebabCase,
};

/** @type {import("vuex").MutationTree<typeof moduleState>} */
const moduleMutations = {
  setOrganization(state, { nameCamelCase, nameVerbose, nameKebabCase }) {
    state.nameCamelCase = nameCamelCase;
    state.nameVerbose = nameVerbose;
    state.nameKebabCase = nameKebabCase;
  },
};

/** @type {import("vuex").ActionTree<typeof moduleState>} */
const moduleActions = {
  async APIGet({ commit, dispatch, rootGetters }, organizationId) {
    try {
      const apiOrganization = await DataStore.query(Organization, organizationId);
      commit('setOrganization', {
        nameCamelCase: apiOrganization.nameCamelCase,
        nameVerbose: apiOrganization.nameVerbose,
        nameKebabCase: apiOrganization.nameKebabCase,
      });
    } catch (error) {
      console.log('error', error);
    }
  },
};

const organizationModule = {
  namespaced: true,
  state: () => moduleState,
  getters: moduleGetters,
  mutations: moduleMutations,
  actions: moduleActions,
};

export default organizationModule;
