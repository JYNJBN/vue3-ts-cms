import { requestPageList } from '@/service/main/system/system-serve'
import { defineStore } from 'pinia'
//这里存放的是公共数据方法
export const useRoot = defineStore('root', {
  state: () => {
    return {
      departmentList: [] as any[],
      roleList: [] as any[],
      //这是全部菜单而不是某个用户的菜单
      generalMenu: [] as any[]
    }
  },
  getters: {},
  actions: {
    async getInitData() {
      //部门列表和用户列表
      const {
        data: { list: departmentList }
      } = await requestPageList('/department', 0, 100)
      this.departmentList = departmentList
      const {
        data: { list: roleList }
      } = await requestPageList('/role', 0, 100)
      this.roleList = roleList
      const {
        data: { list: generalMenu }
      } = await requestPageList('menu')
      this.generalMenu = generalMenu
    }
  }
})
