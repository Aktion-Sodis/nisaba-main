// src/router/index.ts
import { useConfirm } from 'primevue/useconfirm';
import { createRouter, createWebHistory } from 'vue-router';

import i18n from '@/i18n';
import Index from '@/views/index/Index.vue';
import Interventions from '@/views/interventions/interventions.vue';
import Login from '@/views/login/Login.vue';
import SurveyEditor from '@/views/surveydetail/SurveyDetails.vue';
import { useSurveyDetailStore } from '@/views/surveydetail/surveyDetailStore';
import Umfragen from '@/views/surveys/Surveys.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'BlankLayout',
      i18n_title: 'apps.login.title',
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Index,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.project_structure.title',
    },
  },
  {
    path: '/surveys/overview',
    name: 'Surveys',
    component: Umfragen,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.surveys.title',
    },
  },
  {
    path: '/surveys/editor',
    name: 'Survey Editor',
    component: SurveyEditor,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.surveyeditor.title',
    },
  },
  {
    path: '/interventions',
    name: 'Interventions',
    component: Interventions,
    meta: {
      layout: 'DefaultLayout',
      i18n_title: 'apps.interventions.title',
    },
  },
  // Add other routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for survey editor
router.beforeEach(async (to, from) => {
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
