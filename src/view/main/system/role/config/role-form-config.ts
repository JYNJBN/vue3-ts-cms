import type { formItemType } from '@/base-ui/from/yh-from-type'
const formModel: formItemType[] = [
  {
    bingValueType: 'name',
    type: 'input',
    label: '角色',
    placeholder: '请输入角色'
  },
  {
    bingValueType: 'intro',
    type: 'input',
    label: '权限',
    placeholder: '请输入权限'
  },

  {
    label: '创建时间',
    bingValueType: 'createAt',
    type: 'date',
    dateOptions: {
      type: 'daterange',
      rangeSeparator: 'To',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
]
const colLayout: object = {
  xl: 6, // >1920px 4个
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24
}
const formConfig = {
  formModel,
  colLayout
}
export { formConfig, formModel, colLayout }
