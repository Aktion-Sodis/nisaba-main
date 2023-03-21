import { Auth } from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Hub } from "@aws-amplify/core";
import { API } from "@aws-amplify/api";
import { createUser } from "../../graphql/mutations";

import i18n from "../../i18n";
import { signInStatusDict, vuexModulesDict } from "../../lib/constants";
import { waitForMilliseconds } from "../../lib/utils";
import { User } from "../../models";

const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    idToken: null,

    // "Credentials"
    userId: null,
    username: null,
    organizationId: null,
    firstName: null,
    lastName: null,

    rememberSession: true,
    priorRouteActivity: Date.now(),
    lastRouteActivity: Date.now(),

    // tempPassword: null,
  }),
  getters: {
    getIsAuthenticated: ({ isAuthenticated }) => isAuthenticated,
    getIdToken: ({ idToken }) => idToken,
    getUserId: ({ userId }) => userId,
    getEmail: ({ username }) => username,
    getOrganizationId: ({ organizationId }) => organizationId,
    getFirstName: ({ firstName }) => firstName,
    getLastName: ({ lastName }) => lastName,

    credentials: (
      _,
      { getUserId, getEmail, getOrganizationId, getFirstName, getLastName }
    ) => ({
      userId: getUserId,
      username: getEmail,
      organizationId: getOrganizationId,
      firstName: getFirstName,
      lastName: getLastName,
    }),

    getRememberSession: ({ rememberSession }) => rememberSession,
    getLastRouteActivity: ({ lastRouteActivity }) => lastRouteActivity,
    getPriorRouteActivity: ({ priorRouteActivity }) => priorRouteActivity,

    // <==> is it longer than an hour?
    lastRouteActivityDiffTooLarge: (
      _,
      { getLastRouteActivity, getPriorRouteActivity }
    ) => getLastRouteActivity - getPriorRouteActivity > 1000 * 60 * 60,

    // getTempPassword: ({ tempPassword }) => tempPassword,
  },
  mutations: {
    setIsAuthenticated(state, { newValue }) {
      state.isAuthenticated = newValue;
    },
    setCredentials(
      state,
      { userId, username, organizationId, firstName, lastName }
    ) {
      state.userId = userId;
      state.username = username;
      state.organizationId = organizationId;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    setIdToken(state, { newToken }) {
      state.idToken = newToken;
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
    // setTempPassword(state, { newValue }) {
    //   state.tempPassword = newValue;
    // },
  },
  actions: {
    async signIn(
      { commit, dispatch, rootGetters },
      { username, password, rememberMe }
    ) {
      try {
        const x = await Auth.signIn(
          username,
          password,
          rememberMe
            ? {
                // 1 year
                expires: String(365 * 24 * 60 * 60),
              }
            : undefined
        );

        if (x.challengeName === "NEW_PASSWORD_REQUIRED") {
          await Auth.completeNewPassword(x, password);
        }

        let cognitoUser;
        let trials = 0;
        while (!cognitoUser && trials < 10) {
          try {
            cognitoUser = await Auth.currentAuthenticatedUser();
          } catch {
            //
          } finally {
            await waitForMilliseconds(500);
            trials++;
          }
        }

        await DataStore.start();
        while (!rootGetters[`${vuexModulesDict.sync}/getIsDataStoreReady`]) {
          Hub.listen("datastore", async ({ payload: { event } }) => {
            if (event === "ready") {
              commit(
                `${vuexModulesDict.sync}/setIsDataStoreReady`,
                { newValue: true },
                { root: true }
              );
            }
          });
          await waitForMilliseconds(500);
        }

        const { attributes } = x;

        // query user by firstName and lastName, sort by createdAt
        const userInDb = await DataStore.query(User, attributes?.sub);

        if (!userInDb) {
          commit("setCredentials", {
            userId: attributes?.sub,
          });
          return signInStatusDict.completeUserInfo;
        }

        const userEmail = attributes?.email;
        const organizationId = attributes["custom:organization_id"];
        const firstName = attributes?.given_name;
        const lastName = attributes?.family_name;

        commit("setCredentials", {
          userId: userInDb.id,
          email: userEmail,
          organizationId,
          firstName,
          lastName,
        });

        dispatch(`${vuexModulesDict.organization}/APIGet`, organizationId, {
          root: true,
        });

        // if password is finalized
        commit("setIdToken", {
          newToken: x.signInUserSession.idToken.jwtToken,
        });
        commit("setIsAuthenticated", { newValue: true });
        commit("setRememberSession", { newValue: rememberMe });
        return signInStatusDict.success;
      } catch (error) {
        await Auth.signOut();
        dispatch(
          `${vuexModulesDict.feedback}/showFeedbackForDuration`,
          {
            type: "error",
            text: i18n.t(`general.errorCodes.${error.code}`),
          },
          { root: true }
        );
        commit("setIdToken", { newToken: null });
        commit("setIsAuthenticated", { newValue: false });
        commit("setCredentials", {
          userId: null,
          email: null,
          organizationId: null,
          firstName: null,
          lastName: null,
        });
        return signInStatusDict.failed;
      }
    },

    async completeUserInformation(
      { commit, getters, dispatch },
      { firstName, lastName }
    ) {
      try {
        await API.graphql({
          query: createUser,
          variables: {
            input: {
              id: getters.getUserId,
              firstName,
              lastName,
              permissions: [],
            },
          },
        });
      } catch (error) {
        commit("setIdToken", { newToken: null });
        commit("setIsAuthenticated", { newValue: false });
        await Auth.signOut();
        return signInStatusDict.failed;
      }

      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
          given_name: firstName,
          family_name: lastName,
        });
        commit("setCredentials", {
          userId: getters.getUserId,
          email: getters.getEmail,
          organizationId: user.attributes["custom:organization_id"],
          firstName,
          lastName,
        });
        commit("setIdToken", {
          newToken: user.signInUserSession.idToken.jwtToken,
        });
        commit("setIsAuthenticated", { newValue: true });
        // commit("setTempPassword", { newValue: null });
        return signInStatusDict.success;
      } catch (e) {
        commit("setIdToken", { newToken: null });
        commit("setIsAuthenticated", { newValue: false });
        return signInStatusDict.failed;
      }
    },

    async forgotPassword(_, { email }) {
      try {
        await Auth.forgotPassword(email);
        return signInStatusDict.success;
      } catch (e) {
        return signInStatusDict.failed;
      }
    },

    async forgotPasswordSubmit({ getters }, { code, newPassword }) {
      try {
        await Auth.forgotPasswordSubmit(getters.getEmail, code, newPassword);
        return signInStatusDict.success;
      } catch {
        return signInStatusDict.failed;
      }
    },

    async changePassword(_, { oldPassword, newPassword }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
        return signInStatusDict.success;
      } catch {
        return signInStatusDict.failed;
      }
    },
    async deleteSession({ commit, dispatch }) {
      try {
        await Auth.signOut();
      } catch (error) {
        dispatch(
          `${vuexModulesDict.feedback}/showFeedbackForDuration`,
          {
            type: "error",
            text: error.errors[0].message,
          },
          { root: true }
        );
      }
      commit("setCredentials", {
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
      });
      commit("deleteRouteActivity");
      commit("setIdToken", { newToken: null });
      commit("setIsAuthenticated", { newValue: false });
    },
  },
};

export default authModule;
