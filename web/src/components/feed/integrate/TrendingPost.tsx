import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { postMetadataById, unlikedPost } from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Loader } from '../../Loader'
import { handleLoading } from '../../../store'
timeago.register('en_short', en_short)

interface Props {
  postId: any
}

export const TrendingPost = ({ postId }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [post, setPost] = useState<any>([])
  const [authorUser, setAuthorUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [click, setClick] = useState<any>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
      {!loading && (
        <motion.article
          whileTap={{ cursor: 'grabbing' }}
          className="md:max-w-[450px] md:min-w-[450px] min-w-full max-w-full w-full border border-dawn-weak/20 dark:border-dusk-weak/20 max-h-[269px] min-h-[269px] flex flex-col justify-between hover:scale-105 hover:drop-shadow-md text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong transition-all ease-in-out duration-200  h-fit p-4"
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
                  className="flex md:w-[84px] items-center "
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
                    {post.likes.length <= 1 ? (
                      <div className="hidden md:inline-block">Like</div>
                    ) : (
                      <div className="hidden md:inline-block">Likes</div>
                    )}
                  </span>
                </div>
                <div className="flex items-center ">
                  <i className="ri-discuss-line pr-1 text-xl" />
                  <span className="text-lg">
                    {post.discussions.length}{' '}
                    {post.discussions.length <= 1 ? (
                      <div className="hidden md:inline-block">Discussion</div>
                    ) : (
                      <div className="hidden md:inline-block">Discussions</div>
                    )}
                  </span>
                </div>
              </div>
              {currentUser?._id !== authorUser?._id && (
                <>
                  {isSharedPosts ? (
                    <div className="text-orange flex items-center ">
                      <i className="ri-share-box-line pr-1 text-xl" />
                      <span className="text-lg hidden md:inline-block">
                        Shared
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center ">
                      <i className="ri-share-box-line pr-1 text-xl" />
                      <span className="text-lg hidden md:inline-block">
                        Share
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.article>
      )}
    </>
  )
}
