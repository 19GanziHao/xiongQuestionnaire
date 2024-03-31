// 标题组件的类型
export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionInputPropsType) => void
  // 用于锁定组件时禁用表单
  disabled?: boolean
}

// 默认的类型
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
}
