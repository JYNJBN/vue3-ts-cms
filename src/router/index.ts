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
    component: () => import('@/view/login/login.vue'),
    name: 'login'
  },
  {
    path: '/main',
    component: () => import('@/view/main/main.vue'),
    name: 'main',
    children: []
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/view/not-found/not-found.vue'),
    name: 'not-Found'
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
  //当路径为main的时候默认给他跳转到用户菜单对应的第一个选项对应的路径
  if (to.path === '/main') {
    return localCache.getLocalCache('userMenu')[0].children[0].url
  }
})
export default router
