/** @type {import("vuex").GetterTree<import("./survey.module").SurveyState>} */
const getters = {
  /* READ */
  getSurveys: ({ surveys }, { getFilters }) =>
    surveys
      .filter((s) => {
        let res = true;
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(getFilters)) {
          if (value) res = res && !s[key];
        }
        return res;
      })
      .sort((a, b) => a.id - b.id),
  getLoading: ({ loading }) => loading,
  getFilters: ({ filters }) => filters,

  SURVEYById:
    (_, { getSurveys }) =>
    ({ id }) =>
      getSurveys.find((s) => s.id === id),
};

export default getters;
