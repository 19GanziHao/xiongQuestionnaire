// 标题组件的类型
export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionTextareaPropsType) => void
  // 用于锁定组件时禁用表单
  disabled?: boolean
}

// 默认的类型
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入框标题',
  placeholder: '请输入...',
}
