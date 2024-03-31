import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './index.module.scss'
import Logo from '../../components/Logo'
import UserInfo from '../../components/UserInfo'
// import useLoadUserData from '../../hooks/useLoadUserData'
import useNavPage from '../../hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  //TODO useLoadUserData() // 获取用户信息
  useNavPage() // 根据登录状态判断指定页面是否能访问
  return (
    <Layout>
      <Header className={styles.header}>
        <div>
          <Logo />
        </div>
        <div>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>调查问卷 &copy;2023 - present. Created by 甘梓豪</Footer>
    </Layout>
  )
}

export default MainLayout
