import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

// import modules
import authModule from "./authModule";
import entitiesModule from "./entitiesModule";
import organizationStructureModule from "./organizationStructureModule";
import interventionsModule from "./interventionsModule";
import interventionsGUIModule from "./interventionsGUIModule";
import surveysModule from "./surveysModule";

// persist
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["auth"],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineColors: ["green", "orange", "blue", "red", "yellow", "purple"],
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
    iv: interventionsModule,
    ivGui: interventionsGUIModule,
    surveys: surveysModule,
  },
  plugins: [vuexLocal.plugin],
});
