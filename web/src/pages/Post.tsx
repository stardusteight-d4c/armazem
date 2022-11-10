import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Discussions, Navbar, Sidebar } from '../components'
import { Loader } from '../components/Loader'
import { error, success } from '../components/Toasters'
import {
  addNewDiscussion,
  deletePost,
  discussionsByPostId,
  likePost,
  postMetadataById,
  sharePost,
  unlikedPost,
  unsharePost,
  updatePost,
} from '../services/api-routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { askToRequestAgain } from '../store'
import { ConnectionStatus } from '../components/ConnectionStatus'
import { PageNotFound } from './PageNotFound'
import { io } from 'socket.io-client'

interface Props {
  // socket: React.MutableRefObject<any>
}

export const Post = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const { id: postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [authorUser, setAuthorUser] = useState<User>()
  const [post, setPost] = useState<Post>()
  const [postComment, setPostComment] = useState<any>({ body: '' })
  const [discussions, setDiscussions] = useState<any>({ body: '' })
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const dispatch = useAppDispatch()
  const [editValue, setEditValue] = useState(post?.body)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('')
  const [notFound, setNotFound] = useState<boolean>(false)

  const socket = useRef<any>()
  socket.current = io('http://localhost:5000')

  useEffect(() => {
    if (currentUser !== null && postId) {
      socket.current.emit('enter-post', {
        postId,
        userId: currentUser._id,
      })
    }
  }, [])

  socket.current.on('post-update', (data: any) => {
    console.log(data);
    if (data.status === true) {
      dispatch(askToRequestAgain())
    }
  })

  useEffect(() => {
    ;(async () => {
      if (!post) {
        setLoading(true)
      }
      try {
        const [{ data: postData }, { data: discussionsData }] =
          await Promise.all([
            axios.get(`${postMetadataById}/${postId}`),
            axios.get(`${discussionsByPostId}/${postId}`),
          ])
        if (postData.status === true && discussionsData.status === true) {
          setAuthorUser(postData.authorUser)
          setPost(postData.post)
          setDiscussions(discussionsData.discussions)
          setEditValue(postData.post.body)
          setLoading(false)
        }
      } catch (err) {
        setNotFound(true)
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
      success(data.msg)
      setPostComment({ body: '' })
      socket.current.emit('post-update', {
        postId,
        userId: currentUser?._id,
        body: postComment.body,
      })
      dispatch(askToRequestAgain())
    }
    if (data.status === false) {
      error(data.msg)
    }
  }

  const handleLikePost = async () => {
    if (likedByUser()) {
      await axios.post(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      dispatch(askToRequestAgain())
    } else {
      await axios.post(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      dispatch(askToRequestAgain())
    }
  }

  function handleActiveItemEditOnClick() {
    activeItem === post?._id + 'EDIT'
      ? setActiveItem('')
      : setActiveItem(post?._id + 'EDIT')
  }

  function handleActiveItemDeleteOnClick() {
    activeItem === post?._id + 'DELETE'
      ? setActiveItem('')
      : setActiveItem(post?._id + 'DELETE')
  }

  function handleActiveItemShareOnClick() {
    activeItem === post?._id + 'SHARE'
      ? setActiveItem('')
      : setActiveItem(post?._id + 'SHARE')
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

  const editPost = async () => {
    const { data } = await axios.post(updatePost, {
      postId: post?._id,
      body: editValue,
    })
    if (data.status === true) {
      success(data.msg)
      dispatch(askToRequestAgain())
      setActiveItem('')
    }
    if (data.status === false) {
      error(data.msg)
    }
  }

  const addPostToSharedPosts = async () => {
    const { data } = await axios.post(sharePost, {
      postId: post?._id,
      accountId: currentUser?.account,
    })
    if (data.status === true) {
      success(data.msg)
      dispatch(askToRequestAgain())
      setActiveItem('')
    }
    if (data.status === false) {
      error(data.msg)
      setActiveItem('')
    }
  }

  const removePostToSharedPosts = async () => {
    const { data } = await axios.post(unsharePost, {
      postId: post?._id,
      accountId: currentUser?.account,
    })
    if (data.status === true) {
      success(data.msg)
      dispatch(askToRequestAgain())
      setActiveItem('')
    }
    if (data.status === false) {
      error(data.msg)
      setActiveItem('')
    }
  }

  const removePost = async () => {
    const { data } = await axios.post(deletePost, {
      postId: post?._id,
      accountId: currentUser?.account,
    })
    if (data.status === true) {
      success(data.msg)
      navigate(`/${authorUser?.username}`)
    }
  }

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPosts = currentAccount && sharedPosts?.includes(post?._id)

  const PostNotFound = () => {
    return (
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <i className="ri-error-warning-line text-red text-7xl " />
        <span className="font-semibold text-3xl">Post Not Found</span>
      </div>
    )
  }
  // Criar para conta tbm

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        <main className="px-4 pt-2 pb-20">
          {loading ? (
            <div className="w-full h-screen -mt-28 flex items-center justify-center">
              {notFound ? (
                <PostNotFound />
              ) : (
                <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
              )}
            </div>
          ) : (
            <>
              <article className="px-4 pb-3 border border-dawn-weak/20 dark:border-dusk-weak/20 bg-white dark:bg-fill-strong pt-4 mt-4">
                <header>
                  <div className="flex justify-between pb-4 items-center">
                    <span className="text-4xl font-inter font-semibold w-[700px]">
                      {post?.title}
                    </span>
                    <span className="text-lg w-fit mt-2">
                      {new Date(post!.createdAt).toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/${authorUser?.username}`}
                      className="flex items-start justify-start gap-x-2"
                    >
                      <img
                        className="w-14 rounded-md h-14"
                        src={authorUser?.user_img}
                        alt=""
                      />
                      <div className="flex flex-col -mt-1 text-dusk-main/90 dark:text-dawn-main/90">
                        <span className="text-2xl font-semibold">
                          {authorUser?.name}
                        </span>
                        <span className="text-lg">{authorUser?.username}</span>
                      </div>
                    </Link>
                    {authorUser?._id !== currentUser?._id && (
                      <ConnectionStatus
                        userMetadata={authorUser!}
                        currentAccount={currentAccount}
                      />
                    )}
                  </div>
                </header>

                {activeItem === post?._id + 'EDIT' ? (
                  <div className="flex flex-col">
                    <textarea
                      value={editValue}
                      maxLength={855}
                      minLength={50}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="p-1 mt-1 text-lg outline-none bg-transparent border-prime-blue border max-h-56 min-h-[180px]  text-dusk-main/90 dark:text-dawn-main/90"
                    />
                    <div className="flex justify-end">
                      <Button
                        disabled={
                          editValue?.trim() === '' && editValue?.length <= 50
                        }
                        title="Submit"
                        onClick={() => editPost()}
                        className="!bg-prime-blue my-2 px-4 py-2 !w-fit"
                      />
                    </div>
                  </div>
                ) : (
                  <pre className="py-2 font-inter break-words whitespace-pre-wrap text-xl leading-9 mt-2">
                    {post!.body}
                  </pre>
                )}
                <div className="h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
                <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
                  <div className="flex items-center gap-x-5">
                    <div
                      onClick={handleLikePost}
                      className="flex items-center  cursor-pointer"
                    >
                      {likedByUser && (
                        <>
                          <i
                            className={`${
                              likedByUser()
                                ? 'ri-heart-3-fill text-prime-blue'
                                : 'ri-heart-3-line'
                            }  text-2xl pr-1`}
                          />
                        </>
                      )}
                      <span className="text-xl">
                        {post?.likes.length}{' '}
                        {post?.likes.length <= 1 ? 'Like' : 'Likes'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-5 cursor-pointer">
                    {authorUser?._id !== currentUser?._id && (
                      <>
                        {isSharedPosts ? (
                          <div className="relative">
                            <div
                              onClick={handleActiveItemShareOnClick}
                              className="text-orange flex items-center cursor-pointer"
                            >
                              <i className="ri-share-box-line pr-1 text-2xl" />
                              <span className="text-xl">Shared</span>
                            </div>
                            {activeItem === post?._id + 'SHARE' && (
                              <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[4px] -bottom-[60px]">
                                <a
                                  onClick={() => removePostToSharedPosts()}
                                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                                >
                                  Unshare
                                </a>
                                <a
                                  onClick={() => setActiveItem('')}
                                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                                >
                                  Cancel
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <div
                              onClick={handleActiveItemShareOnClick}
                              className={`${
                                activeItem === post?._id + 'SHARE' &&
                                'text-orange'
                              } flex items-center cursor-pointer`}
                            >
                              <i className="ri-share-box-line p-1 text-2xl" />
                              <span className="text-xl">Share</span>
                            </div>
                            {activeItem === post?._id + 'SHARE' && (
                              <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[2px] -bottom-[60px]">
                                <a
                                  onClick={() => addPostToSharedPosts()}
                                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                                >
                                  Share
                                </a>
                                <a
                                  onClick={() => setActiveItem('')}
                                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                                >
                                  Cancel
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    {authorUser?._id === currentUser?._id && (
                      <>
                        <div
                          onClick={handleActiveItemEditOnClick}
                          className={`${
                            activeItem === post?._id + 'EDIT' &&
                            'text-prime-blue'
                          } flex items-center cursor-pointer`}
                        >
                          <i className="ri-edit-2-fill p-1 text-2xl" />
                          <span className="text-xl">Edit</span>
                        </div>
                        <div
                          onClick={handleActiveItemDeleteOnClick}
                          className={`${
                            activeItem === post?._id + 'DELETE' && 'text-red'
                          } flex relative items-center cursor-pointer`}
                        >
                          <i className="ri-delete-bin-2-fill p-1 text-2xl" />
                          <span className="text-xl">Delete</span>
                          {activeItem === post?._id + 'DELETE' && (
                            <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[2px] -bottom-[60px]">
                              <a
                                onClick={() => removePost()}
                                className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                              >
                                Delete
                              </a>
                              <a
                                onClick={() => setActiveItem('')}
                                className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                              >
                                Cancel
                              </a>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>
              <div className="mb-5 px-4">
                <div className="flex items-center mt-16 mb-8">
                  <span className="text-2xl font-semibold">
                    <div className="flex items-center space-x-1">
                      <i className="ri-discuss-line text-2xl pr-1" />
                      <span className="text-xl">
                        {discussions.length}{' '}
                        {discussions.length <= 1 ? 'Discussion' : 'Discussions'}
                      </span>
                    </div>
                  </span>
                </div>
                <div className="flex items-start gap-x-5">
                  <img
                    src={currentUser?.user_img}
                    alt=""
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      {currentUser?.name}
                    </span>
                    <textarea
                      maxLength={255}
                      minLength={5}
                      id="body"
                      value={postComment.body}
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

              <div className="space-y-10 px-4">
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
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-xl dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
