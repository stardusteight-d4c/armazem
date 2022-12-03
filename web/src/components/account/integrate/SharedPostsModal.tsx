import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import axios from 'axios'
import {
  searchSharedPostByTitle,
  sharedPostByPagination,
  userData,
} from '../../../services/api-routes'
import { Overlay } from '../../modals/Overlay'
import { Link } from 'react-router-dom'

interface Props {}

interface PropsList {
  post: Post
}

export const SharedPostsModal = (props: Props) => {
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
    await axios
      .get(`${sharedPostByPagination}/${userMetadata?.account}/${page}`)
      .then(({ data }) => setPosts(data.posts))
      .catch((error) => console.log(error.toJSON()))
  }

  const searchByTerm = async () => {
    if (searchTerm.length >= 3) {
      await axios
        .get(searchSharedPostByTitle, {
          params: {
            accountId: userMetadata?.account,
            searchTerm: searchTerm,
          },
        })
        .then(({ data }) => setPosts(data.posts))
        .catch((error) => console.log(error.toJSON()))
    } else {
      setSearching(false)
    }
  }

  const ListPost = ({ post }: PropsList) => {
    const [authorPost, setAuthorPost] = useState<User>()

    useEffect(() => {
      ;(async () => {
        await axios
          .get(`${userData}/${post.by}`)
          .then(({ data }) => setAuthorPost(data.user))
          .catch((error) => console.log(error.toJSON()))
      })()
    }, [])

    return (
      <div className={style.itemFlexContainer}>
        <img
          className={style.authorImg}
          src={authorPost?.user_img}
          alt="author/img"
        />
        <Link
          onClick={() => dispatch(handleOpenModal(null))}
          to={`/post/${post?._id}`}
          className={style.postContainer}
        >
          <h2 className={style.postTitle}>{post.title}</h2>
          <p className={style.postBody}>{post.body}</p>
        </Link>
      </div>
    )
  }

  const motionProps = {
    initial: {
      y: -500,
      opacity: 0,
      translateX: '-50%',
      translateY: '-50%',
    },
    transition: { type: 'spring', duration: 0.8 },
    animate: { y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' },
    className: style.wrapper,
  }

  return (
    <>
      <Overlay />
      <motion.section {...motionProps}>
        <div className={style.header}>
          <h1 className={style.title}>Shared Posts</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className={style.closeIcon}
          />
        </div>
        <div className={style.inputContainer}>
          <i className={style.searchIcon} />
          <i
            onClick={() => {
              setSearching(false)
              setPage(1)
              setSearchTerm('')
            }}
            className={style.cancelSearchIcon}
          />
          <input
            type="text"
            placeholder="Search by post..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setSearching(true)
            }}
            className={style.input}
          />
        </div>
        <div className={style.postListContainer}>
          {posts.map((post) => (
            <ListPost post={post} />
          ))}
        </div>
        <div className={style.paginationContainer}>
          {searchTerm.length < 3 && (
            <>
              <div className={style.arrowsContainer}>
                {page !== 1 && (
                  <i
                    onClick={() => setPage(page - 1)}
                    className={style.arrowLeftIcon}
                  />
                )}
                {posts.length === 2 && (
                  <i
                    onClick={() => setPage(page + 1)}
                    className={style.arrowRightIcon}
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

const style = {
  wrapper: `fixed border border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md p-4 z-50 w-[95vw] md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  header: `flex items-center justify-between`,
  title: `text-2xl font-semibold`,
  closeIcon: `ri-close-circle-fill text-4xl cursor-pointer`,
  inputContainer: `mt-4 relative flex flex-col items-start`,
  searchIcon: `ri-search-2-line left-2 bottom-3 absolute text-dusk-main dark:text-dawn-main text-3xl`,
  cancelSearchIcon: `ri-close-fill absolute p-1 cursor-pointer right-2 bottom-2 text-dusk-main dark:text-dawn-main text-3xl`,
  input: `w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main outline-none py-4 px-12 bg-transparent`,
  postListContainer: `flex flex-col gap-y-5 my-4`,
  itemFlexContainer: `flex space-x-2 cursor-pointer`,
  authorImg: `w-12 h-12`,
  postContainer: `flex cursor-pointer flex-col -mt-1`,
  postTitle: `text-lg font-semibold transition-all break-all duration-200`,
  postBody: `truncate w-[70vw] md:w-96`,
  paginationContainer: `flex justify-between`,
  arrowsContainer: `text-xl flex gap-x-5`,
  arrowLeftIcon: `ri-arrow-left-s-line p-1 cursor-pointer`,
  arrowRightIcon: `ri-arrow-right-s-line p-1 cursor-pointer`,
}
