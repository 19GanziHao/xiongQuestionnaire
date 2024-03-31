import axios, { ResultDataType } from '../ajax'

/**
 * TODO 获取用户信息
 * @returns
 */
export async function getUserInfoService(): Promise<ResultDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResultDataType
  return data
}

/**
 * 注册
 * @returns
 */
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResultDataType> {
  const url = '/api/user/register'
  const body = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, body)) as ResultDataType
  return data
}

/**
 * 登录
 * @returns
 */
export async function loginService(username: string, password: string): Promise<ResultDataType> {
  const url = '/api/user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResultDataType
  return data
}
