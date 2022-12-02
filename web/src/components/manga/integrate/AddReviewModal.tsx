import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import axios from 'axios'
import { addReview } from '../../../services/api-routes'
import { Button } from '../../Button'
import { success } from '../../Toasters'
import { Overlay } from '../../modals/Overlay'

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

  const motionProps = {
    initial: {
      y: -500,
      opacity: 0,
      translateX: '-50%',
      translateY: '-50%',
    },
    transition: { type: 'spring', duration: 0.8 },
    animate: { y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' },
    className: style.wrapper,
  }

  return (
    <>
      <Overlay />
      <motion.section {...motionProps}>
        <div className={style.header}>
          <h1 className={style.title}>Add review</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className={style.closeIcon}
          />
        </div>
        <div className={style.inputContainer}>
          <span className={style.userName}>{currentUser?.name}</span>
          <img
            referrerPolicy="no-referrer"
            src={currentUser?.user_img}
            className={style.userImg}
            alt="user/img"
          />
          <div className={style.textareaContainer}>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              maxLength={3000}
              minLength={100}
              placeholder="Type your review"
              className={style.textarea}
            />
            <span
              className={`${style.charsCounter} ${
                reviewLength >= 2500 && 'text-orange'
              } ${reviewLength >= 2900 && 'text-red'}`}
            >
              {reviewLength}/2255
              <div className={style.spanMin}>(min. 100)</div>
            </span>
          </div>
          <Button
            disabled={disabledButton}
            title="Submit"
            onClick={handleSubmit}
            className={style.buttonSubmit}
          />
        </div>
      </motion.section>
    </>
  )
}

const style = {
  wrapper: `fixed border border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md px-4 md:px-14 pt-4 pb-16 z-50 w-full max-w-[95vw] md:max-w-none md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  header: `flex items-center justify-between`,
  title: `text-2xl font-semibold`,
  closeIcon: `ri-close-circle-fill text-4xl cursor-pointer`,
  inputContainer: `flex mt-14 border min-h-[80px] max-h-[325px] border-dawn-weak/20 dark:border-dusk-weak/20 relative`,
  userName: `-top-6 left-10 absolute font-semibold text-neutral-weak dark:text-neutral-main`,
  userImg: `w-16 h-16 hidden md:block rounded-sm absolute -top-8 -left-8 border-[2px] border-dawn-weak/20 dark:border-dusk-weak/20`,
  textareaContainer: `relative w-full`,
  textarea: `w-full max-h-full min-h-[200px] px-10 py-4 bg-transparent outline-none`,
  charsCounter: `font-semibold absolute items-center flex gap-x-2 left-0 -bottom-7 font-inter`,
  spanMin: `text-xs text-dawn-weak dark:text-dusk-weak`,
  buttonSubmit: `bg-prime-blue !w-28 py-2 text-white rounded-md absolute -bottom-[52px] right-0`,
}
