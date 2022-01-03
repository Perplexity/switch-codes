import { Navigate, useRoutes } from 'react-router'
import './App.css'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'

function App () {
  const routing = useRoutes([
    {
      path: '/',
      element: <MainLayout/>,
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: '*',
          element: <Navigate to="/login" />
        },
        {
          path: '/',
          element: <Navigate to="/login" />
        }
      ]
    }
  ])
  return routing
}

export default App
