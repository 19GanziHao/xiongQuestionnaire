import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import styles from './index.module.scss'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLocked,
  moveComponent,
} from '@/store/componentsReducer'
import SortableItem from '@/components/DragSortable/SortableItem'

const Layers: React.FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  // 记录当前正在修改标题的组件
  const [changTitleId, setChangeTitleId] = useState('')
  const dispatch = useDispatch()
  // 点击图层时选中当前组件 已经选中时再点击则变成输入框进行修改
  function handleTitleClick(id: string) {
    const cur = componentList.find(item => item.id === id)
    if (cur && cur.isHidden) {
      message.info('该组件已隐藏，无法点击')
      return
    }
    // 说明这是第一次选中它 不需要变成输入框
    if (id !== selectedId) {
      // 进行redux来修改selectedId
      dispatch(changeSelectedId(id))
      setChangeTitleId('')
      return
    }
    // 到了这里说明就是在选中的基础上进行点击 那么变为输入框
    setChangeTitleId(id)
  }
  // 修改组件标题
  function handleChangTitle(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.trim()
    if (!newValue) return
    if (!selectedId) return

    // 提交给redux
    dispatch(changeComponentTitle({ id: selectedId, title: newValue }))
  }

  // 点击隐藏按钮
  function handleHiddenClick(id: string) {
    const cur = componentList.find(c => c.id === id)
    if (cur) dispatch(changeComponentHidden({ id, isHidden: !cur.isHidden }))
  }

  // 点击锁定按钮
  function handleLockClick(id: string) {
    dispatch(toggleComponentLocked({ id }))
  }
  // 结束拖拽时
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
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
      {componentList.map(item => {
        const { id, title, isHidden, isLocked } = item

        const baseStyle = styles.title
        const selectedStyle = styles.selected
        const titleStyle = classnames({
          [baseStyle]: true,
          [selectedStyle]: id === selectedId,
        })
        return (
          <SortableItem key={id} id={id}>
            <div className={styles.wrapper}>
              <div className={titleStyle} onClick={() => handleTitleClick(id)}>
                {(id === changTitleId && (
                  <Input
                    value={title}
                    onChange={handleChangTitle}
                    onPressEnter={() => setChangeTitleId('')}
                    onBlur={() => setChangeTitleId('')}
                  />
                )) ||
                  title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'default'}
                    onClick={() => handleHiddenClick(id)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'default'}
                    onClick={() => handleLockClick(id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
