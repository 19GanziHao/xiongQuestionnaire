import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { ROUTERCONSTANT } from '../../constant'
import { useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../../utils/userToken'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/userReducer'

const UserInfo: React.FC = () => {
  // 获取用户信息
  const { username, nickname } = useGetUserInfo()
  const nav = useNavigate()

  const dispatch = useDispatch()
  // 退出登录
  const layout = () => {
    dispatch(logoutReducer())
    removeToken() // 清除token 下一次请求头中就不带有token了
    message.success('退出成功!')
    nav('/')
  }

  // 登录成功时
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname || username}
      </span>
      <Button type="link" onClick={layout}>
        退出
      </Button>
    </>
  )

  // 未登录
  const Login = (
    <Link to={ROUTERCONSTANT.LOGIN_PATHNAME} className={styles.login}>
      登录
    </Link>
  )
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
