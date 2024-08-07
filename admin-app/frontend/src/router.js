import Vue from "vue";
import VueRouter from "vue-router";
import { Auth as AmplifyAuth } from "@aws-amplify/auth";
import store from "./store";
import i18n from "./i18n";

// import Home from './views/Home.vue';
import OrganizationStructure from "./views/OrganizationStructure.vue";
// import BaseData from './views/BaseData.vue';
import Surveys from "./views/Surveys.vue";
import Interventions from "./views/Interventions.vue";
import UserManagement from "./views/UserManagement.vue";
import Auth from "./views/Auth.vue";
import { routeNamesDict, syncStatusDict, vuexModulesDict } from "./lib/constants";

Vue.use(VueRouter);

export const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     requiresAuth: true,
  //     shouldBeSynced: false,
  //     title: i18n.t('general.routes.Home'),
  //     onSideBar: false, // TODO: Will change in the future.
  //   },
  // },
  {
    path: "/login",
    name: routeNamesDict.Login,
    component: Auth,
    meta: {
      requiresAuth: false,
      shouldBeSynced: false,
      title: i18n.t("general.routes.Login"),
      onSideBar: false,
    },
  },
  {
    path: "/",
    redirect: { name: routeNamesDict.OrganizationStructure },
    meta: {
      requiresAuth: true,
      shouldBeSynced: false,
      title: "redirecting...",
      onSideBar: false, // TODO: Will change in the future.
    },
  },
  {
    path: "/complete-user-info",
    name: routeNamesDict.CompleteUserInfo,
    component: Auth,
    meta: {
      requiresAuth: false,
      shouldBeSynced: false,
      title: i18n.t("general.routes.CompleteUserInfo"),
      onSideBar: false,
    },
  },
  {
    path: "/change-password",
    name: routeNamesDict.ChangePassword,
    component: Auth,
    meta: {
      requiresAuth: false,
      shouldBeSynced: false,
      title: i18n.t("general.routes.ChangePassword"),
      onSideBar: false,
    },
  },
  {
    path: "/forgot-password",
    name: routeNamesDict.ForgotPassword,
    component: Auth,
    meta: {
      requiresAuth: false,
      shouldBeSynced: false,
      title: i18n.t("general.routes.ForgotPassword"),
      onSideBar: false,
    },
  },
  {
    path: "/organization-structure",
    name: routeNamesDict.OrganizationStructure,
    component: OrganizationStructure,
    meta: {
      requiresAuth: true,
      shouldBeSynced: true,
      title: i18n.t("general.routes.OrganizationStructure"),
      onSideBar: true,
      icon: "mdi-clipboard-text-outline",
    },
  },
  {
    path: "/interventions",
    name: routeNamesDict.Interventions,
    component: Interventions,
    meta: {
      requiresAuth: true,
      shouldBeSynced: true,
      title: i18n.t("general.routes.Interventions"),
      onSideBar: true,
      icon: "mdi-wrench-outline",
    },
  },
  {
    path: "/surveys",
    name: routeNamesDict.Surveys,
    component: Surveys,
    meta: {
      requiresAuth: true,
      shouldBeSynced: true,
      title: i18n.t("general.routes.Surveys"),
      onSideBar: true,
      icon: "mdi-crosshairs-question",
    },
  },
  // {
  //   path: '/base-data',
  //   name: 'BaseData',
  //   component: BaseData,
  //   meta: {
  //     requiresAuth: true,
  //     shouldBeSynced: true,
  //     title: i18n.t('general.routes.BaseData'),
  //     onSideBar: false,
  //   },
  // },
  {
    path: "/user-management",
    name: routeNamesDict.UserManagement,
    component: UserManagement,
    meta: {
      requiresAuth: true,
      shouldBeSynced: true,
      title: i18n.t("general.routes.UserManagement"),
      onSideBar: true,
      icon: "mdi-account-multiple",
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  //   meta: {
  //     requiresAuth: false,
  //     shouldBeSynced: false,
  //     title: i18n.t('general.routes.about'),
  //     onSideBar: false, // TODO: Might change in the future.
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  store.commit(`${vuexModulesDict.auth}/updateRouteActivity`, { root: true });
  await Vue.nextTick();
  let cognitoUserSession;
  try {
    cognitoUserSession = await AmplifyAuth.currentSession();
  } catch {
    cognitoUserSession = null;
  }

  if (
    cognitoUserSession &&
    (to.name === routeNamesDict.Login ||
      (from.name !== routeNamesDict.Login && to.name === routeNamesDict.CompleteUserInfo))
  ) {
    next({ name: from?.name ?? routeNamesDict.OrganizationStructure });
  }
  // if ((!from.name || from.meta.requiresAuth) && cognitoUserSession) {
  //   store.dispatch(`${vuexModulesDict.auth}/deleteSession`, { root: true });
  //   next({ name: routeNamesDict.Login });
  //   store.dispatch(
  //     `${vuexModulesDict.feedback}/showFeedbackForDuration`,
  //     {
  //       type: 'warning',
  //       text: i18n.t('general.warningCodes.sessionExpired'),
  //     },
  //     { root: true }
  //   );
  // }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!cognitoUserSession) {
      // redirect to login page if not authenticated
      store.dispatch(`${vuexModulesDict.auth}/deleteSession`);
      next({ name: routeNamesDict.Login });
    } else {
      if (to.meta.shouldBeSynced) {
        store.dispatch(
          `${vuexModulesDict.sync}/refreshHandler`,
          { routeName: to.name },
          { root: true }
        );
      } else {
        store.commit(
          `${vuexModulesDict.sync}/setStatus`,
          { newStatus: syncStatusDict.synched },
          { root: true }
        );
      }
      next();
    }
  } else {
    if (to.meta.shouldBeSynced) {
      store.dispatch(
        `${vuexModulesDict.sync}/refreshHandler`,
        { routeName: to.name },
        { root: true }
      );
    } else {
      store.commit(
        `${vuexModulesDict.sync}/setStatus`,
        { newStatus: syncStatusDict.synched },
        { root: true }
      );
    }
    next();
  }
});

const DEFAULT_TITLE = "Admin-App";
router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = `${to.meta.title} · Admin-App` || DEFAULT_TITLE;
  });
});

export default router;
