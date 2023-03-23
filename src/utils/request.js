// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 配置了开发环境的api 如果执行 npm rum dev 该值正确 生产环境由运维人员配置
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
},
error => {
  return Promise.reject(error)
}) // 请求拦截器
service.interceptors.response.use(response => {
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
},
error => {
  Message.error(error.message)
  return Promise.reject(error)
}) // 响应拦截器
export default service // 导出axios实例
