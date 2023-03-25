<template>
  <div class="yh-echart">
    <div class="echartDiv" ref="echartDivRef" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts/types/dist/shared'

import * as echarts from 'echarts'
const echartDivRef = ref<HTMLElement>()
const props = defineProps<{ options: EChartsOption }>()
onMounted(() => {
  var myChart = echarts.init(echartDivRef.value!)
  watchEffect(() => {
    //当传过来的options发生变化动态的重置实例的Options
    props.options && myChart.setOption(props.options)
  })
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})
</script>
<style lang="less"></style>
