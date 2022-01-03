import { fireEvent, getByTestId, getByText, render, waitForElement } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
import userApi from '../api/user'
import { act } from 'react-dom/test-utils'

const loginResponse = {
  data: { message: 'This is just a test.' }
}

describe('Sign in form', () => {
  beforeEach(() => {
    userApi.doLogin = jest.fn().mockResolvedValue(loginResponse)
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )
  })

  it('Renders', () => {
    expect(getByText(document.body, /Please sign in to access all features./i)).toBeInTheDocument()
  })

  it('Does not submit when no data filled in', async () => {
    fireEvent.click(getByTestId(document.body, 'submit'))
    expect(getByText(document.body, /Please fill in login details/i)).toBeInTheDocument()
    expect(userApi.doLogin).not.toHaveBeenCalled()
  })

  it('Submits when data filled in', async () => {
    fireEvent.change(getByTestId(document.body, 'username'), { target: { value: 'testUser' } })
    fireEvent.change(getByTestId(document.body, 'password'), { target: { value: 'testPassword' } })
    act(() => {
      fireEvent.click(getByTestId(document.body, 'submit'))
    })
    waitForElement(() => {
      expect(userApi.doLogin).toHaveBeenCalledTimes(1)
    })
  })
})
