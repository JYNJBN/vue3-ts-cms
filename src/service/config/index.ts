import axios from 'axios'
import type { AxiosInstance } from 'axios'
//导入自己封装的类型
import type {
  axiosInterceptors,
  yhRequestConfig,
  yhAxiosRequestConfig
} from './type'
import localCache from '@/utils/cache'
import { ElLoading, ElMessage } from 'element-plus'
class YhRequest {
  //每次创建的使用执行构造函数，每个instance都是一个axios实例可以传入不同的配置
  instance: AxiosInstance
  interceptors?: axiosInterceptors
  loading?: any
  isLoading?: boolean
  constructor(config: yhRequestConfig) {
    this.instance = axios.create(config)
    //将对象存储
    this.interceptors = config.axiosInterceptors

    //使用配置的拦截器，这里是配置每个实例单独的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestOnFulfilled,
      this.interceptors?.requestOnRejected
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseOnFulfilled,
      this.interceptors?.responseOnRejected
    )
    // 这里是配置所有实例的拦截器
    this.instance.interceptors.request.use(
      (res) => {
        //设置token,在请求头中设置token，只有登录的请求不需要token其他操作都需要token
        const token = localCache.getLocalCache('token')
        res.headers.Authorization = 'Bearer ' + token
        //加载
        if (this.loading === false) {
          console.log('不执行加载动画')
        } else {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        // console.log('所有请求成功的拦截器')
        return res
      },
      (err) => {
        // console.log('所有请求失败的拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有响应成功的拦截器')
        //加载成功
        if (this.loading) {
          this.loading?.close()
        }
        return res.data
      },
      (err) => {
        // console.log('所有响应失败的拦截器')
        //加载成功
        if (this.loading) {
          this.loading?.close()
        }
        ElMessage.error(err.response.data)
        return err
      }
    )
  }
  request<T = any>(config: yhAxiosRequestConfig) {
    if (config.showLoading === false) {
      this.loading = false
    }
    return this.instance.request<T>(config)
  }
  get<T = any>(config: yhAxiosRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }
  post<T = any>(config: yhAxiosRequestConfig) {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }
}
export { YhRequest }
