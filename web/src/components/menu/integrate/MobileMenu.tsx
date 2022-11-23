import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userData } from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { RecentConnectionOnline } from './RecentConnectionOnline'
import {
  clearAuthSession,
  clearCurrentUser,
  handleMinimizeSidebar,
} from '../../../store'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { motion } from 'framer-motion'

interface Props {
  openMobileMenu: boolean
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileMenu = ({ openMobileMenu, setOpenMobileMenu }: Props) => {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [connections, setConnections] = useState<[User] | any>([])
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const dispatch = useAppDispatch()
  const { height, width } = useWindowDimensions()
  const adminRole = import.meta.env.VITE_ADMIN_ROLE
  const [disableHookEffect, setDisableHookEffect] = useState(false)

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
          !disableHookEffect && setOpenMobileMenu(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref, disableHookEffect])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

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

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

  return (
    <>
      <motion.aside
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        exit={{ x: -500 }}
        ref={wrapperRef}
        className="scrollbar-hide absolute md:hidden inset-0 z-50 min-h-screen pb-10  border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20   text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong"
      >
        <div className="bg-fill-weak w-screen lg:w-full relative dark:bg-fill-strong z-30 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between px-3 h-16 md:px-12 flex items-center md:hidden">
          <i
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            className="ri-menu-2-line text-3xl p-1 cursor-pointer"
          />
          <div className="flex items-center justify-center mt-6 mb-8 gap-x-2">
            <i className="ri-server-fill text-xl text-fill-strong dark:text-fill-weak" />
            <h1 className=" font-inter text-2xl  text-fill-strong dark:text-fill-weak font-bold">
              Armazem
            </h1>
          </div>
        </div>

        <div className="px-4 mt-4">
          <ul className="space-y-2">
            <Link
              to="/"
              className={`flex max-w-full min-h-full cursor-pointer rounded-xl  items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                path === '/' && 'bg-prime-blue mx-auto text-white'
              }`}
            >
              <i
                className={`text-2xl ${
                  path === '/'
                    ? 'ri-lightbulb-flash-fill'
                    : 'ri-lightbulb-flash-line'
                }`}
              />

              <span className="font-medium text-lg">New feed</span>
            </Link>
            <Link
              to={`/${currentUser?.username}`}
              className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                path === `/${currentUser?.username}` &&
                'bg-prime-blue text-white'
              }`}
            >
              <i
                className={`ri-account-pin-box-fill text-2xl ${
                  path === `/${currentUser?.username}`
                    ? 'ri-account-pin-box-fill'
                    : 'ri-account-pin-box-line'
                }`}
              />

              <span className="font-medium text-lg">My account</span>
            </Link>
            <Link
              to="/connections"
              className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                path === `/connections` && 'bg-prime-blue text-white'
              }`}
            >
              {/* <i className="ri-link text-2xl" /> */}
              <i
                className={`text-2xl ${
                  path === `/connections` ? 'ri-link-unlink' : 'ri-link'
                }`}
              />

              <span className="font-medium text-lg">Connections</span>
            </Link>
            <Link
              to="/collection"
              className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                path === `/collection` && 'bg-prime-blue text-white'
              }`}
            >
              <i
                className={`text-2xl ${
                  path === `/collection` ? 'ri-book-3-fill' : 'ri-book-3-line'
                }`}
              />

              <span className="font-medium text-lg">Collection</span>
            </Link>
            <Link
              to="/MyList"
              className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                path === `/MyList` && 'bg-prime-blue text-white'
              }`}
            >
              <i
                className={`text-2xl ${
                  path === `/MyList` ? 'ri-book-mark-fill' : 'ri-book-mark-line'
                }`}
              />

              <span className="font-medium text-lg">My list</span>
            </Link>
            {currentUser?.role && currentUser.role === adminRole && (
              <Link
                to="/addManga"
                title="Add new work to database"
                className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
                  path === `/addManga` && 'bg-prime-purple text-white'
                }`}
              >
                <i
                  className={`text-2xl ${
                    path === `/addManga` ? 'ri-add-box-fill' : 'ri-add-box-line'
                  }`}
                />

                <span className="font-medium text-lg">Add manga</span>
              </Link>
            )}
          </ul>
        </div>
        <div
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-x-2 p-1 cursor-pointer text-red font-medium text-2xl mt-14"
        >
          <i className="ri-logout-box-line" />
          Logout
        </div>
      </motion.aside>
    </>
  )
}
