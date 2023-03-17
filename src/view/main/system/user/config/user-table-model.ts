const columArr = [
  { type: 'name', label: '用户名', midWidth: '150px' },
  { type: 'realname', label: '真实姓名', midWidth: '150px' },
  { type: 'cellphone', label: '手机号', midWidth: '150px' },
  { type: 'enable', label: '状态', midWidth: '100px', slotName: 'status' },
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
const pageName = 'users'
//控制分页器等展示
const showConfig = {
  showSerialNumber: true,
  showSelection: true,
  showPagination: true
}
export const tableModel = { columArr, headerTitle, pageName, showConfig }
