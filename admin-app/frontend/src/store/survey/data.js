import { Survey } from './utils';

const surveysData = {
  namespaced: true,
  state: () => ({
    surveys: [
      {
        surveyId: '6a13dbb7-7cc3-45d7-99e9-a6f764156fc6',
        name: 'My survey',
        description: 'Just some survey',
        type: 'Initial',
        questions: [],
        creationDate: 1641335580514,
        lastEditDate: null,
        tags: ['c3089035-a6c7-417f-bed5-6a2d4ba44ec6'],
      },
    ],
    surveyTags: [{ tagId: 'c3089035-a6c7-417f-bed5-6a2d4ba44ec6', name: 'Some tag' }],
  }),
  getters: {
    /* READ */
    getSurveys: ({ surveys }) => surveys,
    getSurveyTags: ({ surveyTags }) => surveyTags,

    surveyById:
      (_, { getSurveys }) => ({ surveyId }) => getSurveys.find((s) => s.surveyId === surveyId),
    tagById:
      (_, { getSurveyTags }) => ({ tagId }) => getSurveyTags.find((t) => t.tagId === tagId),
  },
  mutations: {
    addSurvey: (
      state,
      {
        surveyId, name, description, type, questions, creationDate, lastEditDate,
      },
    ) => {
      state.surveys.push(
        new Survey({
          surveyId,
          name,
          description,
          type,
          questions,
          creationDate,
          lastEditDate,
        }),
      );
    },
    replaceSurvey: (
      state,
      {
        surveyId, name, description, type, questions, creationDate, lastEditDate,
      },
    ) => {
      state.surveys = state.surveys.map((s) => (s.surveyId === surveyId
        ? {
          ...s,
          surveyId,
          name,
          description,
          type,
          questions,
          creationDate,
          lastEditDate,
        }
        : s));
    },
    deleteSurvey: (state, surveyId) => {
      state.surveys = state.surveys.filter((s) => s.surveyId !== surveyId);
    },
  },
  actions: {
    // APIpostNewSurvey: async ({ commit }) => {},
    // APIputSurvey: async ({ commit }) => {},
    // APIgetNewSurvey: async ({ commit }) => {},
  },
};

export default surveysData;
