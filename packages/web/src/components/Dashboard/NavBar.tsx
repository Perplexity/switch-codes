import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

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
  return (
    <div className={classNames('flex lg:static', { absolute: mobileOpen })}>
      <div className={classNames('w-72 h-screen bg-gradient-to-b from-red-500 to-red-700 lg:block text-white', { hidden: !mobileOpen })}>
        <div className="flex justify-center avatar placeholder pt-4">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
            <span className="text-3xl">K</span>
          </div>
        </div>
        <div className='flex flex-col gap-4 text-center pt-4'>
          {navs.map((nav, i) => {
            const active = nav.page === page
            return (
              <div key={`nav-${i}`} className='px-2'>
                <Link to={`/dashboard/${nav.page}`}>
                  <div className={classNames('bg-white hover:bg-sky-500 cursor-pointer', { 'bg-sky-500': active })}>
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
