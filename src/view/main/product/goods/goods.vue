<template>
  <div class="goods">
    <page-content v-bind="tableModel">
      <template #imgs="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="4"
          :preview-teleported="true"
          :z-index="9999"
          fit="cover"
        />
      </template>
    </page-content>
  </div>
</template>
<script lang="ts" setup>
import pageContent from '@/components/page-content/page-content.vue'
import { tableModel } from './config/user-table-model'
</script>
<style lang="less"></style>
