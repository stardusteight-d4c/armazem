import { useState } from 'react'
import {
  Hero,
  Navbar,
  PopularReadings,
  RatedMangas,
  RatedPosts,
  Sidebar,
} from '../components'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const Feed = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  // Hospedar imagens no IPFS

  //  setar este useState em um estado redux para seu utilizado em toda aplicação

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar ? 'grid-cols-18' : 'grid-cols-5'
      }`}
    >
      <Sidebar />
      {/* Tranformar em componentes estes wrappers, aceitando children */}
      <div
        className={`${style.mainContent} ${
          minimizeSidebar ? 'col-span-17' : 'col-span-4'
        }`}
      >
        <Navbar />
        <main className="p-8">
          <Hero />
          <RatedPosts />
          <PopularReadings />
          <RatedMangas />
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
