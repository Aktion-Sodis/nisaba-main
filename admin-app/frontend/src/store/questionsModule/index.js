import { EmptyQuestion, EmptyAnswer } from "../../store/questionsModule/utils";

const questionsModule = {
  namespaced: true,
  state: () => ({
    iQuestions: 0,
    questions: [new EmptyQuestion()],
    answers: [[new EmptyAnswer()]],
  }),
  getters: {
    /* The getters with the prefix "get-" are the only ones with a direct access to the state. */
    /* The other should use them instead of the state itself for avoiding side effects. */
    getIQuestions: ({ iQuestions }) => iQuestions,
    getQuestions: ({ questions }) => questions,
    getAnswers: ({ answers }) => answers,

    questionsWithAnswers: (state, { getQuestions, getAnswers }) =>
      getQuestions.map((q, i) => ({ ...q, answers: getAnswers[i] })),
    nQuestions: (state, { getQuestions }) => getQuestions.length,
    isAtFirstQuestion: (state, { getIQuestions }) => getIQuestions === 0,
    isAtLastQuestion: (state, { getIQuestions, nQuestions }) =>
      getIQuestions === nQuestions - 1,

    currentQuestion: (state, { getQuestions, getIQuestions }) =>
      getQuestions[getIQuestions],

    currentAnswers: (state, { getAnswers, getIQuestions }) => {
      return getAnswers[getIQuestions];
    },

    currentQuestionWithAnswers: (
      state,
      { getAnswers, getQuestions, getIQuestions }
    ) => ({
      ...getQuestions[getIQuestions],
      answers: getAnswers[getIQuestions],
    }),
  },
  mutations: {
    /* INDEX OPERATIONS */
    setIQuestions: (state, { payload }) => {
      state.iQuestions = payload;
    },
    incrementIQuestions: (state) => {
      state.iQuestions++;
    },
    decrementIQuestions: (state) => {
      state.iQuestions--;
    },

    /* QUESTION & ANSWER BULK UPDATE */
    setQuestions: (state, { payload }) => {
      state.questions = payload;
    },
    setAnswers: (state, { payload }) => {
      state.answers = payload;
    },

    /* QUESTION CREATE, UPDATE, DELETE */
    addQuestionAtIndex: (state, { newQuestion, index }) => {
      state.questions.splice(index, 0, newQuestion);
    },
    replaceQuestionAtIndex: (state, { newQuestion, index }) => {
      state.questions.splice(index, 1, newQuestion);
    },
    deleteQuestionAtIndex: (state, { index }) => {
      state.questions.splice(index, 1);
    },

    /* ANSWER CREATE, UPDATE, DELETE */
    addAnswerAtIndex: (state, { newAnswers, index }) => {
      state.answers.splice(index, 0, newAnswers);
    },
    replaceAnswerAtIndex: (state, { newAnswers, index }) => {
      state.answers.splice(index, 1, newAnswers);
    },
    deleteAnswerAtIndex: (state, { index }) => {
      state.answers.splice(index, 1);
    },
  },
  actions: {
    nextQuestionHandler: ({ commit, getters }, { newQuestion, newAnswers }) => {
      commit("replaceQuestionAtIndex", {
        newQuestion,
        index: getters.getIQuestions,
      });
      commit("replaceAnswerAtIndex", {
        newAnswers,
        index: getters.getIAnswers,
      });
      if (getters.isAtLastQuestion) {
        commit("addQuestionAtIndex", {
          newQuestion: new EmptyQuestion(),
          index: getters.getIQuestions + 1,
        });
        commit("addAnswerAtIndex", {
          newAnswers: [new EmptyAnswer()],
          index: getters.getIQuestions + 1,
        });
      }
      commit("incrementIQuestions");
    },
    priorQuestionHandler: (
      { commit, getters },
      { newQuestion, newAnswers }
    ) => {
      if (getters.isAtFirstQuestion) return;
      commit("replaceQuestionAtIndex", {
        newQuestion,
        index: getters.getIQuestions,
      });
      commit("replaceAnswerAtIndex", {
        newAnswers,
        index: getters.getIQuestions,
      });
      commit("decrementIQuestions");
    },
    discardQuestionHandler: ({ commit, getters }) => {
      if (getters.isAtLastQuestion) {
        commit("replaceQuestionAtIndex", {
          newQuestion: new EmptyQuestion(),
          index: getters.getIQuestions,
        });
        commit("replaceAnswerAtIndex", {
          newAnswers: [new EmptyAnswer()],
          index: getters.getIQuestions,
        });
        return;
      }
      commit("deleteQuestionAtIndex", { index: getters.getIQuestions });
      commit("deleteAnswerAtIndex", { index: getters.getIQuestions });
    },
    saveQuestionHandler: ({ commit, getters }, { newQuestion, newAnswers }) => {
      commit("replaceQuestionAtIndex", {
        newQuestion,
        index: getters.getIQuestions,
      });
      commit("replaceAnswerAtIndex", {
        newAnswers,
        index: getters.getIQuestions,
      });
      if (getters.isAtLastQuestion) {
        commit("addQuestionAtIndex", {
          newQuestion: new EmptyQuestion(),
          index: getters.getIQuestions + 1,
        });
        commit("addAnswerAtIndex", {
          newAnswers: [new EmptyAnswer()],
          index: getters.getIQuestions + 1,
        });
        commit("incrementIQuestions");
      }
    },
  },
};

export default questionsModule;
