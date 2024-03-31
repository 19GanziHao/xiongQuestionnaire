import { message } from 'antd'
import axios from 'axios'
import { getToken } from '../utils/userToken'

export type ResultType = {
  code: number // 1代表成功 其余失败
  data?: ResultDataType
  msg?: string
}
export type ResultDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const instance = axios.create({
  timeout: 10000,
})

// request 拦截 每次请求都带上token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT的固定格式
    return config
  },
  error => Promise.reject(error)
)

// response拦截: 统一处理errno和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResultType

  const { code, data, msg } = resData

  if (code === 401) {
    console.log('登录过期')
  }
  // 判断是否错误
  if (code !== 1) {
    console.log('请求错误')
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
})

export default instance
