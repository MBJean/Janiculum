export default {
  state: () => ({
    visibleEntry: null
  }),
  mutations: {
    setVisibleEntry(state, entry) {
      state.visibleEntry = entry;
    }
  },
  actions: {
  }
}
