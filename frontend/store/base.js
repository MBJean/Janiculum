export default {
  state: () => ({
    authenticated: false,
  }),
  mutations: {
    setAuthenticated(state, status) {
      state.authenticated = status;
    },
  },
  actions: {
  }
}
