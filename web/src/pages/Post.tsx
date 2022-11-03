import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button, Discussions, Navbar, Sidebar } from '../components'
import { Loader } from '../components/Loader'
import { error, success } from '../components/Toasters'
import {
  addNewDiscussion,
  discussionsByPostId,
  likePost,
  postMetadataById,
  unlikedPost,
} from '../services/api-routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { askToRequestAgain } from '../store'

timeago.register('en_short', en_short)

interface Props {}

export const Post = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const { id: postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [authorAccount, setAuthorAccount] = useState()
  const [authorUser, setAuthorUser] = useState<User>()
  const [post, setPost] = useState<Post>()
  const [postComment, setPostComment] = useState<any>({ body: '' })
  const [discussions, setDiscussions] = useState<any>({ body: '' })
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const dispatch = useAppDispatch()

  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [{ data: postData }, { data: discussionsData }] = await Promise.all(
        [
          axios.get(`${postMetadataById}/${postId}`),
          axios.get(`${discussionsByPostId}/${postId}`),
        ]
      )
      if (postData.status === true && discussionsData.status === true) {
        // setAuthorAccount(postData.authorAccount)
        setAuthorUser(postData.authorUser)
        setPost(postData.post)
        setDiscussions(discussionsData.discussions)
        setLoading(false)
      } else {
        error(postData.msg.error)
      }
    })()
  }, [requestAgain])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostComment({
      ...postComment,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmitMainDiscussion = async () => {
    const { data } = await axios.post(addNewDiscussion, {
      postId,
      userId: currentUser?._id,
      body: postComment.body,
    })
    if (data.status === true) {
      console.log('executed')
      setTimeout(() => {
        dispatch(askToRequestAgain())
      }, 200)
    }
  }

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
      const verificationResult = post?.likes.map((like: { by: string | undefined }) => {
        if (like.by == currentUser?._id) {
          return true
        } else {
          return false
        }
      })
     
      
      return verificationResult.includes(true)
    }
  }

  console.log('likedByUser()', likedByUser());
  

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        <main className="px-4 pt-2 pb-20">
          {loading ? (
            <div className="w-full h-screen -mt-28 flex items-center justify-center">
              <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
            </div>
          ) : (
            <>
              <article className="px-4 py-8">
                <header>
                  <div className="flex justify-between pb-4 items-center">
                    <span className="text-4xl font-semibold">
                      {post?.title}
                    </span>
                    <span className="text-lg w-fit mt-2">
                      <TimeAgo datetime={post!.createdAt} locale="en_short" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div className="flex items-start justify-start gap-x-2">
                      <img
                        className="w-14 h-14"
                        src={authorUser?.user_img}
                        alt=""
                      />
                      <div className="flex flex-col text-dusk-main/90 dark:text-dawn-main/90">
                        <span className="text-2xl font-light">
                          {authorUser?.name}
                        </span>
                        <span className="text-lg">{authorUser?.username}</span>
                      </div>
                    </div>
                    <span className="text-green">Connected</span>
                  </div>
                </header>

                <pre className="p-2 font-poppins break-words whitespace-pre-wrap text-xl leading-9 mt-2">
                  {post!.body}
                </pre>
                <div className="h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
                <div className="flex px-2 items-center justify-between text-dusk-main dark:text-dawn-main">
                  <div className="flex items-center gap-x-5">
                    <div className="flex items-center  cursor-pointer">
                      {likedByUser && (
                        <>
                        {console.log(likedByUser)}
                        <i
                          onClick={handleLikePost}
                          className={`${
                            likedByUser()
                              ? 'ri-heart-3-fill text-red'
                              : 'ri-heart-3-line'
                          }  text-2xl p-1`}
                        />
                        </>

                      )}
                      <span className="text-xl">
                        {post?.likes.length} Likes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-5 cursor-pointer">
                    {authorUser?._id !== currentUser?._id && (
                      <div className="flex items-center cursor-pointer">
                        <i className="ri-share-box-line p-1 text-2xl" />
                        <span className="text-xl">Share</span>
                      </div>
                    )}
                    {authorUser?._id === currentUser?._id && (
                      <>
                        <div className="flex items-center cursor-pointer">
                          <i className="ri-edit-2-fill p-1 text-2xl" />
                          <span className="text-xl">Edit</span>
                        </div>
                        <div className="flex items-center cursor-pointer">
                          <i className="ri-delete-bin-2-fill p-1 text-2xl" />
                          <span className="text-xl">Delete</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>
              <div className="flex items-center mt-16 mb-8">
                <span className="text-2xl  font-semibold">Discussion</span>
              </div>
              <div className="mb-5">
                <div className="flex items-start gap-x-5">
                  <img
                    src={currentUser?.user_img}
                    alt=""
                    className="w-14 h-14 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      {currentUser?.name}
                    </span>
                    <textarea
                      maxLength={255}
                      minLength={5}
                      id="body"
                      onChange={(e) => handleChange(e)}
                      placeholder="Type what you think about this subject"
                      className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none"
                    />
                  </div>
                </div>
                <div className=" flex justify-end ">
                  <Button
                    title="Submit"
                    onClick={() => handleSubmitMainDiscussion()}
                    className="bg-prime-blue my-5 !w-fit px-4 py-2"
                  />
                </div>
              </div>

              <div className=" space-y-10">
                {discussions
                  .slice(0)
                  .reverse()
                  .map(
                    (discussion: any, index: React.Key | null | undefined) => (
                      <section className="flex flex-col" key={index}>
                        <Discussions
                          activeItem={activeItem}
                          setActiveItem={setActiveItem}
                          discussion={discussion}
                          currentUser={currentUser}
                        />
                      </section>
                    )
                  )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-xl dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto  text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
