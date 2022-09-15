const UserAuthantication = {
    state: () => ({
        user: null,
    }),
    mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  getters: {
    isSignIn: (state) => {
      return state.user !== null
    },
  },
  actions: {
  },
  modules: {
  }
}

export default UserAuthantication;