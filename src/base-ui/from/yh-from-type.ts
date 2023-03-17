type formItemInsertType = 'text' | 'date' | 'password' | 'select' | 'input'
interface selectOptionsType {
  value: string
  label: string
}

export interface formItemType {
  bingValueType: string
  type: formItemInsertType
  placeholder?: string
  label?: string
  rules?: any[]
  selectOptions?: selectOptionsType[]
  dateOptions?: any
  isHide?: boolean
}
