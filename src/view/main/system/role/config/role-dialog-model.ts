import type { formItemType } from '@/base-ui/from/yh-from-type'
const formModel: formItemType[] = [
  //bingType是用于给不同el组件绑定值，就是给对象添加不同属性，动态生成属性,这个属性不能名称不能乱写属性名称要和后端接口数据名称对应
  {
    bingValueType: 'name',
    type: 'input',
    label: '角色名',
    placeholder: '请输入角色名'
  },
  {
    bingValueType: 'intro',
    type: 'input',
    label: '角色介绍',
    placeholder: '请输入角色介绍'
  }
]
const colLayout: object = {
  xl: 24, // >1920px 4个
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
}
const dialogTitle = '角色'
const dialogFormConfig = {
  formModel,
  colLayout,
  dialogTitle
}

export { dialogFormConfig, formModel, colLayout }
