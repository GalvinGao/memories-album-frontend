export default {
  namespaced: true,
  state: {
    language: null
  },
  mutations: {
    changeLocale(state, newLocale) {
      state.language = newLocale
    },
  },
  getters: {
    language: state => state.language,
  }
};