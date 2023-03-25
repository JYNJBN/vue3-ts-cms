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
        pageName="role"
        :otherInfo="otherInfo"
      >
        <div class="pageTree">
          <el-tree
            ref="treeRef"
            :data="menu"
            show-checkbox
            node-key="id"
            highlight-current
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          />
        </div>
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
import { getWriteBackTreeMenuId } from '@/utils/map-menus'
import { useRoot } from '@/store/root/root'
import { computed, nextTick, ref } from 'vue'
import { ElTree } from 'element-plus'
const treeRef = ref<InstanceType<typeof ElTree>>()
const createCb = () => {
  //创建时role的单独回调
}
const updateCb = (row: any) => {
  //编辑时role的单独回调
  //获取当前点击编辑项的数据
  const WriteBackTreeMenuId = getWriteBackTreeMenuId(row.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(WriteBackTreeMenuId, false)
  })
}

//设置编辑以及创建点开的菜单
const rootStore = useRoot()
rootStore.getInitData()
const menu = computed(() => rootStore.generalMenu)
const otherInfo = ref()
const handleCheckChange = (data: any, data1: any) => {
  otherInfo.value = { menuList: [...data1.checkedKeys, ...data1.halfCheckedKeys] }
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

<style lang="less" scoped>
.pageTree {
  margin-left: -305px;
}
</style>
