<template>
  <div class="echart-pie">
    <yh-echart :options="options"></yh-echart>
  </div>
</template>
<script lang="ts" setup>
import yhEchart from '@/base-ui/echart/yh-echart.vue'
import { defineProps, computed } from 'vue'
import { pieDataType } from './page-echart-type'
const props = defineProps<{
  pieData: pieDataType[]
}>()

const options = computed(() => {
  console.log(props.pieData)
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style lang="less"></style>
