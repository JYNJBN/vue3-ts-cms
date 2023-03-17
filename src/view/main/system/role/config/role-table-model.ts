const columArr = [
  { type: 'name', label: '角色', midWidth: '150px' },
  { type: 'intro', label: '权限', midWidth: '150px' },
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
const headerTitle = '用户列表'
const pageName = 'role'
const showConfig = {
  showSerialNumber: true,
  showSelection: true,
  showPagination: false
}
export const tableModel = { columArr, headerTitle, pageName, showConfig }
