import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user/user'
import { loginReducer } from '../store/userReducer'
const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()
  // ajax请求 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    // 存储到redux中
    onSuccess(res) {
      const { username, nickname } = res
      // 存储
      // TODO
      dispatch(loginReducer({ username, nickname }))
    },
    // 不管成功还是失败 都要把等待状态改为false
    onFinally() {
      setWaitingUserData(false)
    },
  })

  const { username } = useGetUserInfo()
  // 判断当前redux store中是否已经存在用户信息
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run() //请求用户信息
  }, [username])

  return waitingUserData
}

export default useLoadUserData
