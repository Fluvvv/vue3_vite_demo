import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'
import store from '@/store'

const baseURL = import.meta.env.VITE_VUE_APP_ENV
console.log(baseURL)
// 创建axios实例
const service = axios.create({
  baseURL: baseURL // api 的 base_url
  // timeout: 20000 // 请求超时时间
})

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem('token') || ''
    config.headers['Access_Token'] = token ? token : ''
    config.headers.post['Content-Type'] = 'application/json'
    config.headers['Platform'] = 'WEB' // 请求头确认当前平台
    config.headers['userId'] = sessionStorage.getItem('userId') || ''
    //  config.headers['Timestamp'] = new Date().getTime() // 请求头确认当前平台
    config.headers['userType'] = sessionStorage.getItem('userType') || ''
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status && res.status !== 200) {
      return Promise.reject(res)
    } else {
      return Promise.resolve(res)
    }
  },
  (error) => {
    console.log(error.response)
    switch (error.response.status) {
      case 500:
        if (error.response.data.code === 401) {
          if (sessionStorage.getItem('token')) {
            ElMessage.error('登录超时请重新登录!')
          }
          store.commit('SET_USERINFO', {})
          store.commit('set_systemDictInfo', {})
          store.commit('set_dictTreeInfo', {})
          store.commit('SAVE_TREE', {})
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('systemType')
          sessionStorage.removeItem('treeInfo')
          sessionStorage.removeItem('vuex')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          window.sessionStorage.clear()
        } else if (error.response.data.code === 603) {
          if (sessionStorage.getItem('token')) {
            ElMessage.error('当前账号密码已变更，请重新登录!')
          }
          store.commit('SET_USERINFO', {})
          store.commit('set_systemDictInfo', {})
          store.commit('set_dictTreeInfo', {})
          store.commit('SAVE_TREE', {})
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('systemType')
          sessionStorage.removeItem('treeInfo')
          sessionStorage.removeItem('vuex')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          window.sessionStorage.clear()
        } else {
          ElMessage.error(error.response.data.message)
          return Promise.reject(error.response.data)
        }
        break
      default:
        ElMessage.error(error.response.data.message)
        break
    }
    return Promise.reject(error)
  }
)
export default service
