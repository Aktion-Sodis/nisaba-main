import { v4 as uuidv4 } from 'uuid';

const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    token: null,
    userId: null,
    email: null,
    firstName: null,
    lastName: null,

  }),
  getters: {
    getIsAuthenticated: ({ isAuthenticated }) => isAuthenticated,
    getToken: ({ token }) => token,
    getUserId: ({ userId }) => userId,
    getEmail: ({ email }) => email,
    getFirstName: ({ firstName }) => firstName,
    getLastName: ({ lastName }) => lastName,

    credentials: (_, {
      getUserId, getEmail, getUsername, getFirstname, getLastname,
    }) => ({
      userId: getUserId,
      email: getEmail,
      firstName: getFirstName,
      lastName: getLastName,
    }),
  },
  mutations: {
    setIsAuthenticated(state, { newValue }) {
      state.isAuthenticated = newValue;
    },
    setCredentials(state, {
      userId, email, firstName, lastName,
    }) {
      state.userId = userId;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    setToken(state, { newToken }) {
      state.token = newToken;
    },
  },
  actions: {
    signIn({ commit }, { credentials }) {
      // TODO: Here an API call to fetch user information & authentication
      // const password = payload.password;
      // const persistSession = payload.rememberMe;

      commit('setCredentials', {
        newCredentials: {
          userId: uuidv4(),
          email: 'dummy@mail.com',
          username: credentials.username,
          firstname: 'Ahmet',
          lastname: 'Polat',
        },
      });
      commit('setToken', { newToken: uuidv4() });
      commit('setIsAuthenticated', { newValue: true });
    },
    deleteSession({ commit }) {
      // TODO: Here an API call to fetch user information & authentication
      // const password = payload.password;
      // const persistSession = payload.rememberMe;

      commit('setCredentials', {
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
      });
      commit('deleteRouteActivity');
      commit('setToken', { newToken: null });
      commit('setIsAuthenticated', { newValue: false });
    },
  },
};

export default authModule;
