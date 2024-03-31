import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './type'

const PropComponent: React.FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  function handleChangeValue() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
      const { list = [] } = newValues
      list.forEach(item => {
        if (item.value) return
        item.value = nanoid(5)
      })
      onChange(newValues)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChangeValue}
      disabled={disabled}
      initialValues={{ title, isVertical, list }}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 是否选中 */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, value) {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((item: OptionType) => {
                              if (item.label === value) num++
                            })
                            // num为1 说明只有他自己一个 不然就有多个
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>
                    {/* 当前选项 删除按钮 */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ value: '', text: '', checkbox: false })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
