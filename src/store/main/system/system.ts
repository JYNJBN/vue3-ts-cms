import { defineStore } from 'pinia'
import { requestDeletePageDate, requestPageList } from '@/service/main/system/system-serve'
import { requestCreatePgeDate, requestUpdatePageData } from '@/service/main/system/system-serve'
export const useSystem = defineStore('system', {
  state: () => {
    return {
      usersList: [] as any[],
      usersListTotalCount: 0,
      roleList: [] as any[],
      goodsList: [] as any[],
      goodsListTotalCount: 0,
      menuList: [] as any[]
    }
  },
  getters: {
    pageList: (state) => {
      return (pageName: string) => {
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
        console.log((state as any)[`${pageName}List`])

        return (state as any)[`${pageName}List`]
      }
    },
    pageTotalCount: (state) => {
      return (pageName: string) => {
        return (state as any)[`${pageName}ListTotalCount`]
      }
    }
  },
  actions: {
    //SearchInfo是可选属性默认不填的话是获取所有用户不指定的列表
    async getPageList(pageName: string, pageOffset: number, pageSize: number, SearchInfo?: object) {
      const { data } = await requestPageList(pageName, pageOffset, pageSize, SearchInfo)
      console.log(data)
      ;(this as any)[`${pageName}List`] = data.list
      if (data.totalCount) {
        ;(this as any)[`${pageName}ListTotalCount`] = data.totalCount
      }
      // switch (pageName) {
      //   case 'users':
      //     this.usersList = data.list
      //     this.userListTotalCount = data.totalCount
      //     break
      //   case 'role':
      //     this.roleList = data.list

      //     break
      // }
    },
    async deletePageData(pageName: string, id: string, pageOffset: number, pageSize: number) {
      //删除数据
      const { data } = await requestDeletePageDate(pageName, id)
      // 重新更新pageList
      this.getPageList(pageName, pageOffset, pageSize)
      return data
    },
    //创建
    async createPageData(pageName: string, param: object) {
      await requestCreatePgeDate(pageName, param)
      this.getPageList(pageName, 0, 10)
    },
    //编辑
    async updatePageData(pageName: string, id: string, param: object) {
      await requestUpdatePageData(pageName, id, param)
      this.getPageList(pageName, 0, 10)
    }
  }
})
