const Cookies = require('js-cookie')

export default {
  state: () => ({
    auth: false,
    email: null,
    toolkitOpen: false,
  }),
  mutations: {
    setAuth(state, status) {
      state.auth = status
    },
    setEmail(state, email) {
      state.email = email
    },
    setToolkitOpen(state, status) {
      state.toolkitOpen = status
    }
  },
  actions: {
    login({ commit }, { email }) {
      Cookies.set('janiculum-user', email)
      commit('setEmail', email)
      commit('setAuth', true)
    },
    logout({ commit }) {
      Cookies.remove('janiculum-user')
      commit('setEmail', null)
      commit('setAuth', false)
    },
    toggleToolkit({ commit, state }) {
      commit('setToolkitOpen', !state.toolkitOpen)
    }
  }
}
