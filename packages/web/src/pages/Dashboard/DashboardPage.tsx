import { Navigate, useParams } from 'react-router'
import { NavBar, Spinner } from '../../components/Dashboard'
import { useNews } from '../../hooks/news'
import { useUser } from '../../hooks/user'
import Home from './pages/Home'

type Page = {
  component: any,
  dependentState?: any
}
interface PageMap {
  [index: string]: Page
}
const pageMap: PageMap = {
  home: {
    component: Home,
    dependentState: useNews
  }
}

const DashboardPage = () => {
  const params = useParams()
  const selectedPage = params.page ?? 'home'
  const page = pageMap[selectedPage]
  if (!page) {
    return <Navigate to='/dashboard/home' />
  }
  const user = useUser()
  const Page = page.component
  const pageState = page.dependentState ? page.dependentState() : { loading: false }
  if (user.loading) {
    return (
      <div className="flex h-screen bg-gray-200">
        <div className="m-auto w-full">
          <div className='text-center'>
            <Spinner />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='bg-gray-50'>
      <div className='flex flex-row gap-4'>
        <NavBar />
        {
          pageState.loading
            ? (
              <div className='flex justify-center items-center w-full h-screen'>
                <Spinner />
              </div>
              )
            : <Page />
        }
      </div>
    </div>
  )
}

export default DashboardPage
