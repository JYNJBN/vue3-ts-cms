<template>
  <div class="login-phone">
    <el-form :model="phoneFormObj" :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" autocomplete="off" v-model="phoneFormObj.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input type="text" autocomplete="off" v-model="phoneFormObj.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineExpose } from 'vue'
import { rules } from '../config/account-config'
const phoneFormObj = reactive({ phone: '', code: '' })

const phoneLogin = () => {
  console.log('手机号登录')
}
defineExpose({ phoneLogin })
</script>
<style lang="less">
.get-code {
  display: flex;
}
</style>
