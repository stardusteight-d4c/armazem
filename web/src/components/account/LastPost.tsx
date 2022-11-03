import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'

timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const LastPostFirstSection = ({ post }: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  return (
    <Link
      to={`/post/${post._id}`}
      className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userMetadata?.user_img}
            alt=""
            className="w-12 h-12 object-cover"
          />
          <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
            {userMetadata?.name}
          </span>
        </div>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <div>
        <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
          {post.title}
        </h2>
      </div>
      <p className="line-clamp-4">{post.body}</p>
    </Link>
  )
}

export const LastPostSecondSection = ({ post }: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  return (
    <Link
      to={`/post/${post._id}`}
      className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userMetadata?.user_img}
            alt=""
            className="w-12 h-12 rounded-md object-cover"
          />
          <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
            {userMetadata?.name}
          </span>
        </div>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <div>
        <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
          {post.title}
        </h2>
      </div>
      <p className="line-clamp-4">{post.body}</p>
      <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
    </Link>
  )
}
