import { EmptyQuestion } from "../../store/questionsModule/utils";

const questionsModule = {
  namespaced: true,
  state: () => ({
    iQuestions: 0,

    questions: [new EmptyQuestion()],
  }),
  getters: {
    getIQuestions: ({ iQuestions }) => iQuestions,
    getQuestions: ({ questions }) => questions,
    nQuestions: ({ questions }) => questions.length,
    isAtFirstQuestion: (state, { getIQuestions }) => getIQuestions === 0,
    isAtLastQuestion: (state, { getIQuestions, nQuestions }) =>
      getIQuestions === nQuestions - 1,
    currentQuestion: (state, { getQuestions, getIQuestions }) =>
      getQuestions[getIQuestions],
  },
  mutations: {
    setIQuestions: (state, { payload }) => {
      state.iQuestions = payload;
    },
    incrementIQuestions: (state) => {
      state.iQuestions++;
    },
    decrementIQuestions: (state) => {
      state.iQuestions--;
    },

    setQuestions: (state, { payload }) => {
      state.questions = payload;
    },

    addQuestionAtIndex: (state, { newQuestion, index }) => {
      state.questions.splice(index, 0, newQuestion);
    },
    deleteQuestionAtIndex: (state, { index }) => {
      state.questions.splice(index, 1);
    },
    replaceQuestionAtIndex: (state, { newQuestion, index }) => {
      state.questions.splice(index, 1, newQuestion);
    },
  },
  actions: {
    nextQuestionHandler: ({ commit, getters }, { newQuestion }) => {
      console.log({ newQuestion });
      console.log(getters.getIQuestions);
      commit("replaceQuestionAtIndex", {
        newQuestion,
        index: getters.getIQuestions,
      });
      console.log(getters.getQuestions);
      if (getters.isAtLastQuestion)
        commit("addQuestionAtIndex", {
          newQuestion: new EmptyQuestion(),
          index: getters.getIQuestions + 1,
        });
      commit("incrementIQuestions");
    },
    priorQuestionHandler: ({ commit, getters }, { newQuestion }) => {
      if (getters.isAtFirstQuestion) return;
      commit("replaceQuestionAtIndex", {
        newQuestion,
        index: getters.getIQuestions,
      });
      commit("decrementIQuestions");
      console.log(getters.getQuestions);
    },
    discardQuestionHandler: ({ commit, getters }) => {
      if (getters.isAtLastQuestion) {
        commit("replaceQuestionAtIndex", {
          newQuestion: new EmptyQuestion(),
          index: getters.getIQuestions,
        });
        return;
      }
      commit("deleteQuestionAtIndex", { index: getters.getIQuestions });
    },
    saveQuestionHandler: () => {},
  },
};

export default questionsModule;
