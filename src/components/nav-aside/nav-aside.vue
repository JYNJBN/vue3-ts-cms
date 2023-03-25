<template>
  <div class="nav-aside">
    <el-menu
      text-color="#fff"
      background-color="#001529"
      unique-opened
      :default-active="defaultValue.id + ''"
      :collapse="isCollapse"
    >
      <div class="logo">
        <img src="~@/assets/images/logo.svg" alt="后台管理" />
        <span v-if="!isCollapse">VUE3+TS</span>
      </div>
      <template v-for="MenuSubItem in userMenu" :key="MenuSubItem.id">
        <!-- 二级菜单折叠 -->
        <template v-if="MenuSubItem.type === 1">
          <el-sub-menu :index="MenuSubItem.id + ''">
            <template #title>
              <el-icon>
                <component :is="iconConversion(MenuSubItem.icon)"></component>
              </el-icon>
              <span>{{ MenuSubItem.name }}</span>
            </template>
            <template v-for="MenuItem in MenuSubItem.children" :key="MenuItem.id">
              <el-menu-item @click="processJump(MenuItem.url)" :index="MenuItem.id + ''">
                <span>{{ MenuItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item>
            <el-icon><component :is="MenuSubItem.icon"></component></el-icon>
            <span>{{ MenuSubItem.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { useLogin } from '@/store/login/login'
import router from '@/router'

import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { getTheIdOrTheNameCorrespondingToTheCurrentPath } from '@/utils/map-menus'
const loginStore = useLogin()
//菜单表数据
const userMenu = computed(() => loginStore.userMenu)
// isCollapse控制折叠
const props = defineProps(['isCollapse'])
let isCollapse = computed(() => props.isCollapse)

//获取当前路径，和整个菜单表数据
const route = useRoute()
// 动态绑定默认选择的菜单项保证刷新网页的时候菜单项还是对应的页面的菜单
//动态获取当前url对应的菜单id
const defaultValue = computed(() => {
  return getTheIdOrTheNameCorrespondingToTheCurrentPath(userMenu.value, route.path)
})

//处理icon图标
function iconConversion(icon: string) {
  let removeHeaderIcon = icon.substring(8)
  return removeHeaderIcon.slice(0, 1).toLocaleUpperCase() + removeHeaderIcon.substring(1)
}
// 跳转到对应菜单的路由
const processJump = (url: string) => {
  router.push({
    path: url
  })
}
</script>
<style lang="less">
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: white;
  img {
    height: 100%;
    margin: 0 10px;
  }
}
.el-menu {
  border-right: 0 !important;
}
.el-menu-item {
  background-color: #021831 !important;
}
.el-menu-item:hover,
.is-active {
  background-color: black !important;
  color: white !important;
}
.nav-aside {
  width: 100%;
}
</style>
