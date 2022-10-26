import React from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../store'
import { useAppDispatch } from '../../store/hooks'

interface Props {}

export const EditProfileImageModal = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <motion.div
      onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-fill-strong/30"
      />
      {/* Colocar a overlay/backdrop como componente que aceita children*/}
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="absolute drop-shadow-2xl rounded-sm px-14 pt-4 pb-16 z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-white dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <h1 className="text-2xl font-semibold">Send a profile picture</h1>
        <div className="mt-4 flex flex-col items-start">
          
        </div>
        <button className="bg-prime-blue !w-28 py-2 text-white rounded-md">
          Submit
        </button>
      </motion.section>
    </>
  )
}
