import state from './survey.module.state';
import getters from './survey.module.getters';
import mutations from './survey.module.mutations';
import actions from './survey.module.actions';

/** @type {import("vuex").Module<import('./survey.module').SurveyState>} */
const survey = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default survey;
