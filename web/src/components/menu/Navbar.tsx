import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../SwitchTheme'
import { Menu } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearAuthSession,
  clearCurrentUser,
  handleOpenModal,
} from '../../store'

interface Props {}

export const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    sessionStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

  return (
    <nav className="bg-fill-weak z-50 dark:bg-fill-strong border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between p-8 w-full flex items-center h-24">
      <div className="flex relative items-center rounded-full">
        <i className="ri-search-2-line left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
        <input
          type="text"
          placeholder="Search by manga or user"
          className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main rounded-md outline-none py-4 px-12 bg-transparent"
        />
        <Menu>
          <Menu.Button
            title="Filter"
            className="right-3 cursor-pointer absolute text-dusk-main dark:text-dawn-main text-2xl"
          >
            <i className="ri-equalizer-line" />
          </Menu.Button>
          <Menu.Items className="absolute p-1 z-20 flex flex-col text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong drop-shadow-2xl -right-4 -bottom-14">
            <Menu.Item>
              <a className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                Manga
              </a>
            </Menu.Item>
            <Menu.Item>
              <a className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                User
              </a>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="flex items-center gap-x-5">
        <SwitchTheme />
        <i
          className="ri-article-line text-3xl p-2 cursor-pointer"
          onClick={() => dispatch(handleOpenModal('PostInput'))}
        />
        <i className="ri-question-answer-line text-3xl p-2 cursor-pointer" />
        <i className="ri-notification-2-line text-3xl p-2 cursor-pointer" />
        <i className="ri-settings-2-line text-3xl p-2 cursor-pointer" />

        <div className="relative">
          <Menu>
            <Menu.Button title="Account">
              <img
                referrerPolicy="no-referrer"
                src={currentUser?.user_img}
                className="w-12 h-12 rounded-md cursor-pointer  auto-rows-auto"
                alt=""
              />
            </Menu.Button>
            <Menu.Items className="absolute p-1 z-20 flex flex-col text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong drop-shadow-2xl -right-[17px] -bottom-[70px]">
              <Menu.Item>
                <a
                  onClick={() => navigate(`/${currentUser?.username}`)}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Account
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => handleLogout()}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  )
}
