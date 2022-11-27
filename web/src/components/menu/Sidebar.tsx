import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { SidebarItem } from './integrate/SidebarItem'

interface Props {}

export const Sidebar = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [connections, setConnections] = useState<[User] | any>([])
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const adminRole = import.meta.env.VITE_ADMIN_ROLE

  useEffect(() => {
    if (currentAccount.connections !== undefined && connections.length === 0) {
      const user: any[] = []
      setConnections([])
      if (connections.length < currentAccount.connections.length) {
        currentAccount.connections.map(async (connection: { with: any }) => {
          const { data } = await axios.get(`${userData}/${connection.with}`)
          user.push(data.user)
          setConnections(user)
        })
      }
    }
  }, [])

  const menuItems = {
    newFeed: {
      to: '/',
      name: 'New feed',
      activeIcon: 'ri-lightbulb-flash-fill',
      inactiveIcon: 'ri-lightbulb-flash-line',
    },
    myAccount: {
      to: `/${currentUser?.username}`,
      name: 'My account',
      activeIcon: 'ri-account-pin-box-fill',
      inactiveIcon: 'ri-account-pin-box-line',
    },
    connections: {
      to: '/connections',
      name: 'Connections',
      activeIcon: 'ri-link-unlink',
      inactiveIcon: 'ri-link',
    },
    collection: {
      to: '/collection',
      name: 'Collection',
      activeIcon: 'ri-book-3-fill',
      inactiveIcon: 'ri-book-3-line',
    },
    myList: {
      to: '/MyList',
      name: 'My List',
      activeIcon: 'ri-book-mark-fill',
      inactiveIcon: 'ri-book-mark-line',
    },
    addManga: {
      to: '/addManga',
      name: 'Add manga',
      activeIcon: 'ri-add-box-fill',
      inactiveIcon: 'ri-add-box-line',
    },
  }

  return (
    <aside
      className={`${minimizeSidebar && '!px-2 pl-[1.2px]'} ${style.wrapper}`}
    >
      <Link
        to="/"
        className={`${minimizeSidebar && '!mb-10 !mt-8'} ${
          style.logoContainer
        }`}
      >
        <i className={style.logoIcon} />
        {!minimizeSidebar && <h1 className={style.armazem}>Armazem</h1>}
      </Link>
      <div>
        <ul className="space-y-2">
          <SidebarItem {...menuItems.newFeed} />
          <SidebarItem {...menuItems.myAccount} />
          <SidebarItem {...menuItems.connections} />
          <SidebarItem {...menuItems.collection} />
          <SidebarItem {...menuItems.myList} />
          {currentUser?.role && currentUser.role === adminRole && (
            <SidebarItem {...menuItems.addManga} />
          )}
        </ul>
      </div>
    </aside>
  )
}

const style = {
  wrapper: `scrollbar-hide hidden md:block relative min-h-screen pb-10 z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 md:col-span-1 md:row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong`,
  logoContainer: `flex cursor-pointer items-center justify-center mt-6 mb-8 gap-x-2`,
  logoIcon: `ri-server-fill text-3xl text-fill-strong dark:text-fill-weak`,
  armazem: `text-4xl font-inter text-fill-strong dark:text-fill-weak font-bold`,
}
