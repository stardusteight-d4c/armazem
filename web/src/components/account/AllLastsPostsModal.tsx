import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  askToRequestAgain,
  handleOpenModal,
  handleUserMetadata,
} from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import { dataByUsername, postByPagination } from '../../services/api-routes'
import { useLocation } from 'react-router-dom'

interface Props {}

export const AllLastsPostsModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  // const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  // const location = useLocation()
  // const username = location.pathname

  // useEffect(() => {
  //   ;(async () => {
  //     const { data } = await axios.get(`${dataByUsername}${username}`)
  //     dispatch(handleUserMetadata(data.user))
  //   })()
  // }, [username, requestAgain])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${postByPagination}/${userMetadata?._id}/${page}`
      )
      if (data.status === true) {
        setPosts(data.posts)
      }
    })()
  }, [page])

  console.log('posts', posts)

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="absolute z-40 inset-0 w-screen h-screen bg-fill-strong/30"
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
        className="absolute border border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl px-14 pt-4 pb-16 rounded-sm z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-white dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
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
          <input
            type="text"
            placeholder="Search by post..."
            // onChange={(e) => handleSearchTerm(e)}
            className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main outline-none py-4 px-12 bg-transparent"
          />
        </div>
      </motion.section>
    </>
  )
}

// Puxar posts por paginação de 5 em 5, colocar filtragem por título do post, em forma de listagem
// Puxar shared posts e fazer o modal de see all
