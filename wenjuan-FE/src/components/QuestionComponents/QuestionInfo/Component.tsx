import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './type'

const { Title, Paragraph } = Typography

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  // 把默认值设置上
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props }

  const descTextList = desc?.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList?.map((d, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {d}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default Component
