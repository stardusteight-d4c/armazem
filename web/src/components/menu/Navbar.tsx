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
import { Search } from './Search'

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
      <Search />
      <div className="flex items-center gap-x-5">
        <SwitchTheme />
        <i
          title="New post"
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
                className="w-12 h-12 cursor-pointer  auto-rows-auto"
                alt=""
              />
            </Menu.Button>
            <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[20px] -bottom-[62px]">
              <Menu.Item>
                <a
                  onClick={() => navigate(`/${currentUser?.username}`)}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Account
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => handleLogout()}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
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
