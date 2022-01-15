import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser, setLoading, setUser, UserState } from '../slices/userSlice'
import { UnauthorizedUser } from '../errors'
import { useCookies } from 'react-cookie'
import { getMyUser } from '../api/user'

export const useUser = (): UserState => {
  const [, , removeCookie] = useCookies(['auth_token'])
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (userState.loading) {
        try {
          const user = await getMyUser()
          dispatch(setUser(user))
          dispatch(setLoading(false))
        } catch (err: any) {
          if (err instanceof UnauthorizedUser) {
            removeCookie('auth_token')
          } else {
            setError(true)
            // CREATE API ERROR PAGE
          }
        }
      }
    })()
  }, [])

  return userState
}
