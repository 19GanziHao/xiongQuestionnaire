import { configureStore } from '@reduxjs/toolkit'
// 进行撤回的功能的包
import undoable, { StateWithHistory, excludeAction } from 'redux-undo'

import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import PageInfoReducer, { PageInfoStateType } from './PageInfoReducer'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    user: userReducer, // 一个个模块
    components: undoable(componentsReducer, {
      limit: 20, // 保存20次记录
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: PageInfoReducer,
    // ....
  },
})
