export const login = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
    },
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    // component: () => import('@/views/register/register'),
    component: () => import('@/components/modules/NotFound.vue'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
    },
    hidden: true
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    // component: () => import('@/views/login/forgetPassWord'),
    component: () => import('@/components/modules/NotFound.vue'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
    },
    hidden: true
  },
  {
    path: '/wechatLoginRes',
    name: 'wechatLoginRes',
    // component: () => import('@/views/login/loginSuccess'),
    component: () => import('@/components/modules/NotFound.vue'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
    },
    hidden: true
  },
  {
    path: '/wechatBindRes',
    name: 'wechatBindRes',
    // component: () => import('@/views/login/bindSuccess'),
    component: () => import('@/components/modules/NotFound.vue'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
    },
    hidden: true
  }
]
