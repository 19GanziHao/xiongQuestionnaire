/**
 * @description 问卷 多选组件
 * @author Gzh
 */

import Component from './Component'
import { QuestionCheckboxDefaultProps } from './type'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'

export * from './type'

// 多选组件基础配置
export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
}
