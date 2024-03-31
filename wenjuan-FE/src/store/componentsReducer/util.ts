import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获得下一个selectedId
 * @param id 当前选中的id
 * @param componentList 组件列表
 * @returns 返回下一个的selectedId
 */
export function getNextSelectedId(id: string, componentList: ComponentInfoType[]): string {
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.id === id)
  if (index < 0) return ''
  let newSelectedId = ''
  if (visibleComponentList.length <= 1) {
    // 说明长度就一个 被删除了 就没有了
    newSelectedId = ''
  } else {
    // 组件长度大于1
    if (index + 1 === visibleComponentList.length) {
      // 说明要删除的是最后一个 就选中上一个
      newSelectedId = visibleComponentList[index - 1].id
    } else {
      // 说明要删除额不是最后一个 那么就选中下一个
      newSelectedId = visibleComponentList[index + 1].id
    }
  }
  return newSelectedId
}

/**
 * 插入新组件
 * @param state
 * @param newComponent
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  // 需要将新组件插入到选中组件的下一个 所以需要通过选中的selectedId来找到下一个的位置
  const index = componentList.findIndex(c => c.id === selectedId)

  if (index < 0) {
    // 说明没有选中任何组件 默认插入到最后
    // 默认将当给选中状态设置到新加入的组件
    state.selectedId = newComponent.id
    componentList.push(newComponent)
  } else {
    // 默认将当给选中状态设置到新加入的组件
    state.selectedId = newComponent.id
    componentList.splice(index + 1, 0, newComponent)
  }
}
