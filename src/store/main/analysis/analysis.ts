import { defineStore } from 'pinia'
import {
  requestGoodsCategoryCount,
  requestGoodsCategorySale,
  requestGoodsCategoryFavor,
  requestGoodsAddressSale
} from '@/service/main/analysis/analysis-serve'

export const userAnalysis = defineStore('analysis', {
  state: () => {
    return {
      goodsCategoryCount: [] as any[],
      goodsCategorySale: [] as any[],
      goodsCategoryFavor: [] as any[],
      goodsAddressSale: [] as any[]
    }
  },
  getters: {},
  actions: {
    async getDashboardData() {
      const { data: goodsCategoryCount } = await requestGoodsCategoryCount()
      this.goodsCategoryCount = goodsCategoryCount
      const { data: goodsCategorySale } = await requestGoodsCategorySale()
      this.goodsCategorySale = goodsCategorySale
      const { data: goodsCategoryFavor } = await requestGoodsCategoryFavor()
      this.goodsCategoryFavor = goodsCategoryFavor
      const { data: goodsAddressSale } = await requestGoodsAddressSale()
      this.goodsAddressSale = goodsAddressSale
    }
  }
})
