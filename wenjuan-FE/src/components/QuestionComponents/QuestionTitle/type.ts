// 标题组件的类型
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
  // 用于锁定组件时禁用表单
  disabled?: boolean
}

// 默认的类型
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
