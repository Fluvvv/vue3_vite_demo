import router, { asyncRoutes, constantRoutes } from '@/router/index.js'
import Layout from '@/components/Layout/index.vue'
const modules = import.meta.glob('../../views/**/**.vue')
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menudata) {
    return new Promise((resolve) => {
      const tree = [
        {
          menuName: '首页父',
          icon: 'dashboard',
          name: 'dashboard',
          path: '/dashboard',
          hidden: false,
          children: [
            {
              menuName: '首页子',
              icon: 'analyse',
              name: 'analyse',
              path: '/analyse',
              component: 'dashboard',
              redirect: '',
              hidden: false
            }
          ]
        },
        {
          menuName: '驾驶舱',
          icon: 'cockpit',
          name: 'cockpit',
          path: '/cockpit',
          hidden: false,
          children: [
            {
              menuName: '我的',
              icon: 'home',
              name: 'home',
              path: '/home',
              component: 'Cockpit/Home',
              hidden: false
            },
            {
              menuName: '关于',
              icon: 'about',
              name: 'about',
              path: '/about',
              component: 'Cockpit/About',
              hidden: false
            }
          ]
        },
        {
          menuName: '系统设置',
          icon: 'setting',
          name: 'setting',
          path: '/setting',
          hidden: false,
          children: [
            {
              menuName: '菜单管理',
              icon: 'menu',
              name: 'menu',
              path: '/menu',
              component: 'Setting/Menu',
              hidden: false
            },
            {
              menuName: '员工管理',
              icon: 'worker',
              name: 'worker',
              path: '/worker',
              component: 'Setting/Worker',
              hidden: false
            }
          ]
        },
        {
          menuName: '测试',
          icon: 'test',
          name: 'test',
          path: '/test',
          hidden: false,
          component: 'Test/index.vue'
        }
      ]
      generaMenu(asyncRoutes, tree)
      console.log(modules)

      commit('SET_ROUTES', asyncRoutes)
      console.log(asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export function generaMenu(routes, data) {
  data.forEach((item) => {
    console.log(item.component)
    const menu = {
      path: item.path,
      name: item.name,
      component:
        // item?.component === 'Layout'
        //   ? Layout
        //   : () => import(`@/views/${item.component}/index.vue`),
        item.component
          ? modules[/* @vite-ignore*/ `../../views/${item.component}/index.vue`]
          : '',
      hidden: item.hidden,
      redirect: item.redirect,
      children: [],
      meta: {
        label: item.menuName,
        requireAuth: false,
        icon: item.icon,
        keepAlive: false
      }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
