<template>
  <div class="user">
    <div class="user_search">
      <page-search
        v-bind="formConfig"
        @reSetBtnClick="handleReSet"
        @searchBtnClick="handleSearch"
      ></page-search>
    </div>
    <div class="user_content">
      <page-content
        ref="pageContentRef"
        v-bind="tableModel"
        @updateClick="handleUpdate"
        @createClick="handleCreate"
      ></page-content>
    </div>
    <div class="user_modal">
      <page-modal
        v-bind:="dialogFormConfigRef"
        ref="pageModalRef"
        :dialogTitle="dialogTitle"
        pageName="users"
      ></page-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { formConfig } from './config/user-form-model'
import { tableModel } from './config/user-table-model'
import { userPageCommunication } from '@/hooks/usePageSearch'
import { dialogFormConfig } from './config/user-dialog-model'
import { userCreteAndUpdate } from '@/hooks/useCreateAndUpdate'
import { useRoot } from '@/store/root/root'
import { computed } from 'vue'
//user的hook创建用户和修改时调用
const createCb = () => {
  //创建用户的时候显示密码
  const pwdItem = dialogFormConfig.formModel.find((item) => item.bingValueType === 'password')
  pwdItem!.isHide = false
}
const updateCb = () => {
  //修改用户的时候不显示密码
  const pwdItem = dialogFormConfig.formModel.find((item) => item.bingValueType === 'password')
  pwdItem!.isHide = true
}
//使用rootStore并且将roleList和departmentList储存在state中
const rootStore = useRoot()
rootStore.getInitData()
//这里使用dialogFormConfigRef响应式数据，它的依赖是dialogFormConfig，而使用rootSore去发请求获取数据是异步任务，这里可以保证当rootStore里的departmentLIst和roleList有数据后重新加载modal界面
const dialogFormConfigRef = computed(() => {
  const departmentIdItem = dialogFormConfig.formModel.find(
    (item) => item.bingValueType === 'departmentId'
  )
  departmentIdItem!.selectOptions = rootStore.departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })
  const roleIdItem = dialogFormConfig.formModel.find((item) => item.bingValueType === 'roleId')
  roleIdItem!.selectOptions = rootStore.roleList.map((item) => {
    return { label: item.name, value: item.id }
  })
  return dialogFormConfig
})

//调用hook获取公共的方法以及数据
const { pageModalRef, dialogTitle, handleCreate, handleUpdate } = userCreteAndUpdate(
  dialogFormConfig,
  createCb,
  updateCb
)
const { pageContentRef, handleReSet, handleSearch } = userPageCommunication()
</script>
<style lang="less">
.user {
  background-color: #f0f2f5;
}
</style>
