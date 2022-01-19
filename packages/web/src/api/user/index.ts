import { User } from '@switch-codes/common/entities'
import { LoginRequest } from '@switch-codes/common/types'
import axios from 'axios'
import { UnauthorizedUser } from '../../errors'

export const doLogin = (username: string, password: string, recaptchaToken: string) => {
  return doLoginRequest({
    username,
    password,
    recaptchaToken
  })
}

const doLoginRequest = ({ username, password, recaptchaToken }: LoginRequest) => {
  return axios.post('/auth', {
    username,
    password,
    recaptchaToken
  })
}

export const getMyUser = async (): Promise<User | undefined> => {
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
