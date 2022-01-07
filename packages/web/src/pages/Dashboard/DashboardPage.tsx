import { useParams } from 'react-router'
import { NavBar } from '../../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className='bg-gray-50'>
      <div className='flex flex-row gap-4'>
          <NavBar />
        <div>
          <p>BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
