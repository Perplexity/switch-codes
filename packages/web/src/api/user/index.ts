import axios from 'axios'

const doLogin = (username: string, password: string) => {
  return axios.post('api/auth', {
    username,
    password
  })
}

export default { doLogin }
