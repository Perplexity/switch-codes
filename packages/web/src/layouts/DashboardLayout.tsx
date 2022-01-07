import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router'
import { useIsAuthed } from '../hooks/isAuthed'

const DashboardLayout = () => {
  const isAuthed = useIsAuthed()
  const [cookies] = useCookies(['auth_token'])
  const { auth_token } = cookies

  if (isAuthed) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${auth_token}`
    }
  }

  return !isAuthed ? <Navigate to="/login" /> : <Outlet />
}

export default DashboardLayout
