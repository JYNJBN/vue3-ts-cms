import { yhRequest } from '../../index'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressAddressSale = '/goods/address/sale'
}
export function requestGoodsCategoryCount() {
  return yhRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function requestGoodsCategorySale() {
  return yhRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function requestGoodsCategoryFavor() {
  return yhRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function requestGoodsAddressSale() {
  return yhRequest.get({
    url: DashboardAPI.addressAddressSale
  })
}
