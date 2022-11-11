import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userData } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { RecentConnectionOnline } from './RecentConnectionOnline'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  minimizeSidebar?: boolean
  setMinimizeSidebar?: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({ minimizeSidebar, setMinimizeSidebar }: Props) => {
  const location = useLocation()
  const path = location.pathname
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [connections, setConnections] = useState<[User] | any>([])

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

  const isMinimizedSidebar = minimizeSidebar

  return (
    <motion.aside
      layout
      transition={{duration: 0.1}}
      className={`${
        isMinimizedSidebar && '!px-2'
      } scrollbar-hide min-h-screen pb-10 z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 col-span-1 row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong`}
    >
      <Link
        to="/"
        className={`${
          isMinimizedSidebar && '!mb-10 !mt-8'
        } flex cursor-pointer items-center justify-center mt-6 mb-8 gap-x-2`}
      >
        <i className="ri-server-fill text-3xl text-fill-strong dark:text-fill-weak" />
        {!isMinimizedSidebar && (
          <h1 className="text-4xl font-inter text-fill-strong dark:text-fill-weak font-bold">
            Armazem
          </h1>
        )}
      </Link>
      <div>
        {isMinimizedSidebar ? (
          <i
            onClick={() => setMinimizeSidebar!(!minimizeSidebar)}
            className="ri-arrow-right-s-line p-[2px] w-4 h-4 flex items-center justify-center cursor-pointer rounded-full border border-dawn-weak/20 dark:border-dusk-weak/20 bg-dusk-weak/20 text-lg absolute left-[63px] top-[87px]"
          />
        ) : (
          <i
            onClick={() => setMinimizeSidebar!(!minimizeSidebar)}
            className="ri-close-fill p-[2px] w-4 h-4 flex items-center justify-center cursor-pointer rounded-full border border-dawn-weak/20 dark:border-dusk-weak/20 bg-dusk-weak/20 text-lg absolute left-[246px] top-[88px]"
          />
        )}
        <ul className="space-y-2">
          <Link
            to="/"
            className={`flex w-full cursor-pointer rounded-xl  items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === '/' && 'bg-prime-blue text-white'
            }`}
          >
            <i
              className={`text-2xl ${
                path === '/'
                  ? 'ri-lightbulb-flash-fill'
                  : 'ri-lightbulb-flash-line'
              }`}
            />
            {!isMinimizedSidebar && (
              <span className="font-medium text-lg">New feed</span>
            )}
          </Link>
          <Link
            to={`/${currentUser?.username}`}
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/${currentUser?.username}` && 'bg-prime-blue text-white'
            }`}
          >
            <i
              className={`ri-account-pin-box-fill text-2xl ${
                path === `/${currentUser?.username}`
                  ? 'ri-account-pin-box-fill'
                  : 'ri-account-pin-box-line'
              }`}
            />
            {!isMinimizedSidebar && (
              <span className="font-medium text-lg">My account</span>
            )}
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl items-center justify-start p-4 gap-4">
            <i className="ri-line-chart-line text-2xl" />
            {!isMinimizedSidebar && (
              <span className="font-medium text-lg">Trending</span>
            )}
          </li>
          <Link
            to="/connections"
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/connections` && 'bg-prime-blue text-white'
            }`}
          >
            <i className="ri-link text-2xl" />
            {!isMinimizedSidebar && (
              <span className="font-medium text-lg">Connections</span>
            )}
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl  items-center justify-start p-4 gap-4">
            <i className="ri-book-mark-line text-2xl" />
            {!isMinimizedSidebar && (
              <span className="font-medium text-lg">My list</span>
            )}
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-[full] my-8 bg-dawn-weak/20 dark:bg-dusk-weak/20" />
      {!isMinimizedSidebar && (
        <div>
          <ul className="space-y-5">
            {connections.map(
              (connection: User, index: React.Key | null | undefined) => (
                <RecentConnectionOnline key={index} connection={connection} />
              )
            )}
          </ul>
        </div>
      )}
    </motion.aside>
  )
}
