import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../SwitchTheme'

interface Props {}

export const Navbar = (props: Props) => {
  const [filterOn, setFilterOn] = useState(false)
  const [perfilOn, setPerfilOn] = useState(false)
  const [newPost, setNewPost] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="bg-fill-weak dark:bg-fill-strong border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between p-8 w-full flex items-center h-24">
      <div className="flex relative items-center rounded-full">
        <i className="ri-search-2-line left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
        <input
          type="text"
          placeholder="Search by manga or user"
          className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main rounded-full outline-none py-4 px-12 bg-transparent"
        />
        <i
          onClick={() => setFilterOn(!filterOn)}
          className="ri-equalizer-line right-3 cursor-pointer absolute text-dusk-main dark:text-dawn-main text-2xl"
        />
        {filterOn && (
          <div className="absolute -right-16 dark:text-dusk-main text-white">
            <div className="relative  dark:bg-fill-weak bg-fill-strong p-1">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-fill-strong dark:border-r-fill-weak bg-fill-strong border-b-[10px] border-b-transparent overflow-hidden -left-[8px] absolute bg-transparent top-1/2 -translate-y-1/2" />
              <ul className="text-center">
                <li
                  onClick={() => setFilterOn(false)}
                  className="cursor-pointer z-10 px-1 hover:bg-prime-blue "
                >
                  Manga
                </li>
                <li
                  onClick={() => setFilterOn(false)}
                  className="cursor-pointer px-1 hover:bg-prime-blue "
                >
                  User
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-5">
        <SwitchTheme />
        <i
          className="ri-article-line text-3xl p-2 cursor-pointer"
          onClick={() => setNewPost(!newPost)}
        />
        <i className="ri-message-2-line text-3xl p-2 cursor-pointer" />
        <i className="ri-notification-2-line text-3xl p-2 cursor-pointer" />
        <i className="ri-settings-2-line text-3xl p-2 cursor-pointer" />

        <div className="relative">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            className="w-12 h-12 rounded-full cursor-pointer  auto-rows-auto"
            alt=""
            onClick={() => setPerfilOn(!perfilOn)}
          />
          {perfilOn && (
            <div className="absolute shadow-2xl -left-2 -bottom-16 dark:text-dusk-main text-white">
              <div className="relative z-20 dark:bg-fill-weak bg-fill-strong p-1">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent rotate-90 border-r-[10px] border-r-fill-strong dark:border-r-fill-weak bg-fill-strong border-b-[10px] border-b-transparent overflow-hidden left-7 absolute bg-transparent -top-3 " />
                <ul className="text-center">
                  <li
                    onClick={() => setPerfilOn(false)}
                    className="cursor-pointer px-1 hover:bg-prime-blue "
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => handleLogout()}
                    className="cursor-pointer px-1 hover:bg-prime-blue "
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
