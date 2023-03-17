<template>
  <div class="nav-search">
    <yh-from :formItems="formModel" :colLayout="colLayout" v-model:formItemBindValue="formValue">
      <template #top>
        <h1 class="form_title">高级检索</h1>
      </template>
      <template #footer>
        <div class="form_bts">
          <el-button type="primary" @click="searchInfo">查询</el-button>
          <el-button type="warning" @click="reSet">重置</el-button>
        </div>
      </template>
    </yh-from>
  </div>
</template>
<script setup lang="ts">
import yhFrom from '@/base-ui/from/yh-from.vue'

import { ref, defineProps, PropType, defineEmits } from 'vue'
import { formItemType } from '@/base-ui/from/yh-from-type'
defineProps({
  formModel: {
    type: Array as PropType<formItemType[]>,
    default: () => {
      return {}
    }
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
  }
})
const emit = defineEmits(['reSetBtnClick', 'searchBtnClick'])
//这里不用写属性，属性会根据模型数据动态生成
const formValue = ref()
const reSet = () => {
  // 这个for循环是用于清除form表单的数据
  // 这种写法无法影响yh-from中的数据
  // formValue.value={}
  // yh-from中的数据做了浅拷贝
  for (let item in formValue.value) {
    formValue.value[item] = ''
  }
  emit('reSetBtnClick')
}
const searchInfo = () => {
  emit('searchBtnClick', formValue.value)
  console.log(formValue.value)
}
</script>
<style lang="less">
.form_title {
  padding-top: 40px;
}
.form_bts {
  text-align: right;
}
</style>
