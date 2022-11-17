import React from 'react'
import { TopManga } from './TopManga'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {}

export const RatedMangas = (props: Props) => {
  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Most recent posts and reviews
      </h2>
{/* Limite de 100 */}
      <motion.div className="grid grid-cols-8 gap-2 min-w-full">
      
      </motion.div>
    </section>
  )
}
