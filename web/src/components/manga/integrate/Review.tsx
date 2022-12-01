import { handleActiveReview, handleOpenModal } from '../../../store'
import { useAppDispatch } from '../../../store/hooks'

interface Props {
  review: any
}

export const Review = ({ review }: Props) => {
  const dispatch = useAppDispatch()

  const formatDate = (date: Date) => (
    <>
      {new Date(date).getFullYear()}/{new Date(date).getMonth() + 1}/
      {new Date(date).getDate()}
    </>
  )

  return (
    <div
      onClick={() => {
        dispatch(handleOpenModal('Review'))
        dispatch(handleActiveReview(review._id))
      }}
      className={style.wrapper}
    >
      <div className={style.flexContainer}>
        <img
          src={review.authorImage}
          alt="author/img"
          referrerPolicy="no-referrer"
          className={style.authorImg}
        />
        <div className={style.reviewContainer}>
          <div className={style.reviewHeadData}>
            <span className={style.username}>@{review.authorUsername}</span>
            <span className={style.date}>{formatDate(review.createdAt)}</span>
          </div>
          <p className={style.review}>{review.review}</p>
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `mb-5 px-2 md:px-0 cursor-pointer border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2`,
  flexContainer: `flex`,
  authorImg: `w-14 h-14 object-cover`,
  reviewContainer: `flex flex-col pl-2`,
  reviewHeadData: `flex justify-between -mt-1`,
  username: `font-semibold`,
  date: `text-neutral-weak dark:text-neutral-main`,
  review: `break-all whitespace-pre-wrap line-clamp-[8]`,
}
