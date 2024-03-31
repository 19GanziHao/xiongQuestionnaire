import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoStateType = {
  title?: string
  desc?: string
  js?: string
  css?: string
  isPublished?: number
}

const INIT_STATE: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    /**
     * 初始化单个问卷信息
     * @param state
     * @param action
     * @returns
     */
    resetPageInfo: (state: PageInfoStateType, action: PayloadAction<PageInfoStateType>) => {
      return action.payload
    },
    /**
     * 修改标题
     * @param state
     * @param action
     */
    changeTitle: (state: PageInfoStateType, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
