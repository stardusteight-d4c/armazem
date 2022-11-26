import axios from 'axios'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  postMetadataById,
  likePost,
  unlikedPost,
  sharePost,
  unsharePost,
} from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Link } from '../../Link'
import { success } from '../../Toasters'
import { getCurrentUserAccount } from '../../../store/reducers/current-user-data'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'

timeago.register('en_short', en_short)

interface Props {
  postId: string
}

export const TrendingPost = ({ postId }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [post, setPost] = useState<Post | null>(null)
  const [authorUser, setAuthorUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [requestAgain, setRequestAgain] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    postId &&
      (async () => {
        await axios
          .get(`${postMetadataById}/${postId}`)
          .then(({ data }) => {
            setPost(data.post)
            setAuthorUser(data.authorUser)
            setLoading(false)
          })
          .catch((error) => console.log(error.toJSON()))
      })()
  }, [postId, requestAgain])

  const handleLikePost = async () => {
    if (likedByUser()) {
      await axios
        .put(unlikedPost, {
          userId: currentUser?._id,
          postId: post?._id,
        })
        .then(() => setRequestAgain(!requestAgain))
        .catch((error) => console.log(error.toJSON()))
    } else {
      await axios
        .put(likePost, {
          userId: currentUser?._id,
          postId: post?._id,
        })
        .then(() => setRequestAgain(!requestAgain))
        .catch((error) => console.log(error.toJSON()))
    }
  }

  const handleSharePost = async () => {
    if (!isSharedPosts) {
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

  const likedByUser = () => {
    if (post && currentUser) {
      const verificationResult = post?.likes.map((like: { by: string }) =>
        like.by === currentUser?._id ? true : false
      )
      return verificationResult.includes(true)
    }
  }

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: { id: string }) => postShared.id
  )
  const isSharedPosts = currentAccount && sharedPosts?.includes(post?._id)

  if (loading || !post) {
    return <></>
  }

  const rendersContent = () => (
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
  )

  const rendersPostState = () => (
    <div className={style.postActionsFlexContainer}>
      <div className={style.firstSectionContainer}>
        <div onClick={handleLikePost} className={style.likeContainer}>
          <i
            className={`${likedByUser() ? style.likedIcon : style.likeIcon}`}
          />
          <span className="text-lg">
            {post.likes.length}{' '}
            {post.likes.length <= 1 ? (
              <span className="inline-block">Like</span>
            ) : (
              <span className="inline-block">Likes</span>
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
          <div
            onClick={handleSharePost}
            className={`${isSharedPosts && 'text-orange'} ${
              style.shareContainer
            }`}
          >
            <i className={style.shareIcon} />
            <span className="text-lg hidden md:inline-block">
              {isSharedPosts ? 'Shared' : 'Share'}{' '}
            </span>
          </div>
        </>
      )}
    </div>
  )

  return (
    <motion.article className={style.wrapper}>
      {rendersContent()}
      <div className={style.divider} />
      {rendersPostState()}
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
  divider: `h-[1px] mt-auto w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  postActionsFlexContainer: `flex items-center justify-between text-dusk-main dark:text-dawn-main`,
  firstSectionContainer: `flex items-center gap-x-5`,
  likeContainer: `flex md:w-[84px] items-center cursor-pointer`,
  likeIcon: `ri-heart-3-line text-xl pr-1`,
  likedIcon: `ri-heart-3-fill text-prime-blue text-xl pr-1`,
  discussionContainer: `flex items-center`,
  discussionIcon: `ri-discuss-line pr-1 text-xl`,
  shareContainer: `cursor-pointer flex items-center`,
  shareIcon: `ri-share-box-line pr-1 text-xl`,
}
