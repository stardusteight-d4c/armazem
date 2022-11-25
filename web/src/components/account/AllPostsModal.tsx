import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  askToRequestAgain,
  handleOpenModal,
  handleUserMetadata,
} from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import {
  dataByUsername,
  postByPagination,
  searchUserPostByTitle,
} from '../../services/api-routes'
import { Link } from 'react-router-dom'

interface Props {}

export const AllPostsModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    searching ? searchByTerm() : getPostsData()
  }, [searching, page, searchTerm])

  const getPostsData = async () => {
    const { data } = await axios.get(
      `${postByPagination}/${userMetadata?._id}/${page}`
    )
    if (data.status === true) {
      setPosts(data.posts)
    }
  }

  const searchByTerm = async () => {
    if (searchTerm.length >= 3) {
      const { data } = await axios.post(searchUserPostByTitle, {
        searchTerm: searchTerm,
        userId: userMetadata?._id,
      })
      setPosts(data.posts)
    } else {
      setSearching(false)
    }
  }

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10"
      />
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="fixed border border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl px-4 md:px-14 pt-4 pb-16 z-50 w-full max-w-[95vw] md:max-w-none md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All posts</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className="ri-close-circle-fill text-4xl cursor-pointer"
          />
        </div>
        <div className="mt-4 relative flex flex-col items-start">
          <i className="ri-search-2-line left-2 bottom-3 absolute text-dusk-main dark:text-dawn-main text-3xl" />
          <i
            onClick={() => {
              setSearching(false)
              setPage(1)
              setSearchTerm('')
            }}
            className="ri-close-fill absolute p-1 cursor-pointer right-2 bottom-2 text-dusk-main dark:text-dawn-main text-3xl"
          />
          <input
            type="text"
            placeholder="Search by post..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setSearching(true)
            }}
            className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main outline-none py-4 px-12 bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-y-5 my-4">
          {posts.map((post) => (
            <ListPost post={post} />
          ))}
        </div>
        <div className="flex justify-between">
          {searchTerm.length < 3 && (
            <>
              <div className="text-xl flex gap-x-5">
                {page !== 1 && (
                  <i
                    onClick={() => setPage(page - 1)}
                    className="ri-arrow-left-s-line p-1 cursor-pointer"
                  />
                )}
                {posts.length === 2 && (
                  <i
                    onClick={() => setPage(page + 1)}
                    className="ri-arrow-right-s-line p-1 cursor-pointer"
                  />
                )}
              </div>
              <span>page {page}</span>
            </>
          )}
        </div>
      </motion.section>
    </>
  )
}

interface PropsList {
  post: Post
}

const ListPost = ({ post }: PropsList) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  return (
    <div className="flex space-x-2 cursor-default">
      <img
        className="w-12 h-12"
        src={userMetadata?.user_img}
        alt="avatar/img"
      />
      <Link to={`/post/${post?._id}`} className="flex cursor-pointer flex-col -mt-1">
        <h2 className="text-lg font-semibold transition-all break-all duration-200">
          {post.title}
        </h2>
        <p className="truncate w-[70vw] md:w-96">{post.body}</p>
      </Link>
    </div>
  )
}
