import React, { FC, useEffect } from 'react'
import { Form, Checkbox, Input } from 'antd'
import { QuestionParagraphPropsType } from './type'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, disabled, onChange } = props
  // 获取form实例
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  // 提交给redux 让他对props进行更改
  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleChange}
    >
      <Form.Item label="内容" name="text" rules={[{ required: true, message: '请输入内容' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item label="居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
