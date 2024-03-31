import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './type'
import { Form, Input } from 'antd'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleChangeValue() {
    onChange && onChange(form.getFieldsValue())
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc }}
      disabled={disabled}
      onValuesChange={handleChangeValue}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
