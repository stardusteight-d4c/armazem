import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button, Discussions, Navbar, Sidebar } from '../components'
import { Loader } from '../components/Loader'
import { error, success } from '../components/Toasters'
import { addNewDiscussion, postMetadataById } from '../services/api-routes'
import { useAppSelector } from '../store/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'

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

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data: postData } = await axios.get(
        `${postMetadataById}/${postId}`
      )
      if (postData.status === true) {
        setAuthorAccount(postData.authorAccount)
        setAuthorUser(postData.authorUser)
        setPost(postData.post)

        setLoading(false)
      } else {
        error(postData.msg.error)
      }
    })()
  }, [])

  console.log(post)
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
    await axios.post(addNewDiscussion, {
      postId,
      userId: currentUser?._id,
      body: postComment.body,
    })
  }

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        <main className="px-4 py-8">
          {loading ? (
            <div className="w-full h-screen -mt-28 flex items-center justify-center">
              <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
            </div>
          ) : (
            <>
              <article>
                <header>
                  <div className="flex justify-between pb-8 items-center">
                    <span className="text-4xl font-semibold">
                      {post?.title}
                    </span>
                    <span className="text-lg w-fit mt-1">
                      <TimeAgo datetime={post!.createdAt} locale="en_short" />
                    </span>
                  </div>
                  <div className="flex justify-between border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm items-center bg-dusk-weak/10 dark:bg-dusk-weak/5 p-2">
                    <div className="flex items-start justify-start gap-x-2">
                      <img
                        className="w-16 h-16 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20"
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

                <pre className="p-2 font-poppins break-words whitespace-pre-wrap text-2xl leading-9 mt-8">
                  {post!.body}
                </pre>
                <div className="h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
                <div className="flex px-2 items-center justify-between text-dusk-main dark:text-dawn-main">
                  <div className="flex items-center gap-x-5">
                    <div className="flex items-center  cursor-pointer">
                      <i className="ri-heart-3-line text-3xl p-1" />
                      <span className='text-xl'>25 Likes</span>
                    </div>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <i className="ri-share-box-line p-1 text-3xl" />
                    <span className="text-xl">Share</span>
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
                {post?.discussions.map((discussion, index) => (
                  <section className="flex flex-col" key={index}>
                    <Discussions
                      post={post}
                      discussion={discussion}
                      currentUser={currentUser}
                    />
                  </section>
                ))}
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
