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
    const useNewsFixture = require('../../spec/fixtures/useNews.json')
    const moment = require('moment')
    useNewsFixture.news[0].timestamp = moment().subtract(5, 'minutes').toDate()
    return useNewsFixture
  }
}))

describe('Dashboaard page', () => {
  beforeEach(() => {
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
    useParams = jest.spyOn(router, 'useParams').mockImplementation(() => ({ page: 'home' }))
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
