import dayjs from 'dayjs'
import utc from 'dayjs'
import { App } from 'vue'
dayjs.extend(utc)
export function formatUtcTime(app: App) {
  app.config.globalProperties.$filter = {
    formatUtcTime(utcTime: string) {
      return dayjs(utcTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
