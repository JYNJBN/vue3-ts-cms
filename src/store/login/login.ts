import { defineStore } from 'pinia'
import { accountLoginRequest, requestUserInfo, requestUserMenu } from '@/service/login/login-serve'
import localCache from '@/utils/cache'
import { getJurisdictionRouteMenu, getPermissionButtonArr } from '@/utils/map-menus'

import type { accountFormObj } from './login-type'
import router from '@/router'

export const useLogin = defineStore('login', {
  state: () => {
    return {
      token: '',
      //用户信息
      userInfo: [] as any,
      //用户对应的菜单
      userMenu: [] as any,
      PermissionButtonArr: [] as any
    }
  },
  getters: {},
  actions: {
    //这是为了防止刷新页面导致state数据丢失

    keepStoreData() {
      let token: string | null = ''
      token = localCache.getLocalCache('token')
      //这里写if语句就是为了片段是不是第一次登录如果是第一次登录就不会执行if语句里面的操作
      //因为第一次登录localStore里面没有储存数据
      if (token) {
        this.token = token
      }
      let userInfo: [] | null = []
      userInfo = localCache.getLocalCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      let userMenu: [] | null = []
      userMenu = localCache.getLocalCache('userMenu')
      if (userMenu?.length) {
        this.userMenu = userMenu
        //动态添加路由
        getJurisdictionRouteMenu(this.userMenu).forEach((el) => {
          router.addRoute('main', el)
        })
        //添加按钮增删改查权限表
        this.PermissionButtonArr = getPermissionButtonArr(this.userMenu)
      }
    },
    //点击登录
    async accountLoginAction(accountObj: accountFormObj) {
      //登录请求
      //获取用户token id name
      const { data: accountData } = await accountLoginRequest(accountObj)
      console.log(accountData)
      // 保存token到locals和store
      localCache.setLocalCache('token', accountData.token)
      this.token = accountData.token

      // 获取用户信息,这个用户信息是根据id决定的
      const { data: userInfo } = await requestUserInfo(accountData.id)
      localCache.setLocalCache('userInfo', userInfo)
      this.userInfo = userInfo

      //获取用户对应的菜单
      console.log(accountData.id)
      const { data: userMenu } = await requestUserMenu(accountData.id)
      console.log(userMenu)

      localCache.setLocalCache('userMenu', userMenu)
      this.userMenu = userMenu

      //跳转到首页
      router.push('/main')
      getJurisdictionRouteMenu(this.userMenu).forEach((el) => {
        router.addRoute('main', el)
      })
    }
  }
})
