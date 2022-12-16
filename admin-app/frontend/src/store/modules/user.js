import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { createUser } from '../../graphql/mutations';

import i18n from '../../i18n';
import { authChallengeNamesDict, signInStatusDict, vuexModulesDict } from '../../lib/constants';

/** @type {{isAuthenticated: boolean}} */
const moduleState = {
  isAuthenticated: false,
};

/** @type {import("vuex").GetterTree<typeof moduleState>} */
const moduleGetters = {
  getIsAuthenticated: ({ isAuthenticated }) => isAuthenticated,
};

/** @type {import("vuex").MutationTree<typeof moduleState>} */
const moduleMutations = {
  setIsAuthenticated: (state, { newValue }) => {
    state.isAuthenticated = newValue;
  },
};

/** @type {import("vuex").ActionTree<typeof moduleState>} */
const moduleActions = {
  createUser: async ({ commit, dispatch }, userDraft) => {
    const { email } = userDraft;
    // TODO arthur
    dispatch(
      `${vuexModulesDict.feedback}/showFeedbackForDuration`,
      {
        type: 'success',
        text: i18n.t(`general.operationFeedback.data.success.create`),
      },
      {
        root: true,
      }
    );
  },
};

const userModule = {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations: moduleMutations,
  actions: moduleActions,
};

export default userModule;
