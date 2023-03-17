<template>
  <div class="main">
    <div class="main-content">
      <el-container class="main-content">
        <el-aside :width="controlAsideFoldAndWidth ? '200px' : '65px'">
          <nav-aside :isCollapse="!controlAsideFoldAndWidth"></nav-aside>
        </el-aside>
        <el-container class="page">
          <el-header class="page-header">
            <nav-header @changeFoldStatus="changeFoldStatus"></nav-header>
          </el-header>
          <el-main class="page-content">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import navAside from '@/components/nav-aside/nav-aside.vue'
import navHeader from '@/components/nav-header/nav-header.vue'
import { ref } from 'vue'
const controlAsideFoldAndWidth = ref(true)
const changeFoldStatus = (controlFold: boolean) => {
  controlAsideFoldAndWidth.value = controlFold
}
</script>
<style lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.el-header {
  background-color: #ececee;
}
</style>
