import React from 'react'
import { motion } from 'framer-motion'

interface Props {}

export const PostInput = (props: Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="absolute z-40 inset-0 w-screen h-screen bg-fill-strong/30"
      />
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="absolute drop-shadow-2xl px-14 pt-4 pb-16 rounded-xl z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-white dark:bg-[#2e3440] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <h1 className="text-2xl font-semibold">New post</h1>
        <div className="mt-4 flex flex-col items-start">
          <label className="text-xl font-semibold">Title</label>
          <input
            type="text"
            placeholder="What do you want to comment on?"
            className="p-2 bg-transparent w-full focus:outline-none border border-dawn-weak/20 dark:border-dusk-weak/20"
          />
        </div>
        <div className="flex mt-14 border min-h-[80px] max-h-[325px] border-dawn-weak/20 dark:border-dusk-weak/20 relative">
          <span className="-top-6 left-9 absolute font-semibold text-[#707070] dark:text-[#9B9B9B]">
            Gabriel Sena
          </span>
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            className="w-16 h-16 rounded-full absolute -top-8 -left-8 border-[2px] border-dawn-weak/20 dark:border-dusk-weak/20 "
            alt=""
          />
          <div className=" w-full">
            <textarea
              placeholder="Type your text"
              className="w-full max-h-full min-h-[80px] px-9 py-4 bg-transparent outline-none"
            />
          </div>
          <button className="bg-prime-blue !w-28 py-2 text-white rounded-md absolute -bottom-[52px] right-0">
            Submit
          </button>
        </div>
      </motion.section>
    </>
  )
}
