import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'

timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const SharedPostCard = ({ post }: Props) => {
  const [authorPost, setAuthorPost] = useState<User>()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${userData}/${post?.by}`)
      setAuthorPost(data.user)
    })()
  }, [])

  return (
    <article className="w-full cursor-pointer  h-fit  text-[#707070] dark:text-[#9B9B9B] bg-fill-weak dark:bg-fill-strong">
      <div className="flex items-center justify-between">
        <Link
          to={`/${authorPost?.username}`}
          className="flex items-center gap-3"
        >
          <img
            src={authorPost?.user_img}
            alt=""
            className="w-12 h-12 object-cover"
          />
          <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
            {authorPost?.name}
          </span>
        </Link>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <Link to={`/post/${post?._id}`}>
        <div>
          <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
            {post?.title}
          </h2>
        </div>
        <p>{post?.body}</p>
      </Link>
    </article>
  )
}
