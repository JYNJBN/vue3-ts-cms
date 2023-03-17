<template>
  <div class="yh-table">
    <div class="tb_header">
      <slot name="header">
        <h3 class="header_title">{{ headerTitle }}</h3>
        <slot name="header_action"></slot>
      </slot>
    </div>
    <el-table
      border
      :data="pageList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 选项按钮 -->
      <template v-if="showConfig.showSelection">
        <el-table-column type="selection" align="center"></el-table-column>
      </template>
      <!-- 序号 -->
      <template v-if="showConfig.showSerialNumber">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
      </template>
      <!-- 请求获得的数据 -->
      <template v-for="columItem in columArr" :key="columItem.type">
        <el-table-column
          :prop="columItem.type"
          :label="columItem.label"
          :min-width="columItem.midWidth"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="columItem.slotName" :row="scope.row">
              {{ scope.row[columItem.type] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <template v-if="showConfig.showPagination">
      <slot name="table_footer">
        <el-pagination
          v-bind:current-page="pageInfo.currentPage"
          v-bind:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageListCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from 'vue'
import { showConfigType } from './yh-table-type'

const props = defineProps({
  pageList: {
    type: Array,
    default: () => {
      return []
    },
    require: true
  },
  columArr: {
    type: Array,
    default: () => {
      return []
    },
    require: true
  },
  showConfig: {
    type: Object as PropType<showConfigType>,
    default: () => ({
      showSerialNumber: true,
      showSelection: true,
      showPagination: true
    })
  },
  showSerialNumber: {
    type: Boolean,
    default: true
  },
  showSelection: {
    type: Boolean,
    default: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },

  headerTitle: {
    type: String,
    default: ''
  },
  pageInfo: {
    type: Object,
    default: () => ({ pageSize: 10, currentPage: 1 })
  },
  pageListCount: {
    type: Number,
    default: 10
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['selectionChange', 'update:pageInfo'])

//获取勾选行数据
const handleSelectionChange = (value) => {
  console.log(value)
  //发出事件传出这行的数据
  emit('selectionChange', value)
}

const handleSizeChange = (changeSizeValue: number) => {
  console.log(changeSizeValue)
  emit('update:pageInfo', {
    pageSize: changeSizeValue,
    currentPage: props.pageInfo.currentPage
  })
}
const handleCurrentChange = (changeCurrentSizeValue: number) => {
  emit('update:pageInfo', {
    pageSize: props.pageInfo.pageSize,
    currentPage: changeCurrentSizeValue
  })
}
</script>
<style lang="less">
.yh-table {
  position: relative;
  background-color: white;
  margin-top: 20px;
  padding-bottom: 52px;
}
.el-table__fixed-body-wrapper {
  z-index: auto !important;
}
.el-table th.gutter {
  display: table-cell !important;
}
.tb_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.el-pagination {
  position: absolute;
  bottom: 10px;
  left: calc(50% - 332px);
}
</style>
