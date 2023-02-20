<template>
  <div class="login-account">
    <el-form :model="accountFormObj" :rules="rules" ref="accountForm">
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          autocomplete="off"
          v-model="accountFormObj.name"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          v-model="accountFormObj.password"
        />
      </el-form-item>
    </el-form>
    <div class="rememberOrForgetThePassword">
      <el-checkbox v-model="accountRemember" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, defineExpose, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useLogin } from '@/store/login/login'

const accountFormObj = reactive({
  name: localCache.getLocalCache('name'),
  password: localCache.getLocalCache('password')
})
const accountForm = ref<InstanceType<typeof ElForm>>()
const accountRemember = ref(true)
const loginStore = useLogin()

const accountLogin = () => {
  accountForm.value?.validate((valid) => {
    //如果全部input表单验证都通过才进行登录
    if (valid) {
      console.log('账号密码登录')
      //记住密码
      if (accountRemember.value) {
        localCache.setLocalCache('name', accountFormObj.name)
        localCache.setLocalCache('password', accountFormObj.password)
      }
      // 不需要记住密码
      else {
        localCache.deleteLocalCache('name')
        localCache.deleteLocalCache('password')
      }
      //在store里发起登录请求，将token id等存储在store里面
      loginStore.accountLoginAction(accountFormObj)
    }
  })
}
// 要暴露出去才可以使用
defineExpose({
  accountLogin
})
</script>
<style lang="less">
.rememberOrForgetThePassword {
  display: flex;
  justify-content: space-between;
}
</style>
