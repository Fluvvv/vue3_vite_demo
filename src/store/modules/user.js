import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const { account, password } = userInfo

    const res = await new Promise((res) => {
      // 模拟API请求返回
      setTimeout(() => {
        res({
          code: 200,
          message: 'ok',
          token: 'asdas1d231qw3e132asd156qw1d'
        })
      }, 1000)
    })
    commit('SET_TOKEN', res.token)
    setToken(res.token)
  },
  async getInfo({ commit, state }) {
    const res = await new Promise((res) => {
      // 模拟API请求返回
      setTimeout(() => {
        res({
          name: '樊继权',
          type: 'admin',
          id: 16
        })
      }, 1000)
    })
    commit('SET_USERINFO', res)
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
