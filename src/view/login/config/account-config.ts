export const rules = {
  accountNumber: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      pattern: /^[\w-]{4,12}$/,
      message: '账号必须是4到12位的数字和字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '密码必须是5位的字母或者数字',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ]
}
