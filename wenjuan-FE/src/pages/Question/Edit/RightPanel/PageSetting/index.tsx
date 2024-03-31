import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { resetPageInfo } from '@/store/PageInfoReducer'
const { TextArea } = Input

const PageSetting: React.FC = () => {
  // 获取页面信息
  const { title, desc, js, css } = useGetPageInfo()
  // 使用useForm()获取表单实例
  const [form] = Form.useForm()
  // 使用useDispatch()获取dispatch函数
  const dispatch = useDispatch()
  // 当title, desc, js, css发生变化时，将表单值设置为页面信息
  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  // 当表单值发生变化时，调用dispatch函数，将表单值传入，重置页面信息
  function handleValueChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      form={form}
      initialValues={{ title, desc, js, css }}
      onValuesChange={handleValueChange}
      layout="vertical"
    >
      <Form.Item
        name="title"
        label="页面标题"
        rules={[{ required: true, message: '请输入页面标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="页面描述">
        <TextArea />
      </Form.Item>
      <Form.Item name="js" label="页面脚本">
        <TextArea />
      </Form.Item>
      <Form.Item name="css" label="页面样式">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
