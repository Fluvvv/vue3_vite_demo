import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false })

import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

router.beforeEach(async (to, from, next) => {
  console.log(to)
  NProgress.start()
  if (!to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (getToken()) {
      if (store.getters.userInfo.id) {
        console.log('已登录，有用户')
        if (to.matched.length === 0) {
          next('/404') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
        } else {
          next()
        }
      } else {
        console.log('已登录，无用户')
        try {
          console.log('请求路由树')
          await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes')
          routerPackag(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          next()
          NProgress.done()
        }
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next() // 如果匹配到正确跳转
  }
})

router.afterEach(() => {
  NProgress.done()
})

const routerPackag = (routers) => {
  routers.forEach((itemRouter) => {
    if (itemRouter.component) {
      router.addRoute('BasicLayout', itemRouter)
    }
    if (itemRouter.children && itemRouter.children.length) {
      routerPackag(itemRouter.children)
    }
  })
}
