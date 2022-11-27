import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'

interface Props {
  to: string
  name: string
  activeIcon: string
  inactiveIcon: string
}

export const SidebarItem = ({ to, name, activeIcon, inactiveIcon }: Props) => {
  const path = location.pathname
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  return (
    <Link
      to={to}
      className={`flex max-w-full min-h-full cursor-pointer rounded-xl  items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4 ${
        path === to && 'bg-prime-blue mx-auto text-white'
      }`}
    >
      <i className={`text-2xl ${path === to ? activeIcon : inactiveIcon}`} />
      {!minimizeSidebar && <span className="font-medium text-lg">{name}</span>}
    </Link>
  )
}
