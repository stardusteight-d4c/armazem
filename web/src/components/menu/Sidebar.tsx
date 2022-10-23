import React from 'react'

interface Props {}

export const Sidebar = (props: Props) => {
  return (
    <aside className="scrollbar-hide z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 col-span-1 row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong">
      <div className="flex items-center py-8 -mt-[2px] gap-x-2">
        <i className="ri-server-fill text-2xl text-fill-strong dark:text-fill-weak" />
        <h1 className="text-3xl font-inter text-fill-strong dark:text-fill-weak font-bold">
          Armazem
        </h1>
      </div>
      <div>
        <span className="mb-4 block">New Feeds</span>
        <ul className="space-y-2">
          <li className="flex w-full cursor-pointer items-center justify-start p-4 bg-prime-blue rounded-xl gap-4">
            <i className="ri-water-flash-fill text-white text-2xl" />
            <span className="font-medium text-white text-lg">New Feed</span>
          </li>
          <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
            <i className="ri-line-chart-line text-2xl" />
            <span className="font-medium text-lg">Trending</span>
          </li>
          <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
            <i className="ri-emotion-line text-2xl" />
            <span className="font-medium text-lg">Following</span>
          </li>
          <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
            <i className="ri-book-mark-line text-2xl" />
            <span className="font-medium text-lg">My list</span>
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-[full] my-8 bg-dawn-weak/20 dark:bg-dusk-weak/20" />
      <div>
        <span className="mb-4 block">Following</span>
        <ul className="space-y-5">
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>{' '}
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>{' '}
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
          <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">Gabriel Sena</span>
            </div>
            <i className="ri-wifi-line" />
          </li>
        </ul>
      </div>
    </aside>
  )
}
