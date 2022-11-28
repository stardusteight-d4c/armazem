import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../SwitchTheme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearAuthSession,
  clearCurrentUser,
  handleMinimizeSidebar,
  handleOpenModal,
} from '../../store'
import { Dropdown } from '../Dropdown'
import { Search } from './integrate/Search'
import { MobileMenu } from './integrate/MobileMenu'
import { AnimatePresence } from 'framer-motion'
import { Notifications } from './integrate/Notifications'

interface Props {}

export const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

  const accountItems = [
    { item: 'Account', function: () => navigate(`/${currentUser?.username}`) },
    { item: 'Logout', function: () => handleLogout() },
  ]

  const html = document.querySelector('html')
  if (html) {
    openMobileMenu
      ? (html.style.overflow = 'hidden')
      : (html.style.overflow = 'auto')
  }

  const rendersBreakMenu = () => (
    <>
      {minimizeSidebar ? (
        <i
          title="Undo"
          onClick={() => dispatch(handleMinimizeSidebar())}
          className={style.breakSidebar}
        />
      ) : (
        <i
          title="Break"
          onClick={() => dispatch(handleMinimizeSidebar())}
          className={style.sidebar}
        />
      )}
    </>
  )

  return (
    <nav className={style.wrapper}>
      {rendersBreakMenu()}
      <AnimatePresence>
        {openMobileMenu && (
          <MobileMenu
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
          />
        )}
      </AnimatePresence>
      <div
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
        className={style.mobileMenu}
      >
        <i className={style.menuIcon} />
      </div>
      <Link to="/" className={style.logoContainer}>
        <i className={style.logoIcon} />
        <h1 className={style.armazem}>Armazem</h1>
      </Link>
      <Search />
      <div className={style.actionsContainer}>
        <div className={style.switchTheme}>
          <SwitchTheme />
        </div>
        <i
          title="New post"
          className={style.newPostIcon}
          onClick={() => dispatch(handleOpenModal('PostInput'))}
        />
        <i
          title="Messages"
          onClick={() => dispatch(handleOpenModal('Chat'))}
          className={style.messagesIcon}
        />
        <i className={style.notificationsContainer}>
          <Notifications />
        </i>
        <i
          title="Settings"
          onClick={() => navigate('/settings')}
          className={style.settingsIcon}
        />

        <div className={style.accountDesktopContainer}>
          <Dropdown title="Account" space="space-y-12" items={accountItems}>
            <img
              referrerPolicy="no-referrer"
              src={currentUser?.user_img}
              className={style.accountDesktopImg}
            />
          </Dropdown>
        </div>
        <div className={style.accountMobileContainer}>
          <img
            onClick={() => navigate(`${currentUser?.username}`)}
            referrerPolicy="no-referrer"
            src={currentUser?.user_img}
            className={style.accountMobileImg}
          />
        </div>
      </div>
    </nav>
  )
}

const style = {
  wrapper: `bg-fill-weak w-screen lg:w-full relative dark:bg-fill-strong z-30 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between px-3 h-16 md:px-8 flex items-center md:h-24`,
  breakSidebar: `dark:text-dusk-main hidden md:block transition duration-700 transform hover:rotate-[360deg] hover:scale-105 text-dawn-main font-bold p-[2px] w-4 h-4 cursor-pointer rounded-full border-2 border-l-0 border-dawn-weak/50 dark:border-dusk-weak/50 bg-transparent text-xl absolute -left-2 -bottom-2`,
  sidebar: `dark:text-dusk-main hidden md:block transition duration-700 transform hover:rotate-[360deg] hover:scale-105 text-dawn-main font-bold p-[2px] w-4 h-4 cursor-pointer rounded-full border-2 border-l-0 border-dawn-weak/50 dark:border-dusk-weak/50 bg-transparent text-xl absolute -left-2 -bottom-2`,
  mobileMenu: `block p-1 cursor-pointer mt-[5px] md:hidden`,
  menuIcon: `ri-menu-fill text-3xl`,
  logoContainer: `flex text-xl md:hidden items-center mx-auto w-fit gap-x-2`,
  logoIcon: `ri-server-fill text-fill-strong dark:text-fill-weak`,
  armazem: `font-inter text-fill-strong dark:text-fill-weak font-bold`,
  actionsContainer: `flex items-center gap-x-5`,
  switchTheme: `hidden md:block`,
  newPostIcon: `ri-article-line hidden md:block  text-3xl p-2 cursor-pointer`,
  messagesIcon: `ri-question-answer-line hidden md:block text-3xl p-2 cursor-pointer`,
  notificationsContainer: `hidden md:inline-block not-italic`,
  settingsIcon: `ri-settings-2-line hidden md:block text-3xl p-2 cursor-pointer transition duration-1000 transform hover:rotate-[360deg]`,
  accountDesktopContainer: `hidden md:block`,
  accountDesktopImg: `w-12 h-12 rounded-md cursor-pointer`,
  accountMobileContainer: `md:hidden`,
  accountMobileImg: `w-10 h-10 md:hidden rounded-md cursor-pointer`,
}
