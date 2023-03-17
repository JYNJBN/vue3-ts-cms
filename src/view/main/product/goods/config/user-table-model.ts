import { columArrItemType } from '@/base-ui/table/yh-table-type'
const columArr: columArrItemType[] = [
  { type: 'name', label: '商品名称', midWidth: '150px' },
  { type: 'oldPrice', label: '原价格', midWidth: '100px' },
  { type: 'newPrice', label: '现价格', midWidth: '100px' },
  { type: 'status', label: '状态', midWidth: '100px', slotName: 'status' },
  { type: 'imgUrl', midWidth: '100px', slotName: 'imgs' },

  {
    type: 'createAt',
    label: '创建时间',
    midWidth: '150px',
    slotName: 'createAt'
  },
  {
    type: 'updateAt',
    label: '更新时间',
    midWidth: '150px',
    slotName: 'updateAt'
  },
  {
    type: 'button',
    label: '编辑',
    slotName: 'edit',
    midWidth: '150px'
  }
]
const headerTitle = '商品列表'
const pageName = 'goods'
//控制分页器等展示
const showConfig = {
  showSerialNumber: true,
  showSelection: true,
  showPagination: true
}
export const tableModel = { columArr, headerTitle, pageName, showConfig }
