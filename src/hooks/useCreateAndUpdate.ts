import pageModal from '@/components/page-modal/page-modal.vue'

import { ref } from 'vue'
export function userCreteAndUpdate(dialogFormConfig: any, createCb?: any, updateCb?: any) {
  const dialogTitle = ref()
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const handleUpdate = (row: any) => {
    dialogTitle.value = `编辑${dialogFormConfig.dialogTitle}`
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
      //将这行的值给pageModalRef.value.formItemBindValue重而实现点击编辑时dialog显示的是这行的数据
      //过滤这行的值，获取的是dialog中有的表单数据项，而不是整行的数据
      const dialogObj: any = {}
      for (const item of dialogFormConfig.formModel) {
        if (item.bingValueType in row) {
          dialogObj[item.bingValueType] = row[item.bingValueType]
          dialogObj.id = row.id
        }
        //如果item里没有id属性添加一个id属性id属性就是这行的id,修改的时候需要用到id
      }
      // console.log(Object.keys(row))
      console.log(dialogObj)
      pageModalRef.value.formItemBindValue = { ...dialogObj }
      updateCb(row)
    }
  }
  const handleCreate = () => {
    dialogTitle.value = `创建${dialogFormConfig.dialogTitle}`
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
      // 创建的时候清空数据，不让会导致点击编辑后再点击创建，创建会出现编辑的数据
      pageModalRef.value.formItemBindValue = {}
      createCb()
    }
  }
  return { pageModalRef, dialogTitle, handleUpdate, handleCreate }
}
