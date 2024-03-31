/**'
 * @description 组件信息
 * @author Gzh
 */
import Component from './Component'
import { QuestionInfoDefaultProps } from './type'
import PropComponent from './PropComponent'

export * from './type'

// 组件信息配置
export default {
  title: '信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
