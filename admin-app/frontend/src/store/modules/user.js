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
    const { email, group } = userDraft;

    // console log the id token
    const { idToken } = await Auth.currentSession();
    const { jwtToken } = idToken;

    try {
      // Call the API `nisabaUserManagementApi` to create a user and pass the email as a parameter
      await API.post("nisabaUserManagementApi", "/users", {
        headers: { Authorization: `Bearer ${jwtToken}` },
        body: { email },
      });

      // Show a success message
      dispatch(
        `${vuexModulesDict.feedback}/showFeedbackForDuration`,
        {
          type: "success",
          text: i18n.t("userManagement.successfulSentInvitation"),
        },
        {
          root: true,
        }
      );
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
