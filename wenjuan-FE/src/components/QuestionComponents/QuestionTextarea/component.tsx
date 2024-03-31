import React, { FC } from 'react'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './type'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const Component: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title = '', placeholder = '' } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default Component
