import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {}

export const TopManga = (props: Props) => {
  return (
    <motion.div
      initial={{ x: 200 }}
      viewport={{ once: true }}
      whileTap={{scale: 0.9, transition: {duration: 0.2}}}
      whileInView={{
        x: 0,
        transition: { duration: 0.8 },
      }}
      className="z-30 col-span-1 row-span-2 items-center"
    >
      <div className="relative flex cursor-pointer w-full bg-white dark:bg-fill-strong overflow-hidden">
        <img
          src="https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5191994-01.jpg"
          alt=""
          className="rounded-md "
        />
       
      </div>
    </motion.div>
  )
}
