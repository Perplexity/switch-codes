import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { User } from '@switch-codes/common/entities'

export interface UserState {
  loading: boolean;
  user: User | undefined;
}

const initialState: UserState = {
  loading: true,
  user: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    },
    reset: () => initialState
  }
})

export const { setLoading, setUser, reset } = userSlice.actions
export const selectUser = (state: RootState): UserState => state.user

export default userSlice.reducer
