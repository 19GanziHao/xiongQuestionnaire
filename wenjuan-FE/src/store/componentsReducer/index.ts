import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import clonedeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
// import { produce } from 'immer' @reduxjs/toolkit自带immer
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './util'
export type ComponentInfoType = {
  id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponents: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponents: null,
  // 其他扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    /**
     * 重置所有组件
     * @param state
     * @param action
     * @returns
     */
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    /**
     * 修改selectedId
     * @param state
     * @param action
     */
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    /**
     * 添加新组件
     * @param state
     * @param action
     */
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      // 需添加的新组件
      const newComponent = action.payload
      insertNewComponent(state, newComponent)
    },
    /**
     * 修改props
     * @param state
     * @param action
     */
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; newProps: ComponentPropsType }>
    ) => {
      const { id, newProps } = action.payload
      const { componentList } = state
      // 找到需要修改的组件
      const changeComponent = componentList.find(c => c.id === id)
      if (changeComponent) changeComponent.props = { ...changeComponent.props, ...newProps }
    },
    /**
     * 删除选中的组件
     * @param state
     */
    removeSelectedComponent: (state: ComponentsStateType) => {
      // 获取当前draft中的组件列表和选中的id
      const { componentList = [], selectedId } = state
      // 找到选中的id在组件列表中的索引
      const index = componentList.findIndex(c => c.id === selectedId)
      const nextSelectedId = getNextSelectedId(selectedId, componentList)
      state.selectedId = nextSelectedId
      // 从组件列表中删除选中的id
      componentList.splice(index, 1)
    },
    /**
     * 隐藏/显示组件
     * @param state
     * @param action
     */
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; isHidden: boolean }>
    ) => {
      const { id, isHidden } = action.payload
      // 根据action.payload中的fe_id和hidden，修改state中的componentList中的hidden属性
      const { componentList } = state

      let newSelectedId = ''
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedId(id, componentList)
      } else {
        // 要显示 我们就让它自动选中显示的那个组件
        newSelectedId = id
      }
      state.selectedId = newSelectedId
      const changeComponent = componentList.find(c => c.id === id)
      if (changeComponent) changeComponent.isHidden = isHidden
    },
    /**
     * 切换组件的锁定和解锁
     * @param state
     * @param action
     */
    toggleComponentLocked: (state: ComponentsStateType, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      const { componentList } = state
      const changeComponent = componentList.find(c => c.id === id)

      // 如果找到对应的组件，则将其锁定状态取反
      if (changeComponent) changeComponent.isLocked = !changeComponent.isLocked
    },
    /**
     * 复制当前选中的组件
     * @param state
     * @returns
     */
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      if (!selectedId) return
      const selectedComponent = componentList.find(c => c.id === selectedId)
      if (selectedComponent) state.copiedComponents = clonedeep(selectedComponent)
    },
    /**
     * 粘贴组件
     * @param state
     * @returns
     */
    pasteCopiedComponent: (state: ComponentsStateType) => {
      if (!state.copiedComponents) return
      const { copiedComponents } = state
      // 因为之前是直接深拷贝的组件 其中fe_id还没修改
      copiedComponents.id = nanoid()
      insertNewComponent(state, copiedComponents)
    },
    /**
     * 选中上一个
     * @param state
     */
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedIdIndex = componentList.findIndex(c => c.id === selectedId)
      // 说明未选中组件
      if (selectedIdIndex < 0) return
      // 说明已经到达了第一个
      if (selectedIdIndex === 0) return

      state.selectedId = componentList[selectedIdIndex - 1].id
    },
    /**
     * 选中下一个
     * @param state
     */
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedIdIndex = componentList.findIndex(c => c.id === selectedId)
      if (selectedIdIndex < 0) return // 未选中组件
      if (selectedIdIndex === componentList.length - 1) return // 已经选中了最后一个
      state.selectedId = componentList[selectedIdIndex + 1].id
    },
    /**
     * 修改组件标题
     * @param state
     * @param action
     */
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const { componentList } = state
      const { id, title } = action.payload
      const cur = componentList.find(c => c.id === id)
      if (!cur) return
      cur.title = title
    },
    /**
     * 移动组件位置
     * @param state
     * @param action
     * @returns
     */
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(componentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
