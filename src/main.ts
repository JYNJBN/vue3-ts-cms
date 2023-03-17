import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { pinia } from './store'
import 'normalize.css'
import '@/assets/css/index.css'
import { useLogin } from './store/login/login'
import * as Icons from '@element-plus/icons-vue'
import { registerGlobalAttributeOrMethod } from './global/index'

const app = createApp(App)
// 统一注册Icon图标
// 注册全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.use(pinia)
//这是为了防止刷新页面导致state数据丢失
const loginStore = useLogin()
loginStore.keepStoreData()
app.use(router)
app.use(registerGlobalAttributeOrMethod)
app.mount('#app')
