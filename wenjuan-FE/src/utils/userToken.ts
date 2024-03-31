/**
 * @description 存储/获取 用户token
 * @author Gzh
 */

const KEY = 'USER_TOKEN'

/**
 * 存储token
 * @param token
 */
export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}

/**
 * 获取token
 * @returns
 */
export function getToken() {
  return localStorage.getItem(KEY) || ''
}

/**
 * 移除token
 */
export function removeToken() {
  localStorage.removeItem(KEY)
}
