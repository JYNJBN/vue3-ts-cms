<template>
  <div class="role">
    <div class="role_search">
      <pageSearch
        v-bind="formConfig"
        @reSetBtnClick="handleReSet"
        @searchBtnClick="handleSearch"
      ></pageSearch>
    </div>
    <div class="role_content">
      <pageContent
        v-bind="tableModel"
        ref="pageContentRef"
        @updateClick="handleUpdate"
        @createClick="handleCreate"
      ></pageContent>
    </div>
    <div class="role_modal">
      <pageModal
        v-bind:="dialogFormConfig"
        ref="pageModalRef"
        :dialogTitle="dialogTitle"
        pageName="users"
      >
        <template>
          <el-tree
            ref="treeRef"
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </template>
      </pageModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { formConfig } from './config/role-form-config'
import { tableModel } from './config/role-table-model'
import { dialogFormConfig } from './config/role-dialog-model'
import { userCreteAndUpdate } from '@/hooks/useCreateAndUpdate'
import { userPageCommunication } from '@/hooks/usePageSearch'
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
//新建和编辑
const { pageModalRef, dialogTitle, handleCreate, handleUpdate } = userCreteAndUpdate(
  dialogFormConfig,
  createCb,
  updateCb
)
//search和content通信
const { pageContentRef, handleReSet, handleSearch } = userPageCommunication()
</script>
