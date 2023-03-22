import { API } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";

import i18n from "../../i18n";
import { vuexModulesDict } from "../../lib/constants";

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
  createUser: async ({ dispatch }, userDraft) => {
    const { username, group } = userDraft;

    // console log the id token
    const { idToken } = await Auth.currentSession();
    const { jwtToken } = idToken;

    try {
      // Call the API `nisabaUserManagementApi` to create a user and pass the username as a parameter
      const { finalPassword } = await API.post("nisabaUserManagementApi", "/users", {
        headers: { Authorization: `Bearer ${jwtToken}` },
        body: { username, group },
      });

      // Show a success message
      dispatch(
        `${vuexModulesDict.feedback}/showFeedbackForDuration`,
        {
          type: "success",
          text: i18n.t("userManagement.successfulSentInvitation"),
          duration: -1,
        },
        {
          root: true,
        }
      );
      return finalPassword;
    } catch (e) {
      const { data } = e.response;
      const { error } = data;

      if (error === "UsernameExistsException") {
        // Show an error message
        dispatch(
          `${vuexModulesDict.feedback}/showFeedbackForDuration`,
          {
            type: "error",
            text: i18n.t("userManagement.emailAlreadyInUse"),
          },
          {
            root: true,
          }
        );
      } else {
        // Show a general error message
        dispatch(
          `${vuexModulesDict.feedback}/showFeedbackForDuration`,
          {
            type: "error",
            text: i18n.t("general.operationFeedback.data.error.create"),
          },
          {
            root: true,
          }
        );
      }
      return null;
    }
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
