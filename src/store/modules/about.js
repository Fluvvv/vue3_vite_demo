import about from '@/api/about.js'

export default {
  namespaced: true,
  state: {
    product_list: []
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.product_list = product
    }
  },
  actions: {
    async findProductList({ commit }, params) {
      // try..catch 需要axios返回后把Code 非200 使用throw Error
      try {
        const { code, message, data } = await about.findProductList()
        if (code === 200) {
          commit('SET_PRODUCT', data)
          console.log(message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async updateProductList({ commit }, { id, value }) {
      try {
        const { code, message, data } = await about.updateProductList(id, value)
        if (code === 200) {
          commit('SET_PRODUCT', data)
          console.log(message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
