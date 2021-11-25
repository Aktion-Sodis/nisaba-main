const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
  }),
  mutations: {
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {},
  getters: { getIsAuthenticated: (state) => state.isAuthenticated },
};

export default authModule;
