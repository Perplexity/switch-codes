import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

test('renders sign in page by default', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )

  expect(getByText(/Please sign in to access all features./i)).toBeInTheDocument()
})
