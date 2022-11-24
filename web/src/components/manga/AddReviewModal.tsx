import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import {
  addReview,
  createPostAndAddToUserAccount,
} from '../../services/api-routes'
import { Button } from '../Button'
import { success } from '../Toasters'
import { useParams } from 'react-router-dom'

interface Props {}

export const AddReviewModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [reviewLength, setReviewLength] = useState(0)
  const [review, setReview] = useState<string>('')

  useEffect(() => {
    setReviewLength(review?.length || 0)
  }, [review])

  const url = window.location.pathname
  const uid = url.substring(url.lastIndexOf('/') + 1)

  const handleSubmit = async () => {
    const { data } = await axios.post(addReview, {
      from: uid,
      by: currentUser?.account,
      authorImage: currentUser?.user_img,
      authorUsername: currentUser?.username,
      review: review,
    })
    if (data.status === true) {
      success(data.msg)
      dispatch(handleOpenModal(null))
    }
  }

  const disabledButton = reviewLength < 100

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10"
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
        className="fixed border border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl px-4 md:px-14 pt-4 pb-16 z-50 w-full max-w-[95vw] md:max-w-none md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Add review</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className="ri-close-circle-fill text-4xl cursor-pointer"
          />
        </div>
        <div className="flex mt-14 border min-h-[80px] max-h-[325px] border-dawn-weak/20 dark:border-dusk-weak/20 relative">
          <span className="-top-6 left-10 absolute font-semibold text-[#707070] dark:text-[#9B9B9B]">
            {currentUser?.name}
          </span>
          <img
            src={currentUser?.user_img}
            className="w-16 h-16 hidden md:block rounded-sm absolute -top-8 -left-8 border-[2px] border-dawn-weak/20 dark:border-dusk-weak/20 "
            alt=""
          />
          <div className="relative w-full">
            <textarea
              onChange={(e) => setReview(e.target.value)}
              maxLength={3000}
              minLength={100}
              placeholder="Type your review"
              className="w-full max-h-full min-h-[200px] px-10 py-4 bg-transparent outline-none"
            />
            <span
              className={`font-semibold absolute items-center flex gap-x-2 left-0 -bottom-7 font-inter ${
                reviewLength >= 2500 && 'text-orange'
              } ${reviewLength >= 2900 && 'text-red'}`}
            >
              {reviewLength}/2255
              <div className="text-xs text-dawn-weak dark:text-dusk-weak">
                (min. 100)
              </div>
            </span>
          </div>
          <Button
            disabled={disabledButton}
            title="Submit"
            onClick={handleSubmit}
            className="bg-prime-blue !w-28 py-2 text-white rounded-md absolute -bottom-[52px] right-0"
          />
        </div>
      </motion.section>
    </>
  )
}
