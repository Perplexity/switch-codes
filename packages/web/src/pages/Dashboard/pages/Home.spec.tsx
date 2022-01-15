import { getByText, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Home from './Home'
import { store } from '../../../app/store'
import * as news from '../../../hooks/news'
import moment from 'moment'

const useNewsFixture = require('../../../spec/fixtures/useNews.json')
useNewsFixture.news[0].timestamp = moment().subtract(5, 'minutes').toDate()

let useNews: jest.SpyInstance

describe('Home page', () => {
  it('renders', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(getByText(document.body, /News & announcements/i)).toBeInTheDocument()
  })

  it('shows news articles', () => {
    useNews = jest.spyOn(news, 'useNews').mockImplementation(() => useNewsFixture)
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(useNews).toHaveBeenCalledTimes(1)
    expect(getByText(document.body, /5 minutes ago/i)).toBeInTheDocument()
    expect(getByText(document.body, /Hello and welcome to the website, this is just a test./i)).toBeInTheDocument()
  })
})
