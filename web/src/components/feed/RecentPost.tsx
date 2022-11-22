import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  likePost,
  postMetadataById,
  unlikedPost,
} from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const RecentPost = ({ post }: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [authorUser, setAuthorUser] = useState<User | any>([])

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
    if (likedByUser()) {
      const { data } = await axios.post(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        // setPostUpdatedData(!postUpdatedData)
      }
    } else {
      const { data } = await axios.post(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      if (data.status === true) {
        // setPostUpdatedData(!postUpdatedData)
      }
    }
  }

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPosts = currentAccount && sharedPosts?.includes(post?._id)

  return (
    <article className="p-4 inline-block max-h-fit bg-dusk-weak/10 h-fit border border-dawn-weak/20 dark:border-dusk-weak/20 w-full">
      <div>
        <div className='flex items-center gap-x-2'>
          <img src={authorUser.user_img} className="w-8 h-8 rounded-md" />
          <h3 className="font-medium text-dawn-weak line-clamp-2">
            Posted by @{authorUser.username}{' '}
            <TimeAgo datetime={post.createdAt} />
          </h3>
        </div>
        <h2 className="font-semibold break-all line-clamp-2 text-xl my-1">{post.title}</h2>
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
                  likedByUser()
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
              {isSharedPosts ? (
                <div className="text-orange flex items-center cursor-pointer">
                  <i className="ri-share-box-line pr-1 text-xl" />
                  <span className="text-lg">Shared</span>
                </div>
              ) : (
                <div className="flex items-center cursor-pointer">
                  <i className="ri-share-box-line pr-1 text-xl" />
                  <span className="text-lg">Share</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
