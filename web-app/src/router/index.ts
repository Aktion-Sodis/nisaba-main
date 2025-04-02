// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/Login.vue';
import Index from '@/views/index/Index.vue';
import Umfragen from '@/views/surveys/Surveys.vue';


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'BlankLayout',
      i18n_title: 'apps.login.title'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Index,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.project_structure.title'
    }
  },
  {
    path: '/surveys',
    name: 'Surveys',
    component: Umfragen,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.surveys.title',
    },
  },
  // Add other routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;