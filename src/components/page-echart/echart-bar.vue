<template>
  <div class="echart-bar">
    <yh-echart :options="options"></yh-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import yhEchart from '@/base-ui/echart/yh-echart.vue'
import * as echarts from 'echarts'
import { lineDataType } from './page-echart-type'
const props = withDefaults(
  defineProps<{
    lineData: lineDataType
  }>(),
  {
    lineData: () => ({
      value: [],
      xAxisName: []
    })
  }
)
const options = computed(() => ({
  xAxis: {
    data: props.lineData.xAxisName,
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: props.lineData.value
    }
  ]
}))
</script>
<style lang="less"></style>
