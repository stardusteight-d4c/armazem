import React from 'react'
import { useAppSelector } from '../store/hooks'
import { Loader } from './Loader'
import { MobileNav, Navbar, Sidebar } from './menu'
import { MobileSearch } from './menu/MobileSearch'

interface Props {
  children: React.ReactNode
  loading?: boolean
}

export const GridWrapper = ({ children, loading }: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  const handleSidebar = (type: 'wrapper' | 'content') => {
    if (type === 'wrapper') {
      return minimizeSidebar
        ? 'grid-cols-1 md:grid-cols-18'
        : 'grid-cols-1 md:grid-cols-5'
    } else if (type === 'content') {
      return minimizeSidebar
        ? 'col-span-1 md:col-span-17'
        : 'col-span-1 md:col-span-4'
    }
  }

  const handleLoadingData = () => {
    return (
      loading && (
        <section className={loader.wrapper}>
          {/* Children loads while loading */}
          <span className="-z-50 absolute">{children}</span>
          <div className={loader.container}>
            <Loader className={loader.loader} />
          </div>
        </section>
      )
    )
  }

  return (
    <div className={style.gridContainer + handleSidebar('wrapper')}>
      <Sidebar />
      <div className={style.mainContent + handleSidebar('content')}>
        <Navbar />
        <MobileSearch />
        <MobileNav />
        <>{handleLoadingData()}</>
        {children}
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong `,
  mainContent: `col-start-2 `,
}

const loader = {
  wrapper: `h-[200vh] relative overflow-hidden`,
  container: `w-full h-screen -mt-28 flex items-center justify-center relative`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
}
