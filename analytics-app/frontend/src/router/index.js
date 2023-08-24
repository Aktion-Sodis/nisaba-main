import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/store/authentication';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: false},
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'surveys',
        name: 'Surveys',
        component: () => import('@/pages/surveys.vue'),
      },
      {
        path: 'maps',
        name: 'Maps',
        component: () => import('@/pages/maps.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      // {
      //   path: '/:pathMatch(.*)*',
      //   component: () => import('../pages/[...all].vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from, next) => {  
  const authStore = useAuthStore();
  console.log(authStore.isLoggedIn)
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({
        path: '/login'
    });
  }
  return next()
})

export default router
