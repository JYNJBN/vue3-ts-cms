const columArr = [
  { type: 'name', label: '菜单名称', midWidth: '150px' },
  { type: 'url', label: '路径路径', midWidth: '150px' },
  { type: 'type', label: '类型', midWidth: '150px' },
  { type: 'icon', label: '菜单icon', midWidth: '100px' },
  { type: 'permission', label: '按钮权限' },
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
const headerTitle = '菜单列表'
const pageName = 'menu'
//控制菜单展开
const childrenProps = {
  treeProps: { children: 'children' },
  rowKey: 'id'
}
//控制分页器等展示
const showConfig = {
  showSerialNumber: false,
  showSelection: false,
  showPagination: false
}
export const tableModel = { columArr, headerTitle, pageName, showConfig, childrenProps }
