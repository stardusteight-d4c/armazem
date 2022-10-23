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
      className="flex z-30 col-span-1 row-span-2 min-w-full items-center"
    >
      <div className="relative rounded-xl flex cursor-pointer w-full bg-white dark:bg-[#2e3440] p-4 h-[200px] overflow-hidden">
        <img
          src="https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5191994-01.jpg"
          alt=""
          className="w-[150px] h-full sticky top-0 bottom-0 left-0"
        />
        <div className='scrollbar-hide overflow-y-scroll pl-6 pr-4'>
          <span className="inline-block mr-2 font-inter">#1</span>
          <h4 className="text-xl inline-block -mt-1 font-semibold">
            Ashita no Joe
          </h4>
          <div className="space-x-3 my-1">
            <span className="py-[2px] drop-shadow-sm px-2 inline-block h-fit font-inter font-semibold text-layer-light dark:text-dusk-main bg-fill-strong dark:bg-fill-weak rounded-full text-xs">
              Action
            </span>
            <span className="py-[2px] drop-shadow-sm px-2 inline-block h-fit font-inter font-semibold text-layer-light dark:text-dusk-main bg-fill-strong dark:bg-fill-weak rounded-full text-xs">
              Drama
            </span>
            <span className="py-[2px] drop-shadow-sm px-2 inline-block h-fit font-inter font-semibold text-layer-light dark:text-dusk-main bg-fill-strong dark:bg-fill-weak rounded-full text-xs">
              Slice of Life
            </span>
            <span className="py-[2px] drop-shadow-sm px-2 inline-block h-fit font-inter font-semibold text-layer-light dark:text-dusk-main bg-fill-strong dark:bg-fill-weak rounded-full text-xs">
              Sports
            </span>
          </div>
          <span className="my-3 block text-justify">
            How far would you go in search of a dream? Danpei Tange is a
            frustrated boxer. He left the ring when he lost the sight in one
            eye, and gave up being a coach when he was betrayed by his disciple.
            Since then, he has lived a life of misery, hanging out with beggars
            and getting drunk all day. One day, a young man arrives in the city
            where Tange lives. Violent, proud, freeloader and a liar, Joe Yabuki
            picks fights, cheats, steals and lies. However, his strength and
            agility in his street fights catches the attention of Danpei, who
            sees in Joe the potential to become a great boxer...
          </span>
        </div>
      </div>
    </motion.div>
  )
}
