// src/router/index.ts
import { useConfirm } from 'primevue/useconfirm';
import { createRouter, createWebHistory } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import i18n from '@/i18n';
import Index from '@/views/index/Index.vue';
import Interventions from '@/views/interventions/interventions.vue';
import Login from '@/views/login/Login.vue';
import SurveyEditor from '@/views/surveydetail/SurveyDetails.vue';
import { useSurveyDetailStore } from '@/views/surveydetail/surveyDetailStore';
import Umfragen from '@/views/surveys/Surveys.vue';
import UserManagement from '@/views/usermanagement/UserManagement.vue';
import { UserGroup, hasRights } from '@/types/UserGroup';
import { useAuthStore, AuthenticationState } from '@/stores/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'BlankLayout',
      i18n_title: 'apps.login.title',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Index,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.project_structure.title',
      requiresAuth: true,
    },
  },
  {
    path: '/surveys/overview',
    name: 'Surveys',
    component: Umfragen,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.surveys.title',
      requiresAuth: true,
      minRole: UserGroup.ADMIN
    },
  },
  {
    path: '/surveys/editor',
    name: 'Survey Editor',
    component: SurveyEditor,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.surveyeditor.title',
      requiresAuth: true,
      minRole: UserGroup.ADMIN
    },
  },
  {
    path: '/interventions',
    name: 'Interventions',
    component: Interventions,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.interventions.title',
      requiresAuth: true,
      minRole: UserGroup.ADMIN
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: UserManagement,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.apps.users.title',
      requiresAuth: true,
      minRole: UserGroup.ADMIN
    },
  },
  // Add other routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for survey editor and auth checks
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const toast = useToast();

  // Check authentication
  if (to.meta.requiresAuth && authStore.authenticationState !== AuthenticationState.LoggedIn) {
    toast.add({
      severity: 'warning',
      summary: i18n.global.t('utils.auth.not_authenticated.title'),
      detail: i18n.global.t('utils.auth.not_authenticated.detail'),
      life: 5000
    });
    return { path: '/login' };
  }

  // Check authorization
  if (to.meta.minRole && authStore.highestRole) {
    if (!hasRights(authStore.highestRole, to.meta.minRole as UserGroup)) {
      toast.add({
        severity: 'warning',
        summary: i18n.global.t('utils.auth.not_authorized.title'),
        detail: i18n.global.t('utils.auth.not_authorized.detail', {
          role: to.meta.minRole,
          page: i18n.global.t(to.meta.i18n_title as string)
        }),
        life: 5000
      });
      return { path: '/' };
    }
  }

  // Only check when navigating away from survey editor
  if (from.path === '/surveys/editor') {
    const surveyDetailStore = useSurveyDetailStore();

    // If there are unsaved changes, show confirmation dialog
    if (surveyDetailStore.survey && surveyDetailStore.unsavedChangesAvailable) {
      const confirm = useConfirm();

      return new Promise((resolve) => {
        confirm.require({
          message: i18n.global.t('surveydetails.navigation_guard.message'),
          header: i18n.global.t('surveydetails.navigation_guard.title'),
          icon: 'pi pi-exclamation-triangle',
          acceptProps: {
            label: i18n.global.t('surveydetails.navigation_guard.accept'),
            icon: 'pi pi-sign-out',
            severity: 'danger',
          },
          rejectProps: {
            label: i18n.global.t('surveydetails.navigation_guard.reject'),
            severity: 'secondary',
            outlined: true,
          },
          accept: () => {
            resolve(true);
          },
          reject: () => {
            resolve(false);
          },
        });
      });
    }
  }
  return true;
});

export default router;
