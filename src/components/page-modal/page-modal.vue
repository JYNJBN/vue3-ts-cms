<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="props.dialogTitle"
      width="30%"
      align-center
      destroy-on-close
    >
      <yh-from
        :formItems="formModel"
        v-model:formItemBindValue="formItemBindValue"
        :colLayout="colLayout"
      >
        <template #footer>
          <div class="form_bts">
            <el-button type="primary" @click="confirmClick">确定</el-button>
            <el-button type="warning" @click="cancelClick">取消</el-button>
          </div>
        </template>
      </yh-from>
      <slot></slot>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import type { formItemType } from '@/base-ui/from/yh-from-type'
import { defineProps, PropType, ref, defineExpose } from 'vue'
import yhFrom from '@/base-ui/from/yh-from.vue'
import { useSystem } from '@/store/main/system/system'
const props = defineProps({
  formModel: {
    type: Array as PropType<formItemType[]>,
    default: () => [{}]
  },
  colLayout: {
    type: Object,
    default: () => {
      return {
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      }
    }
  },
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  pageName: {
    type: String,
    default: '',
    required: true
  },
  otherInfo: {
    type: Object as any,
    default: () => ({})
  }
})
const centerDialogVisible = ref(false)
const formItemBindValue = ref()
const systemStore = useSystem()
const confirmClick = () => {
  centerDialogVisible.value = false
  if (props.dialogTitle.indexOf('创建') + 1) {
    systemStore.createPageData(props.pageName, {
      ...formItemBindValue.value,
      ...props.otherInfo
    })
  } else {
    //编辑
    console.log(props.otherInfo.value)
    systemStore.updatePageData(props.pageName, formItemBindValue.value.id, {
      ...formItemBindValue.value,
      ...props.otherInfo
    })
  }
}
const cancelClick = () => {
  centerDialogVisible.value = false
}
defineExpose({ centerDialogVisible, formItemBindValue })
</script>
<style lang="less" scoped>
.form_bts {
  display: inline-block;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
