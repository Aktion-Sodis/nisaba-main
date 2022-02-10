import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// import modules
import authModule from './authModule';
import entitiesModule from './entitiesModule';
import organizationStructureModule from './organizationStructureModule';
import interventionsGUIModule from './interventionsGUIModule';

import interventionsData from './interventions/data';
import interventionsUI from './interventions/ui';
import surveysData from './survey/data';
import surveysUI from './survey/ui';
import questionsUI from './questions/ui';

// persist
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineColors: ['green', 'orange', 'blue', 'red', 'yellow', 'purple'],
  },
  getters: {
    getLineColors: (state) => state.lineColors,
  },
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    entities: entitiesModule,
    os: organizationStructureModule,
    ivGui: interventionsGUIModule,
    interventionsData,
    interventionsUI,
    surveysData,
    surveysUI,
    questionsUI,
  },
  plugins: [vuexLocal.plugin],
});
