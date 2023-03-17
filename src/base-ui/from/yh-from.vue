<template>
  <div class="yh-from">
    <div class="yh-form-top">
      <slot name="top"></slot>
    </div>
    <el-form label-width="120px">
      <el-row :gutter="20">
        <template v-for="formItem in props.formItems" :key="formItem.bingValueType">
          <el-col v-bind="colLayout" v-if="!formItem.isHide">
            <template v-if="formItem.type === 'input' || formItem.type === 'password'">
              <el-form-item :label="formItem.label">
                <el-input
                  :type="formItem.type"
                  :placeholder="formItem.placeholder"
                  v-model="formData[`${formItem.bingValueType}`]"
                />
              </el-form-item>
            </template>
            <template v-else-if="formItem.type === 'select'">
              <el-form-item :label="formItem.label">
                <el-select
                  clearable
                  :placeholder="formItem.placeholder"
                  v-model="formData[`${formItem.bingValueType}`]"
                >
                  <el-option
                    v-for="item in formItem.selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="formItem.type === 'date'">
              <el-form-item :label="formItem.label">
                <el-date-picker
                  v-bind="formItem.dateOptions"
                  v-model:modelValue="formData[`${formItem.bingValueType}`]"
                />
              </el-form-item>
            </template>
          </el-col>
        </template>
        <!-- 案例 -->
        <!-- <el-col :span="8">
          <el-form-item label="用户名">
            <el-input type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态">
            <el-input type="select" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-input type="date" autocomplete="off" />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <div class="yh-form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref, watch } from 'vue'
import type { formItemType } from './yh-from-type'

const props = defineProps({
  formItems: {
    type: Array as PropType<formItemType[]>,
    default: () => [{}]
  },
  formItemBindValue: {
    type: Object,
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
//使用emit和双向绑定结合的做法去修改父组件传递过来的值
const emit = defineEmits(['update:formItemBindValue'])
//这里是因为传递过来的值是一个对象，如果不做处理本质上还是在修改props的值
let formData = ref({ ...props.formItemBindValue })
console.log(formData)

//监听自定义的数据并且去修改父组件传递的值
watch(
  formData,
  (newValue) => {
    console.log(newValue)
    emit('update:formItemBindValue', newValue)
  },
  { deep: true }
)
</script>
<style lang="less">
.yh-from {
  padding: 20px;
  background-color: white;
}
.el-col {
  margin-top: 20px;
}
</style>
