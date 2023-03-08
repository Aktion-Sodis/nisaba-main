import { Auth } from "@aws-amplify/auth";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";

import i18n from "../../i18n";
import { authChallengeNamesDict, signInStatusDict, vuexModulesDict } from "../../lib/constants";
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

    credentials: (_, { getUserId, getEmail, getOrganizationId, getFirstName, getLastName }) => ({
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
    lastRouteActivityDiffTooLarge: (_, { getLastRouteActivity, getPriorRouteActivity }) =>
      getLastRouteActivity - getPriorRouteActivity > 1000 * 60 * 60,

    // getTempPassword: ({ tempPassword }) => tempPassword,
  },
  mutations: {
    setIsAuthenticated(state, { newValue }) {
      state.isAuthenticated = newValue;
    },
    setCredentials(state, { userId, username, organizationId, firstName, lastName }) {
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
    async signIn({ commit, dispatch }, { username, password, rememberMe }) {
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

        // query user by firstName and lastName, sort by createdAt
        const usersInDb = await DataStore.query(
          User,
          (u) =>
            u.and((u) => [
              u.firstName.eq(x.attributes?.given_name),
              u.lastName.eq(x.attributes?.family_name),
            ]),
          {
            sort: (u) => u.createdAt(SortDirection.DESCENDING),
          }
        );

        console.log({ usersInDb });

        if (usersInDb.length === 0) {
          // commit("setTempPassword", { newValue: password });
          return signInStatusDict.completeUserInfo;
        }

        // if password is not finalized
        // if (challengeName === authChallengeNamesDict.newPasswordRequired) {
        //   commit("setTempPassword", { newValue: password });
        //   return signInStatusDict.completeUserInfo;
        // }

        const { attributes } = x;

        const userEmail = attributes?.email;
        const organizationId = attributes["custom:organization_id"];
        const firstName = attributes?.given_name;
        const lastName = attributes?.family_name;

        commit("setCredentials", {
          userId: usersInDb[0].id,
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
        console.log({ error });
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

    async completeUserInformation({ commit, getters, dispatch }, { firstName, lastName }) {
      // if (!getters.getUserId) {
      //   dispatch(
      //     `${vuexModulesDict.feedback}/showFeedbackForDuration`,
      //     {
      //       type: "error",
      //       text: "You cannot just update a user profile without following the sign in flow.",
      //     },
      //     { root: true }
      //   );
      //   return signInStatusDict.failed;
      // }

      try {
        // await Auth.completeNewPassword(
        //   await Auth.signIn(getters.getEmail, getters.getTempPassword)
        //   // newPassword
        // );
        const userDb = new User({
          firstName,
          lastName,
          permissions: [],
        });
        await DataStore.save(userDb);
        commit("setCredentials", {
          userId: userDb.id,
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
        console.log({ e });
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
        console.log(e);
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
