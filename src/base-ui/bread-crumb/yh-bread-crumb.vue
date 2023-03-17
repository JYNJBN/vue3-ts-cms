<template>
  <div class="yh-bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="breadCrumbItem in breadCrumbArr" :key="breadCrumbItem.name">
        {{ breadCrumbItem.name }}
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item
        v-for="breadCrumbItem in breadCrumbArr"
        :key="breadCrumbItem.name"
        :to="{ path: breadCrumbItem.path }"
      >
        {{ breadCrumbItem.name }}
      </el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import type { breadCrumbItem } from './yh-bread-crumb-type'
defineProps({
  breadCrumbArr: Array as PropType<breadCrumbItem[]>,
  default: () => []
})
</script>
<style lang="less"></style>
