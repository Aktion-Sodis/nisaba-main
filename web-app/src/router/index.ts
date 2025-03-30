// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/Login.vue';
import Index from '@/views/index/Index.vue';

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
  }
  // Add other routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;