/** @type {import("vuex").GetterTree<import("./survey.module").SurveyState>} */
const getters = {
  /* READ */
  getTags: ({ tags }) => tags,
  getTagRelations: ({ tagRelations }) => tagRelations,
  getSurveys: ({ surveys }, { getFilters, getTagRelations }) =>
    surveys
      .filter((s) => {
        let res = true;
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(getFilters)) {
          if (value) res = res && !s[key];
        }
        return res;
      })
      .map((s) => ({
        ...s,
        tags: getTagRelations.filter((tr) => tr.surveyId === s.id),
      }))
      .sort((a, b) => a.id - b.id),
  getLoading: ({ loading }) => loading,
  getFilters: ({ filters }) => filters,
  getShowContinue: ({ showContinue }) => showContinue,

  SURVEYById:
    (_, { getSurveys }) =>
    ({ id }) =>
      getSurveys.find((s) => s.id === id),
};

export default getters;
