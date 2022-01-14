import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { News } from '@switch-codes/common/entities'

export interface NewsState {
  loading: boolean;
  news: News[];
}

const initialState: NewsState = {
  loading: true,
  news: []
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state: NewsState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setNews: (state: NewsState, action: PayloadAction<News[]>) => {
      state.news = action.payload
    },
    reset: () => initialState
  }
})

export const { setLoading, setNews, reset } = newsSlice.actions
export const selectNews = (state: RootState): NewsState => state.news

export default newsSlice.reducer
