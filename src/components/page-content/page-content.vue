<template>
  <div class="page-content">
    <yh-table
      :pageList="pageList"
      :columArr="columArr"
      :headerTitle="headerTitle"
      v-model:pageInfo="pageInfo"
      :pageListCount="pageListCount"
      :showConfig="showConfig"
      default-expand-all
      :childrenProps="childrenProps"
    >
      <template #header_action>
        <el-button type="primary" plain v-if="isCreate" @click="createClick">添加用户</el-button>
      </template>
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'warning'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filter.formatUtcTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filter.formatUtcTime(scope.row.updateAt) }}
      </template>
      <template #edit="scope">
        <el-button type="primary" plain v-if="isUpdate" @click="updateClick(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" plain v-if="isDelete" @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
      <!-- 这里是提供给外界使用的动态插槽 -->
      <!-- !是非空断言 []是动态绑定插槽 -->
      <template
        v-for="otherItem in otherSlotNames"
        :key="otherItem.type"
        #[otherItem.slotName!]="scope"
      >
        <slot :name="otherItem.slotName" :row="scope.row"></slot>
      </template>
    </yh-table>
  </div>
</template>
<script lang="ts" setup>
import { columArrItemType, showConfigType } from '@/base-ui/table/yh-table-type'
import yhTable from '@/base-ui/table/yh-table.vue'
import { useSystem } from '@/store/main/system/system'
import { usePermissions } from '@/hooks/usePermission'
import { computed, defineProps, defineExpose, ref, watch, PropType, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  columArr: {
    type: Array as PropType<columArrItemType[]>,
    required: true,
    default: () => []
  },
  headerTitle: {
    type: String,
    required: true,
    default: ''
  },
  pageName: {
    required: true,
    type: String,
    default: ''
  },
  showConfig: {
    type: Object as PropType<showConfigType>,
    default: () => ({
      showSerialNumber: true,
      showSelection: true,
      showPagination: true
    })
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['updateClick', 'createClick'])
//查询用户权限表，如果有对应权限则显示按钮
const isCreate = usePermissions(props.pageName, 'create')
const isDelete = usePermissions(props.pageName, 'delete')
const isUpdate = usePermissions(props.pageName, 'update')
const isQuery = usePermissions(props.pageName, 'query')

const systemStore = useSystem()
//给外界提供动态插槽，这里的插槽是指除了通用组件用到的固定插槽之外的
const otherSlotNames = props.columArr.filter((item) => {
  if (
    item.slotName === 'header_action' ||
    item.slotName === 'status' ||
    item.slotName === 'createAt' ||
    item.slotName === 'updateAt' ||
    item.slotName === 'edit'
  ) {
    return false
  }
  return true
})

//pageInfo处理分页点击重新发起获取列表请求的参数
const pageInfo = ref({ pageSize: 10, currentPage: 1 })
let PageOffset = computed(() => (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize)
//searchInfo主要放的是一些查询的条件比如获取电话是139开头的列表
const getPageList = (searchInfo?: object) => {
  //使用store，store内部发起网络请求
  systemStore.getPageList(props.pageName, PageOffset.value, pageInfo.value.pageSize, searchInfo)
}
//这里调用一次是用于初始化数据
getPageList()

//获取数据提供给表格渲染
//这里是当pagesize改变或者是currentPage改变即改变显示的条数，以及改变当前页数触发
const pageList = computed(() => systemStore.pageList(props.pageName))
const pageListCount = computed(() => systemStore.pageTotalCount(props.pageName))

//处理删除
const handleDelete = async (row: any) => {
  console.log(row)

  //这里传多俩个参数pageOffset和pageSize是为了控制删除用户后重新获取的数据是当前页的数据
  const status = await systemStore.deletePageData(
    props.pageName,
    row.id,
    PageOffset.value,
    pageInfo.value.pageSize
  )
  ElMessage.info(status)
}
//更新
const updateClick = (row: any) => {
  emit('updateClick', row)
}
//添加
const createClick = () => {
  emit('createClick')
}
//重新请求新的列表数据
watch(
  () => pageInfo,
  () => {
    getPageList()
  },
  { deep: true }
)
defineExpose({ getPageList })
// const totalCount = computed(() => systemStore.totalCount)
</script>
<style lang="less"></style>
