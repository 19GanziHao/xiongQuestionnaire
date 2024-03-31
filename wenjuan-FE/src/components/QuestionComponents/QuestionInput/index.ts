/**
 * @description 问卷组件输入框
 */

import Component from './component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './type'

export * from './type'

// Input组件的配置
export default {
  title: '输入框',
  type: 'questionInput',
  Component, // 当前的组件 画布显示
  PropComponent, // 修改属性 右侧显示
  defaultProps: QuestionInputDefaultProps,
}
