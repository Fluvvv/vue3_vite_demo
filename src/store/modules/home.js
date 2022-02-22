export default {
  namespaced: true,
  state: {
    name: 'vue',
    heroList: []
  },
  mutations: {
    SET_NAME(state, name) {
      state.name = name
    },
    SET_HREOLIST(state, list) {
      state.heroList = list
    }
  },
  actions: {}
}
