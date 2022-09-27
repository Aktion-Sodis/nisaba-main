/** @type {import("./survey.module").SurveyState} */
const state = {
  surveys: [],
  loading: false,
  filters: {
    _deleted: true,
    archived: true,
  },
};

export default state;
