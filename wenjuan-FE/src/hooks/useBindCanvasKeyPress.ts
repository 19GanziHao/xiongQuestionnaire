import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoOrRedoActionCreators } from 'redux-undo'
import {
  copySelectedComponent,
  removeSelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'

/**
 * 判断activeElement是否合法
 */
const isActiveElementValid = () => {
  const activeElement = document.activeElement
  // 没有增加dnd-kit之前
  //if (activeElement === document.body) return true

  // 增加了dnd-kit之后
  if (activeElement === document.body) return true
  if (activeElement?.matches('div[role="button"]')) return true
  return false
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    dispatch(selectNextComponent())
  })

  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      dispatch(UndoOrRedoActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )
  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      dispatch(UndoOrRedoActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
