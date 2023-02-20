import localCache from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
//这里的type没有什么特殊含义就是指它是个类型
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/view/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getLocalCache('token')
    //如果没有token跳回登录页面
    if (!token) {
      return '/login'
    }
  }
})
export default router
