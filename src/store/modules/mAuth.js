const mAuth = {
  namespaced: true,
  state: { isAuthenticated: false, name: "", email: "", role: "" },
  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getRole: (state) => state.role,
    getAuth: (state) => state.isAuthenticated,
  },
  mutations: {
    changeAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.name = payload.name;
      state.email = payload.email;
      state.role = payload.role;
    },
  },
  actions: {},
  modules: {},
};

export default mAuth;
