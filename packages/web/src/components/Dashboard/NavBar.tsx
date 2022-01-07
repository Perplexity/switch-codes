import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/user'

const navs = [
  {
    page: 'home',
    display: 'Home'
  },
  {
    page: 'codes',
    display: 'Codes'
  }
]

const NavBar = () => {
  const { page } = useParams()
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const user = useUser()
  return (
    <div className={classNames('flex lg:static  text-center', { absolute: mobileOpen })}>
      <div className={classNames('w-72 h-screen bg-gradient-to-b from-red-500 to-red-700 lg:block text-white', { hidden: !mobileOpen })}>
        {user.loading
          ? <p>Loading...</p>
          : (
          <>
            <div className="flex justify-center avatar placeholder pt-4">
              <div className="rounded-box w-24 h-24 ring ring-red-400 ring-offset-base-100 ring-offset-4">
                <FontAwesomeIcon className='text-8xl text-white mt-6' icon={faUser} />
              </div>
            </div>
            <div className='pt-4 text-xs'>
              Signed in as {user.user?.username}
            </div>
          </>
            )}
        <div className='flex flex-col gap-4 pt-4'>
          {navs.map((nav, i) => {
            const active = nav.page === page
            return (
              <div key={`nav-${i}`} className='px-2'>
                <Link to={`/dashboard/${nav.page}`}>
                  <div className={classNames('bg-white hover:bg-sky-600 cursor-pointer', { 'bg-sky-600': active })}>
                    <div className='bg-red-700 ml-2 p-4'>{nav.display}</div>
                  </div>
                </Link>
              </div>
            )
          }
          )}
        </div>
      </div>
      <div className='block lg:hidden'>
        <FontAwesomeIcon className='text-3xl mx-2' icon={mobileOpen ? faTimes : faBars} onClick={() => setMobileOpen(!mobileOpen)} />
      </div>
    </div>
  )
}

export default NavBar
