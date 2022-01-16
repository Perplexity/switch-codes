import { faHome } from '@fortawesome/free-solid-svg-icons'
import { NavItem } from '../../../components/Dashboard/NavBar'

export const getNavBarItems = (): NavItem[] => {
  return [
    {
      page: 'home',
      display: 'Home',
      icon: faHome
    }
  ]
}
