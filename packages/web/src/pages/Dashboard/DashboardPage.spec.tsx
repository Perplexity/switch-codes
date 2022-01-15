import { getByText, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import * as router from 'react-router'
import * as user from '../../hooks/user'
import DashboardPage from './DashboardPage'
import { BrowserRouter } from 'react-router-dom'

let useParams: jest.SpyInstance
let useUser: jest.SpyInstance

jest.mock('../../hooks/news', () => ({
  useNews: () => {
    const moment = require('moment')
    return {
      loading: false,
      news: [{ id: 1, title: 'Welcome', content: 'Hello and welcome to the website, this is just a test.', timestamp: moment().subtract(5, 'minutes').toDate() }]
    }
  }
}))

describe('Dashboard page', () => {
  beforeEach(() => {
    useParams = jest.spyOn(router, 'useParams').mockImplementation(() => ({ page: 'home' }))
    useUser = jest.spyOn(user, 'useUser').mockImplementation(() => (
      {
        loading: false,
        user: {
          id: 0,
          username: 'TestUser',
          password: 'TestPassword',
          email: 'Test@Test.com'
        }
      }
    ))
  })
  it('renders home page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardPage />
        </Provider>
      </BrowserRouter>
    )
    expect(useParams).toBeCalled()
    expect(useUser).toBeCalled()
    expect(getByText(document.body, /5 minutes ago/i)).toBeInTheDocument()
    expect(getByText(document.body, /Hello and welcome to the website, this is just a test./i)).toBeInTheDocument()
  })
})
