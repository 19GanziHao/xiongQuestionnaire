import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Flex, message } from 'antd'
import { useRequest } from 'ahooks'
import { PlusCircleOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { createQuestionService } from '../../services/question'
//import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  //TODO useLoadUserData() // 获取用户信息
  useNavPage() // 根据登录状态判断指定页面是否能访问
  const {
    loading,
    run: handleCreateClick,
    //error,
  } = useRequest(createQuestionService, {
    manual: true, // 手动调用请求
    onSuccess(result) {
      // 返回的就是一个id
      console.log(result)
      nav(`/question/edit/${result}`)
      message.success('创建成功!')
    },
    onError() {
      message.error('创建失败!')
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex gap="middle" wrap="wrap">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Flex>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
