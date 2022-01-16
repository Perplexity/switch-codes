import { UserState } from '../../../slices/userSlice'

export const getLoggedInUserData = (): UserState => {
  return {
    loading: false,
    user: {
      id: 0,
      username: 'TestUser',
      password: 'TestPassword',
      email: 'Test@Test.com'
    }
  }
}
