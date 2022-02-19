import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { createUser } from '../../graphql/mutations';

import i18n from '../../i18n';

const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    token: null,

    // "Credentials"
    userId: null,
    email: null,
    firstName: null,
    lastName: null,

    rememberSession: true,
    priorRouteActivity: Date.now(),
    lastRouteActivity: Date.now(),
  }),
  getters: {
    getIsAuthenticated: ({ isAuthenticated }) => isAuthenticated,
    getToken: ({ token }) => token,
    getUserId: ({ userId }) => userId,
    getEmail: ({ email }) => email,
    getFirstName: ({ firstName }) => firstName,
    getLastName: ({ lastName }) => lastName,

    credentials: (_, {
      getUserId, getEmail, getFirstName, getLastName,
    }) => ({
      userId: getUserId,
      email: getEmail,
      firstName: getFirstName,
      lastName: getLastName,
    }),

    getRememberSession: ({ rememberSession }) => rememberSession,
    getLastRouteActivity: ({ lastRouteActivity }) => lastRouteActivity,
    getPriorRouteActivity: ({ priorRouteActivity }) => priorRouteActivity,

    // <==> is it longer than an hour?
    lastRouteActivityDiffTooLarge: (_, { getLastRouteActivity, getPriorRouteActivity }) => getLastRouteActivity - getPriorRouteActivity > 1000 * 60 * 60,
  },
  mutations: {
    setIsAuthenticated(state, { newValue }) {
      state.isAuthenticated = newValue;
    },
    setCredentials(state, {
      userId, email, firstName, lastName,
    }) {
      state.userId = userId;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    setToken(state, { newToken }) {
      state.token = newToken;
    },
    setRememberSession(state, { newValue }) {
      state.rememberSession = newValue;
    },
    updateRouteActivity(state) {
      state.priorRouteActivity = state.lastRouteActivity;
      state.lastRouteActivity = Date.now();
    },
    deleteRouteActivity(state) {
      state.priorRouteActivity = null;
      state.lastRouteActivity = null;
    },
  },
  actions: {
    async signIn({ commit, dispatch }, { email, password, rememberMe }) {
      try {
        const x = await Auth.signIn(email, password);
        const { username, Session } = x;

        const userFoundInDb = (await API.graphql(graphqlOperation(getUser, { id: username }))).data
          .getUser;

        /* eslint-disable no-underscore-dangle */
        if (userFoundInDb && !userFoundInDb._deleted) {
          /* eslint-enable no-underscore-dangle */
          // login
          commit('setCredentials', {
            userId: username,
            email,
            firstName: userFoundInDb.firstName,
            lastName: userFoundInDb.lastName,
          });
          commit('setToken', { newToken: Session });
          commit('setIsAuthenticated', { newValue: true });
          commit('setRememberSession', { newValue: rememberMe });
          return 'success';
        }

        // if user doesn't exist yet
        commit('setCredentials', {
          userId: username,
          email,
          firstName: null,
          lastName: null,
        });
        commit('setToken', { newToken: Session });
        return 'completeUserInfo';
      } catch (error) {
        const errorCode = error.code;
        dispatch(
          'FEEDBACK_UI/showFeedbackForDuration',
          {
            type: 'error',
            text: i18n.t(`general.errorCodes.${errorCode}`),
          },
          { root: true },
        );
        commit('setToken', { newToken: null });
        commit('setIsAuthenticated', { newValue: false });
        return 'failed';
      }
    },
    async completeUserInformation({ commit, getters, dispatch }, { firstName, lastName }) {
      if (!getters.getUserId) {
        dispatch(
          'FEEDBACK_UI/showFeedbackForDuration',
          {
            type: 'error',
            text: 'You cannot just update a user profile without following the sign in flow.',
          },
          { root: true },
        );
        return 'failed';
      }

      // const userFoundInDb = (
      //   await API.graphql(graphqlOperation(getUser, { id: getters.getUserId }))
      // ).data.getUser;

      // /* eslint-disable no-underscore-dangle */
      // if (userFoundInDb && userFoundInDb._deleted) {
      //   /* eslint-enable no-underscore-dangle */
      //   try {
      //     await API.graphql(
      //       graphqlOperation(updateUser, {
      //         input: {
      //           id: getters.getUserId,
      //           firstName,
      //           lastName,
      //           permissions: [],
      //           _deleted: false,
      //         },
      //       }),
      //     );
      //     commit('setCredentials', {
      //       userId: getters.getUserId,
      //       email: getters.getEmail,
      //       firstName,
      //       lastName,
      //     });
      //     commit('setIsAuthenticated', { newValue: true });
      //     return 'success';
      //   } catch (error) {
      //     console.log(error);
      //     return 'failed';
      //   }
      // }

      try {
        await API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: getters.getUserId,
              firstName,
              lastName,
              permissions: [],
            },
          }),
        );
        commit('setCredentials', {
          userId: getters.getUserId,
          email: getters.getEmail,
          firstName,
          lastName,
        });
        commit('setIsAuthenticated', { newValue: true });
        return 'success';
      } catch (error) {
        const errorCode = error.errors[0].errorType;
        dispatch(
          'FEEDBACK_UI/showFeedbackForDuration',
          {
            type: 'error',
            text: i18n.t(`general.errorCodes.${errorCode}`),
          },
          { root: true },
        );
        return 'failed';
      }
    },
    async deleteSession({ commit, dispatch }) {
      try {
        await Auth.signOut();
      } catch (error) {
        dispatch(
          'FEEDBACK_UI/showFeedbackForDuration',
          {
            type: 'error',
            text: error.errors[0].message,
          },
          { root: true },
        );
      }
      commit('setCredentials', {
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
      });
      commit('deleteRouteActivity');
      commit('setToken', { newToken: null });
      commit('setIsAuthenticated', { newValue: false });
    },
  },
};

export default authModule;
