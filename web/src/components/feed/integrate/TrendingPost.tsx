import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import {
  likePost,
  postMetadataById,
  unlikedPost,
} from '../../../services/api-routes'
import { useAppSelector } from '../../../store/hooks'
import { Link } from '../../Link'
timeago.register('en_short', en_short)

interface Props {
  postId: string
}

export const TrendingPost = ({ postId }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [post, setPost] = useState<any>([])
  const [authorUser, setAuthorUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    postId &&
      (async () => {
        const { data } = await axios.get(`${postMetadataById}/${postId}`)
        if (data.status === true) {
          setPost(data.post)
          setAuthorUser(data.authorUser)
          setLoading(false)
        }
      })()
  }, [postId])

  const handleLikePost = async () => {
    if (likedByUser()) {
      await axios.post(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
    } else {
      await axios.post(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
    }
  }

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

  if (loading) {
    return <></>
  }

  // deixar like dinâmico e separar responsabilidade de renderizações das 'actions/social' pois possuem maior lógica de renderização
  return (
    <motion.article className={style.wrapper}>
      <div>
        <Link
          to={`/${authorUser?.username}`}
          className={style.authorFlexContainer}
        >
          <div className={style.authorInfo}>
            <img className={style.authorImg} src={authorUser?.user_img} />
            <span className={style.authorName}>{authorUser?.name}</span>
          </div>
          <TimeAgo datetime={post.createdAt} locale="en_short" />
        </Link>
        <Link to={`/post/${post._id}`}>
          <h2 className={style.postTitle}>{post.title}</h2>
          <p className={style.postBody}>{post.body}</p>
        </Link>
      </div>
      <div>
        <div className={style.divider} />
        <div className={style.postActionsFlexContainer}>
          <div className={style.firstSectionContainer}>
            <div onClick={handleLikePost} className={style.likeContainer}>
              <i
                className={`${
                  likedByUser() ? style.likedIcon : style.likeIcon
                }`}
              />
              <span className="text-lg">
                {post.likes.length}{' '}
                {post.likes.length <= 1 ? (
                  <div className="inline-block">Like</div>
                ) : (
                  <div className="inline-block">Likes</div>
                )}
              </span>
            </div>
            <div className={style.discussionContainer}>
              <i className={style.discussionIcon} />
              <span className="text-lg">
                {post.discussions.length}{' '}
                {post.discussions.length <= 1 ? (
                  <div className="inline-block">Discussion</div>
                ) : (
                  <div className="inline-block">Discussions</div>
                )}
              </span>
            </div>
          </div>
          {currentUser?._id !== authorUser?._id && (
            <>
              {isSharedPosts ? (
                <div className="text-orange flex items-center">
                  <i className="ri-share-box-line pr-1 text-xl" />
                  <span className="text-lg hidden md:inline-block">Shared</span>
                </div>
              ) : (
                <div className="flex items-center ">
                  <i className="ri-share-box-line pr-1 text-xl" />
                  <span className="text-lg hidden md:inline-block">Share</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const style = {
  wrapper: `flex flex-col justify-between h-fit p-4 min-w-full max-h-[269px] min-h-[269px] md:max-w-[450px] md:min-w-[450px] w-full border border-dawn-weak/20 dark:border-dusk-weak/20 text-neutral-weak dark:text-neutral-main bg-white dark:bg-fill-strong transition-all ease-in-out duration-200`,
  authorFlexContainer: `flex items-center justify-between`,
  authorInfo: `flex items-center gap-3`,
  authorImg: `w-12 h-12 rounded-md object-cover`,
  authorName: `font-medium text-xl text-dusk-main dark:text-dawn-main`,
  postTitle: `font-semibold w-full truncate text-xl my-1 inline-block text-dusk-main dark:text-dawn-main`,
  postBody: `line-clamp-4 break-words`,
  divider: `h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  postActionsFlexContainer: `flex items-center justify-between text-dusk-main dark:text-dawn-main`,
  firstSectionContainer: `flex items-center gap-x-5`,
  likeContainer: `flex md:w-[84px] items-center cursor-pointer`,
  likeIcon: `ri-heart-3-line text-xl pr-1`,
  likedIcon: `ri-heart-3-fill text-prime-blue text-xl pr-1`,
  discussionContainer: `flex items-center`,
  discussionIcon: `ri-discuss-line pr-1 text-xl`,
}
