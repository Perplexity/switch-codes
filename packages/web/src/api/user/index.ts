import { User } from '@switch-codes/common/entities'
import axios from 'axios'
import { UnauthorizedUser } from '../../errors'

const doLogin = (username: string, password: string) => {
  return axios.post('/auth', {
    username,
    password
  })
}

const getMyUser = async (): Promise<User | undefined> => {
  try {
    const result = await axios.get('/user/me')
    return result.data as User
  } catch (ex: any) {
    if (ex.response.status === 401) {
      throw new UnauthorizedUser()
    }
    throw new Error(ex)
  }
}

export default { doLogin, getMyUser }
