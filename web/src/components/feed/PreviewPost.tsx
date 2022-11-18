import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { postMetadataById, unlikedPost } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { Loader } from '../Loader'
timeago.register('en_short', en_short)

interface Props {
  postId: any
}

export const PreviewPost = ({ postId }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [post, setPost] = useState<any>([])
  const [authorUser, setAuthorUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [click, setClick] = useState<any>()
  const navigate = useNavigate()

  // Prevents image dragging
  window.ondragstart = function () {
    return false
  }

  // Distinguishes drag and true click
  const delta = 6
  let startX: number
  let startY: number
  window.addEventListener('mousedown', function (event) {
    startX = event.pageX
    startY = event.pageY
  })
  window.addEventListener('mouseup', function (event) {
    const diffX = Math.abs(event.pageX - startX)
    const diffY = Math.abs(event.pageY - startY)
    if (diffX < delta && diffY < delta) {
      setClick(true)
    }
  })

  useEffect(() => {
    if (postId) {
      ;(async () => {
        const { data } = await axios.get(`${postMetadataById}/${postId}`)
        if (data.status === true) {
          setPost(data.post)
          setAuthorUser(data.authorUser)
          setLoading(false)
        }
      })()
    }
  }, [postId])

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

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPosts = currentAccount && sharedPosts?.includes(post?._id)

  return (
    <>
      {!loading ? (
        <motion.article
          whileTap={{ cursor: 'grabbing' }}
          className="max-w-[450px] border border-dawn-weak/20 dark:border-dusk-weak/20 min-w-[450px] max-h-[269px] min-h-[269px] flex flex-col justify-between hover:scale-105 hover:drop-shadow-md text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong transition-all ease-in-out duration-200 w-full h-fit p-4"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={authorUser?.user_img}
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                  {authorUser?.name}
                </span>
              </div>
              <TimeAgo datetime={post.createdAt} locale="en_short" />
            </div>
            <div
              onClick={() => click && navigate(`/post/${post._id}`)}
              className=""
            >
              <h2 className="font-semibold line-clamp-1 text-xl my-1 inline-block text-dusk-main dark:text-dawn-main">
                {post.title}
              </h2>
              <p className="line-clamp-4">{post.body}</p>
            </div>
          </div>
          <div>
            <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
            <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
              <div className="flex items-center gap-x-5">
                <div
                  // onClick={handleLikePost}
                  className="flex w-[84px] items-center "
                >
                  <i
                    className={`${
                      likedByUser()
                        ? 'ri-heart-3-fill text-prime-blue'
                        : 'ri-heart-3-line'
                    }  text-xl pr-1 `}
                  />
                  <span className="text-lg">
                    {post.likes.length}{' '}
                    {post.likes.length <= 1 ? 'Like' : 'Likes'}
                  </span>
                </div>
                <div className="flex items-center ">
                  <i className="ri-discuss-line pr-1 text-xl" />
                  <span className="text-lg">
                    {post.discussions.length}{' '}
                    {post.discussions.length <= 1
                      ? 'Discussion'
                      : 'Discussions'}
                  </span>
                </div>
              </div>
              {currentUser?._id !== authorUser?._id && (
                <>
                  {isSharedPosts ? (
                    <div className="text-orange flex items-center ">
                      <i className="ri-share-box-line pr-1 text-xl" />
                      <span className="text-lg">Shared</span>
                    </div>
                  ) : (
                    <div className="flex items-center ">
                      <i className="ri-share-box-line pr-1 text-xl" />
                      <span className="text-lg">Share</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.article>
      ) : (
        <div className="w-full h-screen -mt-28 flex items-center justify-center">
          <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
        </div>
      )}
    </>
  )
}
