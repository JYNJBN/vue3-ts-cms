import {
  CreateAxiosDefaults,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios'
interface axiosInterceptors {
  requestOnFulfilled?: (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestOnRejected?: (error: any) => any
  responseOnFulfilled?: (value: AxiosResponse) => AxiosResponse
  responseOnRejected?: (error: any) => any
}
interface yhRequestInterceptors {
  axiosInterceptors?: axiosInterceptors
}
interface setAxiosRequestConfig {
  showLoading?: boolean
}
type yhAxiosRequestConfig = AxiosRequestConfig & setAxiosRequestConfig

//这个类型主要是让函数传递形参的时候不仅可以传入axios.request里需要传入的形参类型，还可以传入拦截器的钩子函数
type yhRequestConfig = yhRequestInterceptors & CreateAxiosDefaults

export { axiosInterceptors, yhRequestInterceptors, yhRequestConfig, yhAxiosRequestConfig }
