<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品数量（饼图）</span>
            </div>
          </template>
          <echart-pie :pieData="goodsCategoryCount"></echart-pie>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>不同城市商品销量</span>
            </div>
          </template>
          <echart-map :mapData="goodsAddressSale"></echart-map>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品数量（玫瑰图）</span>
            </div>
          </template>
          <echart-rose :roseData="goodsCategoryCount"></echart-rose>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品销量</span>
            </div>
          </template>
          <echart-line :lineData="goodsCategorySale"></echart-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>不同城市商品收藏</span>
            </div>
          </template>
          <echart-bar :lineData="goodsCategoryFavor"></echart-bar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { userAnalysis } from '@/store/main/analysis/analysis'
import echartPie from '@/components/page-echart/echart-pie.vue'
import echartRose from '@/components/page-echart/echart-rose.vue'
import echartLine from '@/components/page-echart/echart-line.vue'
import echartBar from '@/components/page-echart/echart-bar.vue'
import echartMap from '@/components/page-echart/echart-map.vue'
const analysisStore = userAnalysis()
analysisStore.getDashboardData()

const goodsCategoryCount = computed(() => {
  return analysisStore.goodsCategoryCount.map((item) => {
    return { value: item.goodsCount, name: item.name }
  })
})
const goodsCategorySale = computed(() => {
  const value: number[] = []
  const xAxisName: string[] = []
  analysisStore.goodsCategorySale.forEach((item) => {
    value.push(item.goodsCount)
    xAxisName.push(item.name)
  })
  return { value, xAxisName }
})
const goodsCategoryFavor = computed(() => {
  const value: number[] = []
  const xAxisName: string[] = []
  analysisStore.goodsCategoryFavor.forEach((item) => {
    value.push(item.goodsFavor)
    xAxisName.push(item.name)
  })
  return { value, xAxisName }
})
const goodsAddressSale = computed(() => {
  return analysisStore.goodsAddressSale.map((item) => {
    return { value: item.count, name: item.address }
  })
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
