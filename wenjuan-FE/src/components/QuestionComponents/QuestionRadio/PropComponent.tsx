/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { QuestionRadioPropsType, OptionType } from './type'
const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options, defaultVale, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, defaultVale })
  }, [title, isVertical, options, defaultVale])

  function handleChangeValue() {
    if (onChange) {
      //onChange(form.getFieldsValue())
      const newValues = form.getFieldsValue() as QuestionRadioPropsType
      const { options = [] } = newValues
      options.forEach(item => {
        item.value = item.label
      })
      onChange(newValues)
    }
  }

  return (
    <Form
      form={form}
      initialValues={{ title, isVertical, options, defaultVale }}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleChangeValue}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, value) {
                            const { options = [] } = form.getFieldsValue()
                            console.log(value, options)
                            let num = 0
                            options.forEach((item: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ label: '', value: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="defaultVale">
        <Select value={defaultVale} options={options}></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
