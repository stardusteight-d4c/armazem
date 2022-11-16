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
import { Dropdown } from '../Dropdown'

interface Props {}

export const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

  const accountItems = [
    {
      item: 'Account',
      function: () => navigate(`/${currentUser?.username}`),
    },
    {
      item: 'Logout',
      function: () => handleLogout(),
    },
  ]

  return (
    <nav className="bg-fill-weak dark:bg-fill-strong z-50 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between p-8 w-full flex items-center h-24">
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
        <Dropdown title="Account" space="space-y-14" items={accountItems}>
          <img
            referrerPolicy="no-referrer"
            src={currentUser?.user_img}
            className="w-12 h-12 cursor-pointer mt-[6px]"
            alt=""
          />
        </Dropdown>
      </div>
    </nav>
  )
}
