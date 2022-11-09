import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

interface Props {}

export const Sidebar = (props: Props) => {
  const location = useLocation()
  const path = location.pathname
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  return (
    <aside className="scrollbar-hide pb-10 z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 col-span-1 row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong">
      <Link
        to="/"
        className="flex cursor-pointer items-center justify-center mt-6 mb-8 gap-x-2"
      >
        <i className="ri-server-fill text-3xl text-fill-strong dark:text-fill-weak" />
        <h1 className="text-4xl font-inter text-fill-strong dark:text-fill-weak font-bold">
          Armazem
        </h1>
      </Link>
      <div>
        <ul className="space-y-2">
          <Link
            to="/"
            className={`flex w-full cursor-pointer rounded-xl  items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === '/' && 'bg-prime-blue text-white'
            }`}
          >
            <i className={`text-2xl ${path === '/' ? 'ri-lightbulb-flash-fill' : 'ri-lightbulb-flash-line'}`} />
            <span className="font-medium text-lg">New feed</span>
          </Link>
          <Link
            to={`/${currentUser?.username}`}
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4  hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/${currentUser?.username}` && 'bg-prime-blue text-white'
            }`}
          >
            <i className={`ri-account-pin-box-fill text-2xl ${path === `/${currentUser?.username}` ? 'ri-account-pin-box-fill' : 'ri-account-pin-box-line'}`} />
            <span className="font-medium text-lg">My account</span>
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl items-center justify-start p-4 gap-4">
            <i className="ri-line-chart-line text-2xl" />
            <span className="font-medium text-lg">Trending</span>
          </li>
          <Link
            to="/connections"
            className={`flex w-full cursor-pointer rounded-xl items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
              path === `/connections` && 'bg-prime-blue text-white'
            }`}
          >
            <i className="ri-link text-2xl" />
            <span className="font-medium text-lg">Connections</span>
          </Link>
          <li className="flex w-full cursor-pointer rounded-xl  items-center justify-start p-4 gap-4">
            <i className="ri-book-mark-line text-2xl" />
            <span className="font-medium text-lg">My list</span>
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-[full] my-8 bg-dawn-weak/20 dark:bg-dusk-weak/20" />
      <div>
        <ul className="space-y-5">
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium">@blackwive</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
        </ul>
      </div>
    </aside>
  )
}
