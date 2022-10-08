import state from './entity.module.state';
import getters from './entity.module.getters';
import mutations from './entity.module.mutations';
import actions from './entity.module.actions';

/** @type {import("vuex").Module<import('./entity.module').EntityState>} */
const entity = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default entity;
