import React from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './type'

const { Paragraph } = Typography

const Component: React.FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(item => {
          const { value, label, checked } = item
          return (
            <Checkbox checked={checked} key={value}>
              {label}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
