import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import {
  discussionsByPostId,
  hostServer,
  postMetadataById,
} from '../services/api-routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { GridWrapper } from '../components/GridWrapper'
import { Article, DiscussionInput, Discussions } from '../components/post'
import { askToRequestAgain } from '../store'
// import { io } from 'socket.io-client'

interface Props {}

export const Post = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()
  const { id: postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [authorUser, setAuthorUser] = useState<User>()
  const [post, setPost] = useState<Post>()
  const [discussions, setDiscussions] = useState<any>({ body: '' })
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const [activeItem, setActiveItem] = useState<string>('')
  const [notFound, setNotFound] = useState<boolean>(false)
  const socket = useRef<any>()

  // socket.current = io(hostServer)

  // useEffect(() => {
  //   if (currentUser !== null && postId) {
  //     socket.current.emit('enter-post', {
  //       postId,
  //     })
  //   }
  // }, [postId])

  // socket.current.on('post-update', (data: any) => {
  //   if (data.status === true) {
  //     dispatch(askToRequestAgain())
  //   }
  // })

  useEffect(() => {
    ;(async () => {
      await Promise.all([
        axios.get(`${postMetadataById}/${postId}`),
        axios.get(`${discussionsByPostId}/${postId}`),
      ])
        .then(([{ data: postData }, { data: discussionsData }]) => {
          if (postData.status === true && discussionsData.status === true) {
            setAuthorUser(postData.authorUser)
            setPost(postData.post)
            setDiscussions(discussionsData.discussions)
            setLoading(false)
          }
        })
        .catch((error) => {
          console.log(error.toJSON())
          setNotFound(true)
        })
    })()
  }, [requestAgain])

  const PostNotFound = () => (
    <div className={style.postNotFoundContainer}>
      <i className={style.warningIcon} />
      <span className={style.spanPostNotFound}>Post Not Found</span>
    </div>
  )

  const rendersGettingData = () => (
    <div className={style.gettingDataContainer}>
      {notFound ? <PostNotFound /> : <Loader className={style.loader} />}
    </div>
  )

  return (
    <GridWrapper>
      <main className={style.wrapperMain}>
        {loading || !post || !authorUser ? (
          rendersGettingData()
        ) : (
          <>
            <Article post={post} authorUser={authorUser} />
            <DiscussionInput discussions={discussions} socket={socket} />
            <div className={style.discussionsWrapper}>
              {discussions
                .slice(0)
                .reverse()
                .map((discussion: any, index: React.Key) => (
                  <section className={style.discussionContainer} key={index}>
                    <Discussions
                      socket={socket}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      discussion={discussion}
                      currentUser={currentUser}
                    />
                  </section>
                ))}
            </div>
          </>
        )}
      </main>
    </GridWrapper>
  )
}

const style = {
  wrapperMain: `w-screen md:w-full px-2 md:px-4 pt-2 pb-20`,
  gettingDataContainer: `w-full h-screen -mt-28 flex items-center justify-center`,
  discussionsWrapper: `space-y-10 md:px-4`,
  discussionContainer: `flex flex-col`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
  postNotFoundContainer: `flex flex-col gap-y-2 items-center justify-center`,
  warningIcon: `ri-error-warning-line text-red text-7xl`,
  spanPostNotFound: `font-semibold text-3xl`,
}
