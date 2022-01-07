import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useIsAuthed } from '../hooks/isAuthed'
import { selectUser, setLoading, setUser } from '../slices/userSlice'
import userApi from '../api/user'
import { UnauthorizedUser } from '../errors'

const DashboardLayout = () => {
  const isAuthed = useIsAuthed()
  const [isError, setError] = useState<boolean>(false)
  const [cookies, , removeCookie] = useCookies(['auth_token'])
  const { auth_token } = cookies
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)

  if (isAuthed) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${auth_token}`
    }
  }

  useEffect(() => {
    (async () => {
      if (isAuthed) {
        if (userState.loading) {
          try {
            const user = await userApi.getMyUser()
            dispatch(setUser(user))
            dispatch(setLoading(false))
            // TURN ABOVE INTO HOOK
          } catch (err: any) {
            if (err instanceof UnauthorizedUser) {
              removeCookie('auth_token')
            } else {
              setError(true)
              // CREATE API ERROR PAGE
            }
          }
        }
      }
    })()
  }, [])

  return !isAuthed ? <Navigate to="/login" /> : <Outlet />
}

export default DashboardLayout
