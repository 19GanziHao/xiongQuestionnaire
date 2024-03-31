/***
 * @description 问卷 单选组件
 * @author Gzh
 */

import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './type'

export * from './type'

// Radio组件的基本配置
export default {
  title: '单选组件',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent, // 统计组件
}
