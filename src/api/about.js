export default {
  async findProductList() {
    return new Promise((res) => {
      // 模拟API请求返回
      setTimeout(() => {
        res({
          code: 200,
          message: 'ok',
          data: [1, 2, 3]
        })
      }, 1000)
    })
  },
  async updateProductList(id, value) {
    console.log(id, value)
    // 模拟API请求返回
    return new Promise((res) => {
      setTimeout(() => {
        res({
          code: 200,
          message: 'ok',
          data: [1, 2, 3, 4]
        })
      }, 1000)
    })
  },
  async findCount() {
    return new Promise((res) => {
      // 模拟API请求返回
      setTimeout(() => {
        res({
          code: 200,
          message: 'ok',
          data: 10000
        })
      }, 1000)
    })
  },
  async updateCount(count) {
    // 模拟API请求返回
    return new Promise((res) => {
      setTimeout(() => {
        res({
          code: 200,
          message: 'ok',
          data: count
        })
      }, 1000)
    })
  }
}
