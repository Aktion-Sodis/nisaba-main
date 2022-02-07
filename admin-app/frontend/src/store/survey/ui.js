import { v4 as uuidv4 } from 'uuid';
import { EmptySurvey, Survey } from './utils';
import { modalModesDict } from '../constants';

const surveysUI = {
  namespaced: true,
  state: () => ({
    surveyDraft: new EmptySurvey(),

    surveyIdInFocus: null,
    isSurveyModalDisplayed: false,
    surveyModalMode: modalModesDict.read,
    surveyModalCompletionIndex: 0,
    loading: false,
  }),
  getters: {
    /* READ */
    getSurveyIdInFocus: ({ surveyIdInFocus }) => surveyIdInFocus,
    getIsSurveyModalDisplayed: ({ isSurveyModalDisplayed }) => isSurveyModalDisplayed,
    getSurveyModalMode: ({ surveyModalMode }) => surveyModalMode,
    getSurveyModalCompletionIndex: ({ surveyModalCompletionIndex }) => surveyModalCompletionIndex,
    getSurveyDraft: ({ surveyDraft }) => surveyDraft,
    getLoading: ({ loading }) => loading,
    surveyInFocus: (state, { getSurveyIdInFocus }, rootState, rootGetters) => getSurveyIdInFocus && (rootGetters['surveysData/surveyById'](getSurveyIdInFocus) ?? null),
    surveyNameInFocus: (_, { surveyIdInFocus }) => surveyIdInFocus?.name ?? '',
    tagsInFocus: (state, { surveyInFocus }, rootState, rootGetters) => (surveyInFocus && surveyInFocus.tags.map((t) => rootGetters['surveysData/tagById'](t))) ?? [],
  },
  mutations: {
    /* CREATE, UPDATE, DELETE */
    setSurveyIdInFocus: (state, { newValue }) => {
      state.surveyIdInFocus = newValue;
    },
    setIsSurveyModalDisplayed: (state, { newValue }) => {
      state.isSurveyModalDisplayed = newValue;
    },
    setSurveyModalMode: (state, { newValue }) => {
      state.surveyModalMode = newValue;
    },
    setSurveyModalCompletionIndex: (state, { newValue }) => {
      state.surveyModalCompletionIndex = newValue;
    },
    incrementSurveyModalCompletionIndex: (state) => {
      state.surveyModalCompletionIndex += 1;
    },
    decrementSurveyModalCompletionIndex: (state) => {
      state.surveyModalCompletionIndex -= 1;
    },
    setLoading: (state, { newValue }) => {
      state.loading = newValue;
    },
    setSurveyDraft: (
      state,
      {
        surveyId, name, description, tags, type, questions, creationDate, lastEditDate,
      },
    ) => {
      state.surveyDraft = new Survey({
        surveyId: surveyId ?? uuidv4(),
        name: name ?? '',
        description: description ?? '',
        type: type ?? 'Default',
        tags: tags ?? [],
        questions: questions ?? [],
        creationDate: creationDate ?? Date.now(),
        lastEditDate: lastEditDate ?? null,
      });
    },
    resetSurveyDraft: (state) => {
      state.surveyDraft = new EmptySurvey();
    },
  },
  actions: {
    readSurveyHandler: ({ commit }, { surveyId }) => {
      commit('setSurveyModalMode', { newValue: modalModesDict.read });
      commit('setSurveyModalCompletionIndex', { newValue: 1 });
      commit('setSurveyIdInFocus', { newValue: surveyId });
      commit('setIsSurveyModalDisplayed', { newValue: true });
    },
    abortReadSurveyHandler: ({ commit }) => {
      commit('setIsSurveyModalDisplayed', { newValue: false });
      commit('setSurveyIdInFocus', { newValue: null });
      commit('setSurveyModalCompletionIndex', { newValue: 0 });
    },
    newSurveyHandler: ({ commit }) => {
      commit('setSurveyModalMode', { newValue: modalModesDict.create });
      commit('setSurveyIdInFocus', { newValue: null });
      commit('resetSurveyDraft');
      commit('setSurveyModalCompletionIndex', { newValue: 1 });
      commit('setIsSurveyModalDisplayed', { newValue: true });
    },
    abortNewSurveyHandler: ({ commit }) => {
      commit('setIsSurveyModalDisplayed', { newValue: false });
      commit('setSurveyModalCompletionIndex', { newValue: 0 });
      commit('resetSurveyDraft');
      commit('setSurveyModalMode', { newValue: modalModesDict.read });
    },
    editSurveyHandler: ({ commit, rootGetters }, { surveyId }) => {
      commit('setSurveyModalMode', { newValue: modalModesDict.edit });
      commit('setSurveyIdInFocus', { newValue: surveyId });
      const survey = rootGetters['surveysData/surveyById']({ surveyId });
      commit('resetSurveyDraft', survey);
      commit('setSurveyModalCompletionIndex', { newValue: 1 });
      commit('setIsSurveyModalDisplayed', { newValue: true });
    },
    abortEditSurveyHandler: ({ commit }) => {
      commit('setIsSurveyModalDisplayed', { newValue: false });
      commit('setSurveyModalCompletionIndex', { newValue: 0 });
      commit('resetSurveyDraft');
      commit('setSurveyIdInFocus', { newValue: null });
      commit('setSurveyModalMode', { newValue: modalModesDict.read });
    },

    saveSurveyHandler: async ({ commit, dispatch, getters }) => {
      if (getters.getSurveyModalMode === modalModesDict.read) return;
      commit('setLoading', { newValue: true });
      const surveyDraft = getters.getSurveyDraft;
      if (getters.getSurveyModalMode === modalModesDict.create) {
        // 1. POST this in the ./data.js
        // 2. Await the response DB object
        // 3. Put the response DB object to surveys
        const createdSurvey = await dispatch('surveysData/APIpostNewSurvey', surveyDraft, {
          root: true,
        });
        commit('surveysData/addSurvey', createdSurvey, { root: true });
        commit('setSurveyIdInFocus', { newValue: createdSurvey.surveyId });
        commit('setSurveyModalMode', { newValue: modalModesDict.read });
        commit('setLoading', { newValue: false });
      }
    },

    publishSurveyHandler: () => {},
  },
};

export default surveysUI;
