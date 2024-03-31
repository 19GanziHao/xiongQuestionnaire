import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { ROUTERCONSTANT } from '../constant'

// 处于登录状态时 对页面跳转的限制
function useNavPage() {
  const { username } = useGetUserInfo() // 获取用户信息
  const { pathname } = useLocation() // 获取当前路径

  const nav = useNavigate() // 手动跳转

  useEffect(() => {
    // 已经登录
    if (username) {
      if (['/login', '/register'].includes(pathname)) {
        nav(ROUTERCONSTANT.MANAGE_LIST_PATHNAME)
      }
      return
    }
    // 未登录
    if (!['/', '/login', '/register'].includes(pathname)) {
      nav(ROUTERCONSTANT.LOGIN_PATHNAME)
    }
  }, [username, pathname])
}

export default useNavPage
