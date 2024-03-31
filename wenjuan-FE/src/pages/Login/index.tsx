import React, { FC, useEffect } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import useTitle from '../../hooks/useTitle'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTERCONSTANT } from '../../constant/index'
import { useRequest } from 'ahooks'
import { loginService } from '../../services/user/user'
import { setToken } from '../../utils/userToken'
import { loginReducer } from '@/store/userReducer'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

// 存储用户数据到localStorage中
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
// 删除用户数据
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
// 获取用户数据
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}
type FieldType = {
  username: string
  password: string
  remember: string
}
const Login: FC = () => {
  useTitle('登录')
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const nav = useNavigate()
  // 自动填充用户名和密码
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({
      username,
      password,
    })
  }, [])

  // 登录请求
  const { run: handleLogin } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { token, username, nickname } = res
        console.log(nickname)
        setToken(token)
        localStorage.setItem('username', username)
        localStorage.setItem('nickname', nickname ?? '')
        dispatch(loginReducer({ username, nickname }))
        message.success('登录成功!')
        nav(ROUTERCONSTANT.MANAGE_LIST_PATHNAME)
      },
    }
  )

  // 确认登录
  const onFinish = (values: FieldType) => {
    const { username, password, remember } = values
    handleLogin(username, password)

    if (remember) {
      // 用户选择记住用户名和密码
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} form={form}>
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入您的用户名!' },
              { type: 'string', min: 5, message: '用户名不得少于5位!' },
              { pattern: /^\w+/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入您的密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={ROUTERCONSTANT.REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
