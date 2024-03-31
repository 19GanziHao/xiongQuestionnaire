import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

// 初始值
const INIT_STATE: UserStateType = {
  username: localStorage.getItem('username') || '',
  nickname: localStorage.getItem('nickname') || '',
}

export const userSlice = createSlice({
  name: 'user', // 模块名
  initialState: INIT_STATE,
  reducers: {
    // 登录
    loginReducer(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload // 设置username 和 nickname 到 redux store中
    },
    // 退出 退出登录只需要清空数据就行
    logoutReducer() {
      localStorage.removeItem('username')
      localStorage.removeItem('nickname')
      return INIT_STATE
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
