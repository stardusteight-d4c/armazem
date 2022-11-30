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
      className={`${style.linkWrapper} ${path === to && style.activeItem} ${
        to === '/addManga' && path === '/addManga' && '!bg-prime-purple'
      }
      `}
    >
      <i className={`text-2xl ${path === to ? activeIcon : inactiveIcon}`} />
      {!minimizeSidebar && <span className={style.itemName}>{name}</span>}
    </Link>
  )
}

const style = {
  linkWrapper: `flex max-w-full min-h-full cursor-pointer rounded-xl items-center justify-start p-4 hover:transition-all hover:duration-200 hover:brightness-125 gap-4`,
  activeItem: `bg-prime-blue mx-auto text-white`,
  itemName: `font-medium text-lg`,
}
