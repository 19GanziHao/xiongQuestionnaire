/**
 * @description 段落组件
 * @author Gzh
 */
import Component from './component'
import { QuestionParagraphDefaultProps } from './type'
import PropComponent from './PropComponent'
export * from './type'

// Paragraph组件的配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
