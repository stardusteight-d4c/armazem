import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import axios from 'axios'
import {
  likePost,
  sharePost,
  unlikedPost,
  unsharePost,
} from '../../../services/api-routes'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { success } from '../../Toasters'
import { getCurrentUserAccount } from '../../../store/reducers/current-user-data'

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
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const dispatch = useAppDispatch()

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
      const { data } = await axios.put(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        setPostUpdatedData(!postUpdatedData)
      }
    } else {
      const { data } = await axios.put(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        setPostUpdatedData(!postUpdatedData)
      }
    }
  }

  const handleSharePost = async () => {
    if (!isSharedPost) {
      await axios
        .put(sharePost, {
          postId: post?._id,
          accountId: currentUser?.account,
        })
        .then(async ({ data }) => {
          success(data.msg)
          await dispatch(getCurrentUserAccount())
        })
        .catch((error) => console.log(error.toJSON()))
    } else {
      await axios
        .put(unsharePost, {
          postId: post?._id,
          accountId: currentUser?.account,
        })
        .then(async ({ data }) => {
          success(data.msg)
          await dispatch(getCurrentUserAccount())
        })
        .catch((error) => console.log(error.toJSON()))
    }
  }

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPost = currentAccount && sharedPosts?.includes(post?._id)

  return (
    <article className={style.wrapper}>
      <div className={style.postMetadataContainer}>
        <div className={style.authorFlexContainer}>
          <img
            src={userMetadata?.user_img}
            alt="author/img"
            className={style.authorImg}
          />
          <span className={style.authorName}>{userMetadata?.name}</span>
        </div>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <Link to={`/post/${post._id}`} className="cursor-pointer">
        <h2 className={style.title}>{post.title}</h2>
        <p className={style.body}>{post.body}</p>
      </Link>
      <div className={style.divider} />
      <div className={style.postActionsFlexContainer}>
        <div className={style.likeDiscussionContainer}>
          <div onClick={handleLikePost} className={style.likeContainer}>
            <i
              className={`${
                likedByUser() ? style.likedIcon : style.likeIcon
              }  text-xl pr-1 `}
            />
            <span className="text-lg">
              {post.likes.length} {post.likes.length <= 1 ? 'Like' : 'Likes'}
            </span>
          </div>
          <div className={style.discussionContainer}>
            <i className={style.discussionIcon} />
            <span className="text-lg">
              {post.discussions.length}{' '}
              {post.discussions.length <= 1 ? 'Discussion' : 'Discussions'}
            </span>
          </div>
        </div>
        {currentUser?._id !== userMetadata?._id && (
          <>
            <div
              onClick={handleSharePost}
              className={`${isSharedPost && 'text-orange'} ${
                style.shareContainer
              }`}
            >
              <i className={style.shareIcon} />
              <span className="text-lg hidden md:inline-block">
                {isSharedPost ? 'Shared' : 'Share'}
              </span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

const style = {
  wrapper: `cursor-default border border-dawn-weak/20 dark:border-dusk-weak/20 hover:scale-105 hover:drop-shadow-md text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong transition-all ease-in-out duration-200 w-full h-fit p-4`,
  postMetadataContainer: `flex items-center justify-between`,
  authorFlexContainer: `flex items-center gap-3`,
  authorImg: `w-12 h-12 object-cover`,
  authorName: `font-medium text-xl text-dusk-main dark:text-dawn-main`,
  title: `font-semibold line-clamp-1 text-xl my-1 inline-block text-dusk-main dark:text-dawn-main`,
  body: `line-clamp-4 break-all`,
  divider: `h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  postActionsFlexContainer: `flex items-center justify-between text-dusk-main dark:text-dawn-main`,
  likeDiscussionContainer: `flex items-center gap-x-5`,
  likeContainer: `flex w-[84px] items-center cursor-pointer`,
  likedIcon: `ri-heart-3-fill text-prime-blue`,
  likeIcon: `ri-heart-3-line`,
  discussionContainer: `flex items-center cursor-pointer`,
  discussionIcon: `ri-discuss-line pr-1 text-xl`,
  shareContainer: `cursor-pointer flex items-center`,
  shareIcon: `ri-share-box-line pr-1 text-xl`,
}
