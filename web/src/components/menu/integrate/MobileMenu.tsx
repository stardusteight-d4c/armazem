import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { clearAuthSession, clearCurrentUser } from '../../../store'
import { motion } from 'framer-motion'
import { SidebarItem } from './SidebarItem'

interface Props {
  openMobileMenu: boolean
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileMenu = ({ openMobileMenu, setOpenMobileMenu }: Props) => {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [connections, setConnections] = useState<[User] | any>([])
  const dispatch = useAppDispatch()
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

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
          setOpenMobileMenu(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

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

  const motionAside = {
    initial: { x: -500 },
    animate: { x: 0 },
    exit: { x: -500 },
    ref: wrapperRef,
    className: style.wrapper,
  }

  return (
    <>
      <motion.aside {...motionAside}>
        <header className={style.header}>
          <i
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            className={style.menuIcon}
          />
          <div className={style.logoContainer}>
            <i className={style.logoIcon} />
            <h1 className={style.armazem}>Armazem</h1>
          </div>
        </header>

        <div className="px-4 mt-4">
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
        <div onClick={handleLogout} className={style.logoutContainer}>
          <i className={style.logoutIcon} />
          Logout
        </div>
      </motion.aside>
    </>
  )
}

const style = {
  wrapper: `scrollbar-hide absolute md:hidden inset-0 z-50 min-h-screen pb-10  border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  header: `bg-fill-weak w-screen lg:w-full relative dark:bg-fill-strong z-30 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between px-3 h-16 md:px-12 flex items-center md:hidden`,
  menuIcon: `ri-menu-2-line text-3xl p-1 cursor-pointer`,
  logoContainer: `flex items-center justify-center gap-x-2`,
  logoIcon: `ri-server-fill text-xl text-fill-strong dark:text-fill-weak`,
  armazem: `font-inter text-2xl  text-fill-strong dark:text-fill-weak font-bold`,
  logoutContainer: `flex flex-col items-center justify-center gap-x-2 p-1 cursor-pointer text-red font-medium text-2xl mt-4`,
  logoutIcon: `ri-logout-box-line`,
}
