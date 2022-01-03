import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>)
}

export default MainLayout
