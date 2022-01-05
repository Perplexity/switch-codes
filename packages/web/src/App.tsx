import { Navigate, useRoutes } from 'react-router'
import './App.css'
import { DashboardLayout, MainLayout } from './layouts'
import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  const routing = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: ':page', element: <DashboardPage /> },
        { path: '', element: <Navigate to="/dashboard/home" /> },
        { path: '*', element: <Navigate to="/dashboard/home" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
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
