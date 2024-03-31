import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './index.module.scss'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType } from '@/components/QuestionComponents'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
import { ComponentInfoType, changeSelectedId, moveComponent } from '@/store/componentsReducer'

type PropsType = {
  loading: boolean
}

// 生成组件
function genComponent(component: ComponentInfoType) {
  const { type, props } = component
  // 通过组件类型获得组件实例
  const componentCof = getComponentConfByType(type)
  // 找不到
  if (!componentCof) return null

  // 拿到当前type所对应的组件实例
  const { Component } = componentCof
  // 返回组件实例 以及向里面传入相对应的数据 如果没有则显示默认数据
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props
  // 获得后端返回的组件列表
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    // 因为我们需要点击到父元素上时取消选中 但是由于事件冒泡会传给父元素
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  // 绑定快捷键
  useBindCanvasKeyPress()
  // 页面加载时 显示的loading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  // 结束拖拽时
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
    //console.log('handleDragEnd', oldIndex, newIndex)
  }
  // 因为SortableContainer需要数据项中都有id
  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.id,
    }
  })
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {/* 过滤掉要隐藏的组件 */}
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { id, isLocked } = c
            // 拼接class name
            // 设置默认的类名
            const wrapperDefaultClassName = styles['component-wrapper']
            // 设置选中时的类名
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            // 判断当前的id是否等于选中的id，如果相等则设置选中时的类名，否则设置默认的类名
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: id === selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={id} id={id}>
                <div key={id} className={wrapperClassName} onClick={e => handleClick(e, id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
