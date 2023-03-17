<template>
  <div class="login-core">
    <h2>后台管理系统</h2>
    <div class="tab">
      <!-- 切换表单 -->
      <el-tabs type="border-card" class="demo-tabs" stretch v-model="toggleValue">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><User /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          <loginAccount ref="accountForm"></loginAccount>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <loginPhone ref="phoneForm"></loginPhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button @click="handleLoginClick" class="login-button" type="primary">登录</el-button>
  </div>
</template>
<script lang="ts" setup>
//手动导入一下icon图标组件
import { User, Iphone } from '@element-plus/icons-vue'
import loginAccount from '@/view/login/cpns/login-account.vue'
import loginPhone from '@/view/login/cpns/login-phone.vue'
import { ref } from 'vue'
//account组件对象
const accountForm = ref<InstanceType<typeof loginAccount>>()
const phoneForm = ref<InstanceType<typeof loginPhone>>()
//切换表单的值
const toggleValue = ref('account')

const handleLoginClick = () => {
  //选择登录方式
  // 账号登录
  if (toggleValue.value === 'account') {
    accountForm.value?.accountLogin()
  }
  // 手机号登录
  else {
    phoneForm.value?.phoneLogin()
  }
}
</script>

<style lang="less">
.login-core {
  position: absolute;
  width: 320px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-button {
  width: 320px;
}
</style>
