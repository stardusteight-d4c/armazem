import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userData } from '../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RecentConnectionOnline } from './RecentConnectionOnline'
import { handleMinimizeSidebar } from '../../store'

interface Props {}

export const Sidebar = (props: Props) => {
  const location = useLocation()
  const path = location.pathname
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [connections, setConnections] = useState<[User] | any>([])
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const dispatch = useAppDispatch()

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

  return (
    <aside
      className={`${
        minimizeSidebar && '!px-2 pl-[1.2px]'
      } scrollbar-hide min-h-screen pb-10 z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 col-span-1 row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong`}
    >
      <Link
        to="/"
        className={`${
          minimizeSidebar && '!mb-10 !mt-8'
        } flex cursor-pointer items-center justify-center mt-6 mb-8 gap-x-2`}
      >
        <i className="ri-server-fill text-3xl text-fill-strong dark:text-fill-weak" />
        {!minimizeSidebar && (
          <h1 className="text-4xl font-inter text-fill-strong dark:text-fill-weak font-bold">
            Armazem
          </h1>
        )}
      </Link>
      <div>
        {minimizeSidebar ? (
          <i
            title="Undo"
            onClick={() => dispatch(handleMinimizeSidebar())}
            className="dark:text-dusk-main transition duration-700 transform hover:rotate-[360deg] hover:scale-105 text-dawn-main font-bold p-[2px] w-4 h-4 flex items-center justify-center cursor-pointer rounded-full border-2 border-l-0 border-dawn-weak/50 dark:border-dusk-weak/50 bg-transparent text-xl absolute left-[63px] top-[87px]"
          />
        ) : (
          <i
            title="Break"
            onClick={() => dispatch(handleMinimizeSidebar())}
            className="dark:text-dusk-main transition duration-700 transform hover:rotate-[360deg] hover:scale-105 text-dawn-main font-bold p-[2px] w-4 h-4 flex items-center justify-center cursor-pointer rounded-full border-2 border-l-0 border-dawn-weak/50 dark:border-dusk-weak/50 bg-transparent text-xl absolute left-[248px] top-[88px]"
          />
        )}
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
            {!minimizeSidebar && (
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
            {!minimizeSidebar && (
              <span className="font-medium text-lg">My account</span>
            )}
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl items-center justify-start p-4 gap-4">
            <i className="ri-line-chart-line text-2xl" />
            {!minimizeSidebar && (
              <span className="font-medium text-lg">Trending</span>
            )}
          </li>
          <Link
            to="/connections"
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/connections` && 'bg-prime-blue text-white'
            }`}
          >
            {/* <i className="ri-link text-2xl" /> */}
            <i
              className={`text-2xl ${
                path === `/connections`
                  ? 'ri-link-unlink'
                  : 'ri-link'
              }`} />
            {!minimizeSidebar && (
              <span className="font-medium text-lg">Connections</span>
            )}
          </Link>
          <Link
            to={`/collection`}
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/collection` && 'bg-prime-blue text-white'
            }`}
          >
            <i
              className={`text-2xl ${
                path === `/collection`
                  ? 'ri-book-3-fill'
                  : 'ri-book-3-line'
              }`}
            />
            {!minimizeSidebar && (
              <span className="font-medium text-lg">Collection</span>
            )}
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl items-center justify-start p-4 gap-4">
            <i className="ri-book-mark-line text-2xl" />
            {!minimizeSidebar && (
              <span className="font-medium text-lg">My list</span>
            )}
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-[full] my-8 bg-dawn-weak/20 dark:bg-dusk-weak/20" />
      {!minimizeSidebar && (
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
    </aside>
  )
}
