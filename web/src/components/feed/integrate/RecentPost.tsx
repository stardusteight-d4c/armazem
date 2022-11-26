import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  likePost,
  postMetadataById,
  sharePost,
  unlikedPost,
  unsharePost,
} from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { success } from '../../Toasters'
import { getCurrentUserAccount } from '../../../store/reducers/current-user-data'
import { askToRequestAgain } from '../../../store'
timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const RecentPost = ({ post }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [authorUser, setAuthorUser] = useState<User | any>([])
  const dispatch = useAppDispatch()
  const [likedByUser, setLikedByUser] = useState<boolean>()
  const [request, setRequest] = useState(false)
  const [arrLikesCopy, setArrLikesCopy] = useState<any>()

  useEffect(() => {
    setArrLikesCopy([...post.likes])
  }, [])

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
          console.log('arrLikesCopy remove realizado', arrLikesCopy)
          setRequest(!request)
        })
        .catch((error) => console.log(error.toJSON()))
    } else {
      await axios
        .put(likePost, {
          userId: currentUser?._id,
          postId: post?._id,
        })
        .then(() => {
          arrLikesCopy.push({ by: currentUser?._id })

          setRequest(!request)
        })
        .catch((error) => console.log(error.toJSON()))
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

  useEffect(() => {
    if (arrLikesCopy) {
      const verificationResult = arrLikesCopy.map(
        (like: { by: string | undefined }) => {
          if (like.by == currentUser?._id) {
            return true
          } else {
            return false
          }
        }
      )
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', likedByUser)

      setLikedByUser(verificationResult.includes(true))
    }
  }, [request])

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPost = currentAccount && sharedPosts?.includes(post?._id)

  return (
    <article className="p-4 inline-block max-h-fit bg-dusk-weak/10 h-fit border border-dawn-weak/20 dark:border-dusk-weak/20 w-full">
      <div>
        <div className="flex items-center gap-x-2">
          <img src={authorUser.user_img} className="w-8 h-8 rounded-md" />
          <h3 className="font-medium text-dawn-weak line-clamp-2">
            Posted by @{authorUser.username}{' '}
            <TimeAgo datetime={post.createdAt} />
          </h3>
        </div>
        <h2 className="font-semibold break-all line-clamp-2 text-xl my-1">
          {post.title}
        </h2>
        <p className="line-clamp-[10] font-inter break-all break-words whitespace-pre-wrap">
          {post.body}
        </p>
      </div>
      <div>
        <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
        <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
          <div className="flex items-center gap-x-5">
            <div
              onClick={handleLikePost}
              className="flex w-[84px] items-center cursor-pointer"
            >
              <i
                className={`${
                  likedByUser
                    ? 'ri-heart-3-fill text-prime-blue'
                    : 'ri-heart-3-line'
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
  shareContainer: `cursor-pointer flex items-center`,
  shareIcon: `ri-share-box-line pr-1 text-xl`,
}
