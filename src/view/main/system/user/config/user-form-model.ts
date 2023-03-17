import type { formItemType } from '@/base-ui/from/yh-from-type'
const formModel: formItemType[] = [
  //bingType是用于给不同el组件绑定值，就是给对象添加不同属性，动态生成属性
  {
    bingValueType: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    bingValueType: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    bingValueType: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    label: '状态',
    bingValueType: 'enable',
    type: 'select',
    placeholder: '请输入用户名',
    selectOptions: [
      {
        label: '启用',
        value: '1'
      },
      {
        label: '禁用',
        value: '0'
      }
    ]
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
  },
  {
    label: '更新时间',
    bingValueType: 'updateAt',
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
