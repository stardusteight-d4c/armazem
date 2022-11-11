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

interface Props {}

export const Feed = (props: Props) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState(false)

  // Hospedar imagens no IPFS

  const isMinimizedSidebar = minimizeSidebar

  console.log(isMinimizedSidebar)
  //  setar este useState em um estado redux para seu utilizado em toda aplicação

  return (
    <AnimatePresence>
        <div
          className={`${style.gridContainer} ${
            isMinimizedSidebar ? 'grid-cols-18' : 'grid-cols-5'
          }`}
        >
          <Sidebar
            minimizeSidebar={minimizeSidebar}
            setMinimizeSidebar={setMinimizeSidebar}
          />
          {/* Tranformar em componentes estes wrappers, aceitando children */}
          <motion.div layout
      transition={{duration: 0.2}}

            className={`${style.mainContent} ${
              isMinimizedSidebar ? 'col-span-17' : 'col-span-4'
            }`}
          >
            <Navbar />
            <main className="p-8">
              <Hero />
              <RatedPosts />
              <PopularReadings />
              <RatedMangas />
            </main>
          </motion.div>
      </div>
    </AnimatePresence>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
