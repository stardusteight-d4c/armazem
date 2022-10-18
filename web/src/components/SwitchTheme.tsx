import React, { useEffect, useState } from 'react'
import { handleSwitchTheme } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'

interface Props {}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export const SwitchTheme = (props: Props) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.anistorage.theme)

  return (
    <div
      onClick={() => dispatch(handleSwitchTheme())}
      className={`bg-[#f0f0f0] dark:bg-[#242731]  text-[#3e3e3e] dark:text-[#f0f0f0] flex items-center px-0.5 cursor-pointer rounded-full h-6 w-12 flex-shrink-0 relative ${
        theme === 'dark' ? 'justify-end' : 'justify-start'
      }`}
    >
      <span className="absolute left-0.5">
        <i className="ri-flashlight-fill w-4 h-4" />
      </span>
      <motion.div
        className="z-40 w-5 h-5 dark:bg-[#f0f0f0] bg-[#2d3039] rounded-full"
        layout
        transition={spring}
      />
      <span className="absolute right-0.5">
        <i className="ri-moon-fill w-4 h-4" />
      </span>
    </div>
  )
}
