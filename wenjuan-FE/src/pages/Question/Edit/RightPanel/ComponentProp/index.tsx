import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '@/components/QuestionComponents/index'
import { changeComponentProps } from '@/store/componentsReducer'
/**
 * 当没有选中组件时返回
 * @returns
 */

const ComponentProp: FC = () => {
  // 使用useGetComponentInfo获取当前选中的组件
  const { selectedComponent } = useGetComponentInfo()
  // 使用useDispatch获取dispatch
  const dispatch = useDispatch()

  // 改变属性
  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { id } = selectedComponent
    dispatch(changeComponentProps({ id, newProps }))
  }

  // 通过类型获取组件配置 来拿到propComponent渲染
  const { type = '', props, isLocked } = selectedComponent || {}
  const componentCof = getComponentConfByType(type)
  const { PropComponent } = componentCof || {}
  if (!PropComponent)
    return (
      <>
        <div>错误</div>
      </>
    )
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp
