/**
 * @description 问卷组件标题
 */

import Component from './component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './type'

export * from './type'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component, // 当前的组件 画布显示
  PropComponent, // 修改属性 右侧显示
  defaultProps: QuestionTitleDefaultProps,
}
