/** @type {import("vuex").MutationTree<import("./survey.module").SurveyState>} */
const mutations = {
  addSurvey: (state, survey) => {
    state.surveys.push(survey);
  },
  replaceSurvey: (state, survey) => {
    state.surveys.splice(
      state.surveys.findIndex((i) => i.id === survey.id),
      1,
      survey,
    );
  },
  deleteSurvey: (state, { id }) => {
    state.surveys.splice(
      Array.from(state.surveys).findIndex((i) => i.id === id),
      1,
    );
  },
  setLoading: (state, { newValue }) => {
    state.loading = newValue;
  },
  setSurveys: (state, { newValue }) => {
    state.surveys = newValue;
  },
  setFilter: (state, { filter, newValue }) => {
    state.filters[filter] = newValue;
  },
};

export default mutations;
