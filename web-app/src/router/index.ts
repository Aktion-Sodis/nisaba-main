// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/login.vue';
import Index from '@/pages/index.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Index,
  }
  // Add other routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;