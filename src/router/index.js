import { createRouter, createWebHistory } from 'vue-router'
import { login } from './modules/login'
import Layout from '@/components/Layout/index.vue'

//默认路由
export const constantRoutes = [
  ...login,
  {
    path: '/404',
    component: () => import('@/components/modules/NotFound.vue'),
    hidden: true
  },
  {
    path: '/layout',
    name: 'BasicLayout',
    component: Layout,
    children: []
  }
]

export const asyncRoutes = []

const router = createRouter({
  //   history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
