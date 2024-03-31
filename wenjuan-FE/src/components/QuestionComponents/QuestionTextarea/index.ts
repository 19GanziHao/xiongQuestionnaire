/**
 * @description 问卷组件 多行输入
 * @author Gzh
 */

import Component from './component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './type'

export * from './type'

// Textarea组件的配置
export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component, // 当前的组件 画布显示
  PropComponent, // 修改属性 右侧显示
  defaultProps: QuestionTextareaDefaultProps,
}
