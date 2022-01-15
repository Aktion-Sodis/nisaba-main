import { v4 as uuidv4 } from "uuid";

const surveysModule = {
  namespaced: true,
  state: () => ({
    surveys: [
      {
        surveyId: "6a13dbb7-7cc3-45d7-99e9-a6f764156fc6",
        executorUserId: "8b581940-57f3-40bf-b565-ade356009476",
        description: "Just some survey",
        type: "Initial",
        questionIds: [],
        creationDate: 1641335580514,
        lastEditDate: null,
        tags: ["c3089035-a6c7-417f-bed5-6a2d4ba44ec6"],
      },
    ],
    questions: [
      {
        questionId: "541bbca9-f76e-4736-9a12-8dbdd3bfbf39",
        text: "Hello, how are you?",
        type: "MultipleChoice",
        questionOptions: [],
        followingQuestionId: "7740fe45-cc18-464b-872b-1c50d4937174",
      },
      {
        questionId: "7740fe45-cc18-464b-872b-1c50d4937174",
        text: "Hello, What's your name?",
        type: "TextField",
        questionOptions: [],
        followingQuestionId: null,
      },
    ],
    surveyTags: [
      { tagId: "c3089035-a6c7-417f-bed5-6a2d4ba44ec6", name: "Some tag" },
    ],
  }),
  getters: {
    /* READ */
    getSurveys: (state) => state.surveys,
    getSurveyById: (state, getters) => (surveyId) =>
      getters.getSurveys.find((e) => e.surveyId === surveyId),

    getQuestions: (state) => state.questions,
    getQuestionById: (state, getters) => (questionId) =>
      getters.getQuestions.find((q) => q.questionId === questionId),

    getAllOptionsByQuestionId: (state, getters) => (questionId) =>
      getters.getQuestionById(questionId).options,
    getOptionById: (state, getters) => (questionId, optionId) =>
      getters
        .getQuestionById(questionId)
        .options.find((o) => o.optionId === optionId),

    getSurveyTags: (state) => state.surveyTags,
    getSurveyTagById: (state, getters) => (tagId) =>
      getters.getSurveyTags.find((e) => e.tagId === tagId),
  },
  mutations: {
    /* CREATE, UPDATE, DELETE */
    addSurvey: (state, { executorUserId, description, type, questionIds }) => {
      state.surveys = [
        ...state.surveys,
        {
          surveyId: uuidv4(),
          executorUserId,
          description,
          type,
          questionIds,
          creationDate: Date.now(),
          lastEditDate: null,
        },
      ];
    },
    replaceSurvey: (
      state,
      { surveyId, executorUserId, description, type, questionIds }
    ) => {
      state.surveys = state.surveys.map((s) =>
        s.surveyId === surveyId
          ? {
              ...s,
              surveyId,
              executorUserId,
              description,
              type,
              questionIds,
            }
          : s
      );
    },
    deleteSurvey: (state, surveyId) => {
      state.surveys = state.surveys.filter((s) => s.surveyId !== surveyId);
    },
  },
  actions: {},
};

export default surveysModule;
