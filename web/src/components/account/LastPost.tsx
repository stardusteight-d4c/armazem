import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import axios from 'axios'
import { likePost, unlikedPost } from '../../services/api-routes'

timeago.register('en_short', en_short)

interface Props {
  post: Post
  postUpdatedData: boolean
  setPostUpdatedData: React.Dispatch<React.SetStateAction<boolean>>
}

export const LastPost = ({
  post,
  setPostUpdatedData,
  postUpdatedData,
}: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  const likedByUser = () => {
    if (post && currentUser) {
      const verificationResult = post?.likes.map(
        (like: { by: string | undefined }) => {
          if (like.by == currentUser?._id) {
            return true
          } else {
            return false
          }
        }
      )
      return verificationResult.includes(true)
    }
  }

  const handleLikePost = async () => {
    if (likedByUser()) {
      const { data } = await axios.post(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        setPostUpdatedData(!postUpdatedData)
      }
    } else {
      const { data } = await axios.post(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        setPostUpdatedData(!postUpdatedData)
      }
    }
  }

  return (
    <article className="cursor-default hover:scale-105 hover:drop-shadow-md text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong transition-all ease-in-out duration-200 w-full h-fit p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userMetadata?.user_img}
            alt=""
            className="w-12 rounded-md h-12 object-cover"
          />
          <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
            {userMetadata?.name}
          </span>
        </div>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <Link to={`/post/${post._id}`} className="cursor-pointer">
        <h2 className="font-semibold text-xl my-1 inline-block text-dusk-main dark:text-dawn-main">
          {post.title}
        </h2>
        <p className="line-clamp-4">{post.body}</p>
      </Link>
      <div className="h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
      <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
        <div className="flex items-center gap-x-5">
          <div
            onClick={handleLikePost}
            className="flex w-[84px] items-center cursor-pointer"
          >
            <i
              className={`${
                likedByUser() ? 'ri-heart-3-fill text-prime-blue' : 'ri-heart-3-line'
              }  text-xl pr-1 `}
            />
            <span className="text-lg">
              {post.likes.length} {post.likes.length <= 1 ? 'Like' : 'Likes'}
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <i className="ri-discuss-line pr-1 text-xl" />
            <span className="text-lg">
              {post.discussions.length}{' '}
              {post.discussions.length <= 1 ? 'Discussion' : 'Discussions'}
            </span>
          </div>
        </div>
        {currentUser?._id !== userMetadata?._id && (
          <div className="flex items-center cursor-pointer">
            <i className="ri-share-box-line text-xl pr-1" />
            <span className="text-lg">Share</span>
          </div>
        )}
      </div>
    </article>
  )
}
