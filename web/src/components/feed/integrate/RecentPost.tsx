import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  likePost,
  postMetadataById,
  sharePost,
  unlikedPost,
  unsharePost,
} from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { success } from '../../Toasters'
import { getCurrentUserAccount } from '../../../store/reducers/current-user-data'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const RecentPost = ({ post }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [authorUser, setAuthorUser] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  const [likedByUser, setLikedByUser] = useState<boolean>(false)
  const [likeRecalculation, setLikeRecalculation] = useState(false)
  const [arrLikesCopy, setArrLikesCopy] = useState<Array<{ by: string }>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setArrLikesCopy([...post.likes])
  }, [post])

  useEffect(() => {
    if (post._id) {
      ;(async () => {
        const { data } = await axios.get(`${postMetadataById}/${post._id}`)
        if (data.status === true) {
          setAuthorUser(data.authorUser)
        }
      })()
    }
  }, [post])

  const handleLikePost = async () => {
    if (likedByUser) {
      await axios
        .put(unlikedPost, {
          userId: currentUser?._id,
          postId: post?._id,
        })
        .then(() => {
          const index = arrLikesCopy.findIndex(
            (value: any) => value.by === currentUser?._id
          )
          if (index !== -1) {
            arrLikesCopy.splice(index, 1)
          }
          setLikeRecalculation(!likeRecalculation)
        })
        .catch((error) => console.log(error.toJSON()))
    } else {
      await axios
        .put(likePost, {
          userId: currentUser?._id,
          postId: post?._id,
        })
        .then(() => {
          arrLikesCopy.push({ by: currentUser!._id })
          setLikeRecalculation(!likeRecalculation)
        })
        .catch((error) => console.log(error.toJSON()))
    }
  }

  setTimeout(() => {
    setLoading(false)
  }, 500)

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

  useEffect(() => {
    const verificationResult = arrLikesCopy.map((like: { by: string }) => {
      if (like.by === currentUser?._id) {
        return true
      } else {
        return false
      }
    })
    setLikedByUser(verificationResult.includes(true))
  }, [post, likeRecalculation, loading])

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPost = currentAccount && sharedPosts?.includes(post?._id)

  return (
    <article className={style.wrapper}>
      <div>
        <div className={style.authorContainer}>
          <img src={authorUser?.user_img} className={style.authorImage} />
          <h3 className={style.postedBy}>
            Posted by @{authorUser?.username}{' '}
            <TimeAgo datetime={post.createdAt} />
          </h3>
        </div>
        <h2 className={style.title}>{post.title}</h2>
        <p className={style.body}>{post.body}</p>
      </div>
      <div>
        <div className={style.divider} />
        <div className={style.postActionsFlexContainer}>
          <div className={style.firstSectionContainer}>
            <div onClick={handleLikePost} className={style.likeContainer}>
              <i className={likedByUser ? style.likedIcon : style.likeIcon} />
              <span className="text-lg">
                {arrLikesCopy.length}{' '}
                {arrLikesCopy.length <= 1 ? 'Like' : 'Likes'}
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
          {currentUser?._id !== post.by && (
            <>
              <div
                onClick={handleSharePost}
                className={`${isSharedPost && 'text-orange'} ${
                  style.shareContainer
                }`}
              >
                <i className={style.shareIcon} />
                <span className="text-lg hidden md:inline-block">
                  {isSharedPost ? 'Shared' : 'Share'}{' '}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

const style = {
  wrapper: `p-4 inline-block max-h-fit bg-dusk-weak/10 h-fit border border-dawn-weak/20 dark:border-dusk-weak/20 w-full`,
  authorContainer: `flex items-center gap-x-2`,
  authorImage: `w-8 h-8 rounded-md`,
  postedBy: `font-medium text-dawn-weak line-clamp-2`,
  title: `font-semibold break-all line-clamp-2 text-xl my-1`,
  body: `line-clamp-[10] font-inter break-all break-words whitespace-pre-wrap`,
  divider: `h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  postActionsFlexContainer: `flex items-center justify-between text-dusk-main dark:text-dawn-main`,
  firstSectionContainer: `flex items-center gap-x-5`,
  likeContainer: `flex w-[84px] items-center cursor-pointer`,
  likeIcon: `ri-heart-3-line text-xl pr-1`,
  likedIcon: `ri-heart-3-fill text-prime-blue text-xl pr-1`,
  discussionContainer: `flex items-center cursor-pointer`,
  discussionIcon: `ri-discuss-line pr-1 text-xl`,
  shareContainer: `cursor-pointer flex items-center`,
  shareIcon: `ri-share-box-line pr-1 text-xl`,
}
