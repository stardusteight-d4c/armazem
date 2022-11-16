import React from 'react'

interface Props {
  review: any
}

export const Review = ({ review }: Props) => {
  return (
    <div className="mb-5 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
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
              {review.createdAt}
            </span>
          </div>
          <p className="break-words whitespace-pre-wrap line-clamp-[8]">{review.review}</p>
        </div>
      </div>
    </div>
  )
}
