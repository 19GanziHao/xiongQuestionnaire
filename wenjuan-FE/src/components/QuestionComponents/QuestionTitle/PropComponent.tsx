import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './type'
const PropComponent: FC<QuestionTitlePropsType> = ({
  text,
  level,
  isCenter,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm() // 获取表单实例

  // 当表单数据变化时，及时通知redux也进行组件数据的改变
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  /**
   * 表单内容修改后将新值传入父组件 父组件进行redux更新
   */
  function handleChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
