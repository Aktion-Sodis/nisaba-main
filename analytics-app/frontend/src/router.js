import { createRouter, createWebHistory } from 'vue-router';

import { Auth } from 'aws-amplify'
import { Hub } from "@aws-amplify/core"

import store from './store';

import Home from './views/home/Home.vue';

import Login from './views/authentication/Login.vue';
import Register from './views/authentication/Register.vue';

import Dashboard from './views/dashboards/Dashboard.vue'

import Survey from './views/data/Survey.vue';
import SurveyOverview from './views/data/SurveyOverview.vue';


let user;

getUser().then((user) => {
    if (user) {
        router.push({path: '/'});
    }
});

function getUser() {
    return Auth.currentAuthenticatedUser().then((data) => {
        if (data && data.signInUserSession) {
            store.commit('setUser', data);
            return data;
        }
    }).catch(() => {
        store.commit('setUser', null);
        return null;
    });
}

Hub.listen("auth", async (data) => {
    if (data.payload.event === 'signOut'){
        user = null;
        store.commit('setUser', null);
        router.push({path: '/login'});
    } else if (data.payload.event === 'signIn') {
        user = await getUser();
        router.push({path: '/'});
    }
});


const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: { requiresAuth: true}
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      hideNavbar: true,
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      hideNavbar: true,
    },
  },
  // { 
  //   name: 'Data',
  //   path: '/data',
  //   component: Data,
  //   children: [
  //     { path: 'export', component: Export },
  //   ],
  //   props: true,
  //   // meta: { requiresAuth: true}
  // },
  {
    name: 'Survey Overview',
    path: '/surveyoverview',
    component: SurveyOverview,
    meta: { requiresAuth: true}
  },
  {
    name: 'Survey',
    path: '/survey',
    component: Survey,
    props: true,
    meta: { requiresAuth: true}
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true}
  },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
 });

router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        user = await getUser();
        if (!user) {
            return next({
                path: '/login'
            });
        }
        return next()
    }
    return next()
});

 export default router;
