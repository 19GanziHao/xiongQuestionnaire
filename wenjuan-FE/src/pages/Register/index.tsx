import React, { FC } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { Space, Typography, Form, Checkbox, Input, Button, message } from 'antd'
import useTitle from '../../hooks/useTitle'
import { Link, useNavigate } from 'react-router-dom'
import { registerService } from '../../services/user/user'
import { ROUTERCONSTANT } from '../../constant'
import styles from './index.module.scss'
import { useRequest } from 'ahooks'

const { Title } = Typography

type FieldType = {
  username?: string
  password?: string
  remember?: string
  nickname?: string
  confirm?: string
}
const Register: FC = () => {
  // 跳转路由
  const nav = useNavigate()

  const { run: handleSubmit } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功!')
        nav(ROUTERCONSTANT.LOGIN_PATHNAME)
      },
    }
  )

  const onFinish = (values: FieldType) => {
    handleSubmit(values)
  }
  useTitle('注册')
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
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
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入您的昵称!' }]}
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
            label="确认密码"
            name="confirm"
            dependencies={['password']} // 依赖于password
            rules={[
              { required: true, message: '请再次输入密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password')) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
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
                Submit
              </Button>
              <Link to={ROUTERCONSTANT.LOGIN_PATHNAME}>已有账号, 登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
