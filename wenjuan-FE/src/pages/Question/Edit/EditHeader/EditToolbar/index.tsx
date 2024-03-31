import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoOrRedoActionCreators } from 'redux-undo'
import {
  changeComponentHidden,
  removeSelectedComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '@/store/componentsReducer'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

const EditTool: FC = () => {
  const dispatch = useDispatch()
  const {
    selectedId,
    selectedComponent,
    copiedComponents,
    componentList = [],
  } = useGetComponentInfo() // 获取组件的信息
  const { isLocked } = selectedComponent || {}
  const selectedIndex = componentList.findIndex(c => c.id === selectedId)
  const isFirst = selectedIndex <= 0 // 是第一个
  const isLast = selectedIndex >= componentList.length - 1

  function handleDelete() {
    // 删除组件
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    // 隐藏组件
    dispatch(changeComponentHidden({ id: selectedId, isHidden: true }))
  }
  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ id: selectedId }))
  }
  // 复制
  function handleCopy() {
    dispatch(copySelectedComponent())
  }
  // 粘贴
  function handlePaste() {
    dispatch(pasteCopiedComponent())
  }
  // 上移
  function handleMoveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  // 下移
  function handleMoveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  // 撤销
  function handleUndo() {
    dispatch(UndoOrRedoActionCreators.undo())
  }
  function handleRedo() {
    dispatch(UndoOrRedoActionCreators.redo())
  }
  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLock}
            type={isLocked ? 'primary' : 'default'}
          />
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={handlePaste}
            disabled={copiedComponents === null}
          />
        </Tooltip>
        <Tooltip title="上移">
          <Button shape="circle" icon={<UpOutlined />} onClick={handleMoveUp} disabled={isFirst} />
        </Tooltip>
        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={handleMoveDown}
            disabled={isLast}
          />
        </Tooltip>
        <Tooltip title="撤销">
          <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo} />
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo} />
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditTool
