import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/home/Home.vue';

import Login from './views/login/Login.vue';

import Dashboard from './views/dashboards/Dashboard.vue'

import Survey from './views/data/Survey.vue';
import Filter from './views/data/Filter.vue';



export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
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
    name: 'Filter',
    path: '/filter',
    component: Filter,
  },
  {
    name: 'Survey',
    path: '/survey',
    component: Survey,
    props: true,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
