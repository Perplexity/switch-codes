import { Navigate, useParams } from 'react-router'
import { NavBar } from '../../components/Dashboard'
import Home from './pages/Home'
interface PageMap {
  [index: string]: any
}
const pageMap: PageMap = {
  home: Home
}

const DashboardPage = () => {
  const params = useParams()
  const selectedPage = params.page ?? 'home'
  const Page = pageMap[selectedPage]
  if (!Page) {
    return <Navigate to='/dashboard/home' />
  }
  return (
    <div className='bg-gray-50'>
      <div className='flex flex-row gap-4'>
        <NavBar />
        <Page />
      </div>
    </div>
  )
}

export default DashboardPage
