export type OptionType = {
  label: string
  value: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: Array<OptionType>
  defaultVale?: string
  // 用于PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选框标题',
  isVertical: false,
  options: [
    {
      label: '选项1',
      value: 'item1',
    },
    {
      label: '选项2',
      value: 'item2',
    },
    {
      label: '选项3',
      value: 'item3',
    },
  ],
  defaultVale: '',
}

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
