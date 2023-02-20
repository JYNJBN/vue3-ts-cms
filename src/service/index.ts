import { YhRequest } from './config'
import { BASE_URL, TIME_OUT } from './config/axios_config'
const yhRequest = new YhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  axiosInterceptors: {
    requestOnFulfilled: (config) => {
      return config
    },
    requestOnRejected: (err) => {
      console.log(err)
    }
  }
})

export { yhRequest }
