import type { formItemType } from '@/base-ui/from/yh-from-type'
const formModel: formItemType[] = [
  //bingType是用于给不同el组件绑定值，就是给对象添加不同属性，动态生成属性,这个属性不能名称不能乱写属性名称要和后端接口数据名称对应
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
    bingValueType: 'password',
    type: 'input',
    label: '密码',
    placeholder: '请输入密码',
    isHide: false
  },
  {
    bingValueType: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    bingValueType: 'departmentId',
    type: 'select',
    label: '部门',
    selectOptions: []
  },
  {
    bingValueType: 'roleId',
    type: 'select',
    label: '角色',
    selectOptions: []
  }
]
const colLayout: object = {
  xl: 24, // >1920px 4个
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
}
const dialogTitle = '用户'
const dialogFormConfig = {
  formModel,
  colLayout,
  dialogTitle
}

export { dialogFormConfig, formModel, colLayout }
