import React from 'react'
import { handleActiveReview, handleOpenModal } from '../../store'
import { useAppDispatch } from '../../store/hooks'

interface Props {
  review: any
}

export const Review = ({ review }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => {
        dispatch(handleOpenModal('Review'))
        dispatch(handleActiveReview(review._id))
      }}
      className="mb-5 cursor-pointer border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2"
    >
      <div className="flex">
        <img
          src={review.authorImage}
          alt=""
          className="w-14 h-14 object-cover"
        />
        <div className="flex flex-col pl-2">
          <div className="flex justify-between -mt-1">
            <span className="font-semibold">@{review.authorUsername}</span>
            <span className="text-[#707070] dark:text-[#9B9B9B]">
              <>
                {new Date(review.createdAt).getFullYear()}/
                {new Date(review.createdAt).getMonth()+1}/
                {new Date(review.createdAt).getDate()}
              </>
            </span>
          </div>
          <p className="break-all whitespace-pre-wrap line-clamp-[8]">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  )
}
