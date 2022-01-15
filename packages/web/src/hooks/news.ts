import { useEffect, useState } from 'react'
import { getNews } from '../api/news'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { NewsState, selectNews, setLoading, setNews } from '../slices/newsSlice'

export const useNews = (): NewsState => {
  const dispatch = useAppDispatch()
  const newsState = useAppSelector(selectNews)
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (newsState.loading) {
        try {
          const response = await getNews()
          dispatch(setNews(response.data))
          dispatch(setLoading(false))
        } catch (err: any) {
          setError(true)
        }
      }
    })()
  }, [])

  return newsState
}
