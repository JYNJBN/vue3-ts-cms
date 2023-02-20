import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { pinia } from './store'
import 'normalize.css'
import '@/assets/css/index.css'
import { useLogin } from './store/login/login'
const app = createApp(App)
app.use(router)
app.use(pinia)
//这是为了防止刷新页面导致state数据丢失
const loginStore = useLogin()
loginStore.keepStoreData()
app.mount('#app')
