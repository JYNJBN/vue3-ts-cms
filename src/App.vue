<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    return {
      zhCn,
      defineComponent
    }
  }
})
</script>

<style lang="less">
#app {
}
</style>
