import { useCookies } from 'react-cookie'

export const useIsAuthed = () => {
  const [cookies] = useCookies()
  const { auth_token } = cookies
  return auth_token !== undefined
}
