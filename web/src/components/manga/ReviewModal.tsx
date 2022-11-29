import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import { review } from '../../services/api-routes'
import { Overlay } from '../modals/Overlay'

interface Props {}

export const ReviewModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const activeReview = useAppSelector((state) => state.armazem.activeReview)
  const [reviewData, setReviewData] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${review}/${activeReview}`)
        .then(({ data }) => setReviewData(data.review))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [activeReview])

  const motionSectionProperties = {
    initial: {
      x: -500,
      opacity: 0,
      translateX: '-50%',
      translateY: '-50%',
    },
    transition: { type: 'spring', duration: 0.8 },
    animate: { x: 0, opacity: 1, translateX: '-50%', translateY: '-50%' },
    className: style.wrapper,
  }

  if (!review) {
    return <></>
  }

  return (
    <>
      <Overlay />
      <motion.section {...motionSectionProperties}>
        <div className={style.header}>
          <div className={style.authorContainer}>
            <img src={reviewData.authorImage} className="w-16 h-16" /> @
            {reviewData.authorUsername}'s Review
          </div>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className={style.closeIcon}
          />
        </div>
        <div className={style.review}>{reviewData.review}</div>
      </motion.section>
    </>
  )
}

const style = {
  wrapper: `fixed border cursor-default border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md py-5 z-50 w-full max-w-[95vw] md:max-w-none md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  header: `flex px-4 items-center justify-between`,
  authorContainer: `text-2xl font-medium flex items-center gap-x-2`,
  closeIcon: `ri-close-circle-fill text-4xl cursor-pointer`,
  review: `flex break-words break-all mt-4 px-4 py-2 text-justify text-lg overflow-x-hidden overflow-y-scroll whitespace-pre-line border-t h-full max-h-[400px] border-dawn-weak/20 dark:border-dusk-weak/20 relative`,
}
