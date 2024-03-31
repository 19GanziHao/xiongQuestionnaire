export type OptionType = {
  value: string
  label: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: Array<OptionType>
  // 用于PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选框标题',
  isVertical: false,
  list: [
    { value: 'item1', label: '选项1', checked: false },
    { value: 'item2', label: '选项2', checked: false },
    { value: 'item3', label: '选项3', checked: false },
  ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
