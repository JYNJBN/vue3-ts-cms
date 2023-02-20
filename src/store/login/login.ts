import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenu
} from '@/service/login/login-serve'
import localCache from '@/utils/cache'

import type { accountFormObj } from '@/store/login/login_type'
import router from '@/router'

export const useLogin = defineStore('login', {
  state: () => {
    return {
      token: '',
      //用户信息
      userInfo: '',
      //用户对应的菜单
      userMenu: ''
    }
  },
  getters: {},
  actions: {
    //这是为了防止刷新页面导致state数据丢失

    keepStoreData() {
      let token: string | null = ''
      token = localCache.getLocalCache('token')
      if (token) {
        this.token = token
      }
      let userInfo: string | null = ''
      userInfo = localCache.getLocalCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      let userMenu: string | null = ''
      userMenu = localCache.getLocalCache('userMenu')
      if (userMenu) {
        this.userMenu = userMenu
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
      const { data: userMenu } = await requestUserMenu(accountData.id)
      localCache.setLocalCache('userMenu', userMenu)
      this.userMenu = userMenu

      //跳转到首页
      router.push('/main')
    }
  }
})
