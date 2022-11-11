import React from 'react'
import { Navbar, Sidebar } from '../components'

interface Props {}

export const Manga = (props: Props) => {
  return (
    <div className={style.gridContainer}>
    <Sidebar />
    <div className={style.mainContent}>
      <Navbar />
        <main>
          <div className="p-4 pb-14">
           Manga
          </div>
        </main>
    </div>
  </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
