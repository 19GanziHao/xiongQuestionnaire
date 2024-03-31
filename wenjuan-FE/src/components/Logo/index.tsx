import React, { FC, useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { ROUTERCONSTANT } from '../../constant'
const { Title } = Typography
const Logo: FC = () => {
  // 获取用户信息
  const { username } = useGetUserInfo()
  // 通过用户名来判断用户是否登录 如果登录 则点击跳转'我的问卷列表' 否则跳转首页
  const [pathname, setPathname] = useState('/')

  useEffect(() => {
    // 判断是否登录
    if (username) setPathname(ROUTERCONSTANT.MANAGE_LIST_PATHNAME)
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>调查问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
