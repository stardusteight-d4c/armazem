import React from 'react'
import { TopManga } from './TopManga'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {}

export const RatedMangas = (props: Props) => {
  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Top rated mangas
      </h2>

      <motion.div className="grid-cols-1 grid-rows-2 grid gap-10 min-w-full">
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
        <TopManga />
      </motion.div>
    </section>
  )
}
