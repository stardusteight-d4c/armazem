import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import {
  addReview,
  createPostAndAddToUserAccount,
  review,
} from '../../services/api-routes'
import { Button } from '../Button'
import { success } from '../Toasters'
import { useParams } from 'react-router-dom'
import { Loader } from '../Loader'

interface Props {}

export const ReviewModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const activeReview = useAppSelector((state) => state.armazem.activeReview)
  const [loading, setLoading] = useState(true)
  const [reviewData, setReviewData] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${review}/${activeReview}`)
      if (data.status === true) {
        setReviewData(data.review)
      }
    })()
    setLoading(false)
  }, [activeReview])

  return (
    <>
      <>
        <motion.div
          onClick={() => dispatch(handleOpenModal(null))}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          animate={{ opacity: 1 }}
          className="fixed z-40 inset-0 w-screen h-screen bg-fill-strong/30"
        />
        <motion.section
          initial={{
            x: -500,
            opacity: 0,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{ type: 'spring', duration: 0.8 }}
          animate={{
            x: 0,
            opacity: 1,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed border cursor-default border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl py-5 z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        >
          {!loading ? (
            <>
              <div className="flex px-4 items-center justify-between">
                <div className="text-2xl font-medium flex items-center gap-x-2">
                 <img src={reviewData.authorImage} className="w-16 h-16" /> @{reviewData.authorUsername}'s Review
                </div>
                <i
                  onClick={() => dispatch(handleOpenModal(null))}
                  className="ri-close-circle-fill text-4xl cursor-pointer"
                />
              </div>
              <div className="flex break-words mt-4 px-4 py-2 text-justify text-lg overflow-x-hidden overflow-y-scroll whitespace-pre-line  border-t h-full max-h-[400px] border-dawn-weak/20 dark:border-dusk-weak/20 relative">
                {reviewData.review}
              </div>
            </>
          ) : (
            <div className="w-full h-52 flex items-center justify-center">
              <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
            </div>
          )}
        </motion.section>
      </>
    </>
  )
}
