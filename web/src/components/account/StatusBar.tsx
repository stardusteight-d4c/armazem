import React from 'react'
import { motion } from 'framer-motion'

interface Props {}

let bar_width = '21.15%'

const variants = {
  initial: {
    width: 0,
  },
  animate: {
    width: bar_width,
    transition: {
      duration: 0.4,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
}

export const StatusBar = (props: Props) => {
  return (
    <section className="mt-16 py-5">
      <div className="flex items-center text-lg font-semibold">
        <div className="flex gap-x-7">
          <div className="flex justify-between gap-x-2 items-center cursor-pointer">
            {/* clicar e abrir modal */}
            <span className="text-green">Reading</span>
            <span>11</span>
          </div>
          <div className="flex justify-between items-center gap-x-2 cursor-pointer">
            <span className="text-prime-blue">Completed</span>
            <span>17</span>
          </div>
          <div className="flex justify-between  items-center gap-x-2 cursor-pointer">
            <span className="text-dusk-weak">Plan to Read</span>
            <span>24</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-dusk-weak/10 rounded-full flex h-4  w-full relative">
          {/* Regra de três: 52 está para 100% -> 11 está para x
                      52.x - 11.100
                      52.x = 1100
                      x = 1100 / 52 
                      x = 21.15%
                    */}
          <motion.div
            variants={variants}
            animate="animate"
            title="21.15%"
            className="h-full text-layer-heavy flex items-center justify-center font-semibold rounded-l-lg bg-green"
          />
          <div
            title="32.69%"
            className="w-[32.69%] h-full text-layer-heavy flex items-center justify-center  bg-prime-blue"
          />

          <div
            title="46.15%"
            className="w-[46.15%] h-full text-layer-heavy flex items-center justify-center rounded-r-lg bg-dusk-weak"
          />
        </div>
      </div>
    </section>
  )
}
