<template>
  <div class="echart-rose">
    <yh-echart :options="options"></yh-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { pieDataType } from './page-echart-type'
import yhEchart from '@/base-ui/echart/yh-echart.vue'

const props = defineProps<{
  roseData: pieDataType[]
}>()
const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [30, 130],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="less"></style>
