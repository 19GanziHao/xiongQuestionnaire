export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  // 用于PropComponent
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问题标题',
  desc: '问题描述',
}
