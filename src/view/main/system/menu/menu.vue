<template>
  <div class="menu">
    <page-content v-bind="tableModel"></page-content>
  </div>
</template>
<script lang="ts" setup>
import pageContent from '@/components/page-content/page-content.vue'
import { tableModel } from './config/user-table-model'
</script>
<style lang="less"></style>
