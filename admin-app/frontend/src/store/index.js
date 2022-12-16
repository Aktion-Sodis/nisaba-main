import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import i18n from '../i18n';

// import modules
import authModule from './modules/auth';
import userModule from './modules/user';
import interventionsData from './modules/interventionData';
import survey from './modules/survey';
import QUESTION_UI from './modules/questionUI';
import FEEDBACK_UI from './modules/feedbackUI';
// eslint-disable-next-line
import levelsData from './modules/levelData';
import entitiesData from './modules/entity';
import dataModal from './modules/dataModal';
import SYNC_UI from './modules/syncUI';
import { vuexModulesDict } from '../lib/constants';
import { deriveFilePath } from '../lib/utils';
import organizationModule from './modules/organization';

// persist
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: [vuexModulesDict.auth, vuexModulesDict.organization],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creatingEntityInLevelId: null,
    surveyModalCompletionIndex: 1,
  },
  getters: {
    getCreatingEntityInLevelId: ({ creatingEntityInLevelId }) => creatingEntityInLevelId,
    getSurveyModalCompletionIndex: ({ surveyModalCompletionIndex }) => surveyModalCompletionIndex,

    // NOTE: You probably will never need the following two getters. Use the latter two instead, since they are based on these two!
    fallbackLocaleIndex: () => i18n.availableLocales.findIndex((l) => l === i18n.fallbackLocale),
    uiLocaleIndex: () => i18n.availableLocales.findIndex((l) => l === i18n.locale),

    calculateLocalizedString:
      (_, { fallbackLocaleIndex }) =>
      ({ languageTexts }) =>
        languageTexts[fallbackLocaleIndex] || i18n.t('general.noTextProvided'),

    // For the localization, you will most probably only need this getter and no other! Please don't consider using the others.
    calculateUILocaleString:
      (_, { uiLocaleIndex, calculateLocalizedString }) =>
      ({ languageTexts }) =>
        languageTexts[uiLocaleIndex] || calculateLocalizedString({ languageTexts }),

    calculateIndexByLocale:
      () =>
      ({ locale }) =>
        i18n.availableLocales.findIndex((l) => l === locale),

    callDeriveFilePathWithOrganizationId:
      (state, getters, rootState, rootGetters) => (arg1, arg2) => {
        const organizationId = rootGetters[`${vuexModulesDict.auth}/getOrganizationId`];
        console.log(organizationId);
        return deriveFilePath(organizationId, arg1, arg2);
      },
  },
  mutations: {
    setCreatingEntityInLevelId: (state, { id }) => {
      state.creatingEntityInLevelId = id;
    },
    incrementSurveyModalCompletionIndex: (state) => {
      state.surveyModalCompletionIndex += 1;
    },
    decrementSurveyModalCompletionIndex: (state) => {
      state.surveyModalCompletionIndex -= 1;
    },
    setSurveyModalCompletionIndex: (state, { newValue }) => {
      state.surveyModalCompletionIndex = newValue;
    },
  },
  modules: {
    [vuexModulesDict.auth]: authModule,
    [vuexModulesDict.dataModal]: dataModal,
    [vuexModulesDict.entity]: entitiesData,
    [vuexModulesDict.survey]: survey,
    [vuexModulesDict.level]: levelsData,
    [vuexModulesDict.intervention]: interventionsData,
    [vuexModulesDict.question]: QUESTION_UI,
    [vuexModulesDict.feedback]: FEEDBACK_UI,
    [vuexModulesDict.sync]: SYNC_UI,
    [vuexModulesDict.user]: userModule,
    [vuexModulesDict.organization]: organizationModule,
  },
  plugins: [vuexLocal.plugin],
});
