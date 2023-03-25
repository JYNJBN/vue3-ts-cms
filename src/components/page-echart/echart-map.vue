<template>
  <div class="echart-bar">
    <yh-echart :options="options"></yh-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import yhEchart from '@/base-ui/echart/yh-echart.vue'
import * as echarts from 'echarts'
import chinaMapData from './china.json'
import { pieDataType } from './page-echart-type'

const props = withDefaults(
  defineProps<{
    mapData: pieDataType[]
  }>(),
  {
    mapData: () => []
  }
)
echarts.registerMap('china', chinaMapData)

// legend内容
var legendData = ['商品销量']
// legend自定义颜色 不设置有默认色
var legendColor = ['blue', 'gray', '#000', 'cyan']
// 映射颜色  不设置有默认色
var visColor = [
  '#ffffff',
  '#e8192f',
  '#d6664d',
  '#B9044E',
  '#f0ba2e',
  '#d3ce2b',
  '#169A7f',
  '#0b6573',
  '#1BB3c8'
]

const options = computed(() => ({
  title: {
    text: '通过颜色映射销量',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: '3%',
    bottom: '3%',
    data: legendData
  },
  color: legendColor,
  visualMap: {
    min: 0,
    max: 2500,
    left: 'left',
    bottom: '3%',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true,
    color: visColor
  },
  toolbox: {
    show: true,
    right: '3%',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '商品销量',
      type: 'map',
      map: 'china',
      normal: { show: true },
      emphasis: { show: true },
      data: props.mapData
    }
  ]
}))
</script>
<style lang="less"></style>
