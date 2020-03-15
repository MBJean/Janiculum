const Cookies = require('js-cookie')

export default {
  state: () => ({
    auth: false,
    email: null
  }),
  mutations: {
    setAuth(state, status) {
      state.auth = status
    },
    setEmail(state, email) {
      state.email = email
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
    }
  }
}
