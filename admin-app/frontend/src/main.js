import Vue from "vue";
import awsExports from "./aws-exports";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import { Amplify } from "aws-amplify";

awsExports.graphql_headers = async () => {
  try {
    const token = (await Amplify.Auth.currentSession()).idToken.jwtToken;
    return { Authorization: token };
  } catch (e) {
    console.log(e);
    return {};
  }
};

Amplify.configure(awsExports);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
