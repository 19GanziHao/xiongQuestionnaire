import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioDefaultProps, QuestionRadioPropsType, OptionType } from './type'

const { Paragraph } = Typography

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title,
    isVertical,
    options = [],
    defaultVale,
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={defaultVale}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.toString()}
          {options.map((item: OptionType) => {
            return (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
