import React from 'react'
import {
  Hero,
  Navbar,
  PopularReadings,
  RatedMangas,
  RatedPosts,
  Sidebar,
} from '../components'

interface Props {}

export const Feed = (props: Props) => {
 

  // Hospedar imagens no IPFS

  return (
    <>
      <div className={style.gridContainer}>
        <Sidebar />
        <div className={style.mainContent}>
          <Navbar />
          <main className="p-8">
            <Hero />
            <RatedPosts />
            <PopularReadings />
            <RatedMangas />
          </main>
        </div>
      </div>
    </>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
