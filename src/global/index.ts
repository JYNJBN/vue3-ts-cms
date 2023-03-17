import { App } from 'vue'
import { formatUtcTime } from './formatTime'
export function registerGlobalAttributeOrMethod(app: App) {
  //这里可以写很多全局注册的属性或者方法
  app.use(formatUtcTime)
}
