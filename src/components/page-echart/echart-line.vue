<template>
  <div class="echart-line">
    <yh-echart :options="options"></yh-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import yhEchart from '@/base-ui/echart/yh-echart.vue'
import { lineDataType } from './page-echart-type'
const props = defineProps<{
  lineData: lineDataType
}>()
const options = computed(() => ({
  title: {
    text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['sale']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: props.lineData.xAxisName
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'sale',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: props.lineData.value
    }
  ]
}))
</script>
<style lang="less"></style>
