import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './type'
const PropComponent: FC<QuestionInputPropsType> = ({ title, placeholder, onChange, disabled }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  // 提交给redux 让他对props进行更改
  function handleChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
