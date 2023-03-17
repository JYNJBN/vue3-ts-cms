<template>
  <div class="nav-header">
    <div class="controlFold" @click="handlerFold">
      <el-icon size="25">
        <Expand v-if="controlFold" />
        <Fold v-else />
      </el-icon>
    </div>
    <span class="crumbs">
      <yh-bread-crumb :breadCrumbArr="breadCrumbValue"></yh-bread-crumb>
    </span>
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="userInfo">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, computed, Ref } from 'vue'
import { useLogin } from '@/store/login/login'
import yhBreadCrumb from '@/base-ui/bread-crumb/yh-bread-crumb.vue'
import { pathMapBreadCrumbValue } from '@/utils/generatePermissionTable'
import { useRoute } from 'vue-router'
import type { breadCrumbItem } from '@/base-ui/bread-crumb/yh-bread-crumb-type'
const emit = defineEmits(['changeFoldStatus'])
//默认不折叠
let controlFold = ref(true)
const handlerFold = () => {
  controlFold.value = !controlFold.value
  //发起事件通知
  emit('changeFoldStatus', controlFold.value)
}
const loginStore = useLogin()
const route = useRoute()
const breadCrumbValue: Ref<breadCrumbItem[]> = computed(() => {
  return pathMapBreadCrumbValue(loginStore.userMenu, route.path)
})
</script>
<style lang="less">
.nav-header {
  width: 100%;
  position: relative;
}
.controlFold {
  float: left;
  cursor: pointer;
}
.crumbs {
  float: left;
  position: absolute;
  margin-left: 10px;
  top: 6px;
  left: 30px;
}
.el-avatar {
  vertical-align: middle;
}
.el-dropdown {
  float: right;
  position: absolute;
  margin: auto;
  top: -6px;
  right: 0;
}
</style>
