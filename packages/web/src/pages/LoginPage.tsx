import React, { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import SwitchLogo from '../assets/switch-logo.png'
import { Button, TextBox } from '../components/Form'
import { useCookies } from 'react-cookie'
import { useIsAuthed } from '../hooks/isAuthed'
import moment from 'moment'
import { doLogin } from '../api'
import ReCAPTCHA from 'react-google-recaptcha'

type InputChange = React.ChangeEvent<HTMLInputElement>

const LoginPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const [, setCookie] = useCookies(['auth_token'])

  const isAuthed = useIsAuthed()

  const onUsernameChange = (e: InputChange) => {
    setUsername(e.currentTarget.value)
  }

  const onPasswordChange = (e: InputChange) => {
    setPassword(e.currentTarget.value)
  }

  const onRememberChange = (e: InputChange) => {
    setRemember(e.currentTarget.checked)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please fill in login details.')
      return
    }
    await submitLogin()
  }

  const submitLogin = async () => {
    setError(undefined)
    setLoading(true)
    let recaptchaToken = null
    if (recaptchaRef.current) {
      recaptchaToken = await recaptchaRef.current.executeAsync()
      if (!recaptchaToken) {
        setError('There was an error with the CAPTCHA. Please try again.')
      }
    } else {
      setError('There was an error with the CAPTCHA. Please try again.')
    }
    doLogin(username, password, recaptchaToken ?? '').then((response) => {
      const { token } = response.data
      if (token) {
        setCookie('auth_token', token, { path: '/', expires: remember ? undefined : moment().add(1, 'hour').toDate() })
      } else {
        setError('Something went wrong. Please try again.')
      }
    }).catch((err) => {
      setError(err.response.data.error)
    }).finally(() => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
      setLoading(false)
    })
  }

  return isAuthed
    ? <Navigate to="/dashboard/home" />
    : (
      <div className="flex h-screen">
        <div className="m-auto w-full sm:w-5/6 lg:w-2/4 xl:w-1/3">
          <div className="flex justify-center"><img src={SwitchLogo} className="w-32 h-32" alt="switch-logo" /></div>
          <form onSubmit={onSubmit} data-testid='form'>
            <div className="bg-white shadow-lg drop-shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4">
              <div className='flex flex-col gap-2 text-center'>
                <p className="text-4xl font-bold">Sign in</p>
                <p className='text-sm'>Please sign in to access all features.</p>
              </div>
              <div className="divider m-0" />
              <div>
                <TextBox id="username" type="text" placeholder="Username" required value={username} onChange={onUsernameChange} data-testid='username' />
              </div>
              <div>
                <TextBox id="password" type="password" placeholder="Password" required value={password} onChange={onPasswordChange} data-testid='password' />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" id="rememberMe" checked={remember} onChange={onRememberChange} />
                  <label htmlFor='rememberMe' className="label-text cursor-pointer">Remember me</label>
                </div>
              </div>
              <Button colour='red' loading={loading} data-testid='submit'>{!loading && 'Sign in'}</Button>
              <Button colour='sky' type='button' outline><Link to='/register'>Register new account</Link></Button>
            </div>
            <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={process.env.REACT_APP_SITE_KEY ?? ''} />
            {error && (<div className="alert alert-error">
              <div className='mx-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <label>{error}</label>
              </div>
            </div>)}
          </form>
        </div>
      </div>
      )
}

export default LoginPage
