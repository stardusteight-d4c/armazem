import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import axios from 'axios'
import { userData } from '../../services/api-routes'

timeago.register('en_short', en_short)

interface Props {
  userMetadata: User
  comment: Comment
}

export const Comment = ({ userMetadata, comment }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [commentAuthor, setCommentAuthor] = useState<User>()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${userData}/${comment.by}`)
      setCommentAuthor(data.user)
    })()
  }, [])

  return (
    <div className="flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
      <img
        src={commentAuthor?.user_img}
        alt=""
        className="w-9 h-9 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
      />
      <div className="flex flex-col w-full ">
        <span className="-mt-5 ml-auto">
          <TimeAgo datetime={comment.createdAt} locale="en_short" />{' '}
        </span>
        <span className="font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main">
          {commentAuthor?.name}
        </span>
        <span className="text-dusk-main/90 dark:text-dawn-main/90">
          {comment?.comment}
        </span>
        {currentUser?._id === userMetadata._id && (
          <div className="flex items-center space-x-2 justify-end w-full">
            <i className="ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
            <i className="ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  )
}
