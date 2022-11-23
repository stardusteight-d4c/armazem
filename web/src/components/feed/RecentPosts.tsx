import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RecentPost } from './integrate/RecentPost'
import axios from 'axios'
import {
  postMetadataById,
  recentPostsWithPagination,
} from '../../services/api-routes'
import { Loader } from '../Loader'

interface Props {}

export const RecentPosts = (props: Props) => {
  const [page, setPage] = useState(1)
  const [recentPostsFirstSection, setRecentPostsFirstSection] = useState<
    [Post] | any
  >([])
  const [recentPostsSecondSection, setRecentPostsSecondSection] = useState<
    [Post] | any
  >([])
  const [endRecentPosts, setEndRecentPosts] = useState(false)
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!endRecentPosts) {
        const { data } = await axios.get(`${recentPostsWithPagination}/${page}`)
        if (data.status === true && page === 1) {
          setRecentPostsFirstSection(data.posts.slice(0, 2))
          setRecentPostsSecondSection(data.posts.slice(2, 4))
          setPage(2)
        } else if (data.status === true && page > 1) {
          if (data.posts.length === 0) {
            setEndRecentPosts(true)
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          }
          setPage((page) => page + 1)

          setRecentPostsFirstSection([
            ...(recentPostsFirstSection !== undefined
              ? recentPostsFirstSection
              : []),
            ...(data.posts !== undefined ? data.posts.slice(0, 2) : []),
          ])
          setRecentPostsSecondSection([
            ...(recentPostsSecondSection !== undefined
              ? recentPostsSecondSection
              : []),
            ...(data.posts !== undefined ? data.posts.slice(2, 4) : []),
          ])
        }
      }
    })()
  }, [request])

  window.onscroll = function () {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      // window is scrolled to bottom
      setRequest(!request)
    }
  }

  return (
    <>
      {recentPostsFirstSection.length > 0 ? (
        <section>
          <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
            Most recent posts
          </h2>
          <div className="flex flex-col md:flex-row min-w-full gap-4 pb-[40px]">
            <motion.div className="flex flex-col gap-y-3 flex-grow md:max-w-[50%]">
              {recentPostsFirstSection.map((post: Post) => (
                <RecentPost post={post} />
              ))}
            </motion.div>
            <motion.div className="flex flex-col gap-y-3 flex-grow md:max-w-[50%]">
              {recentPostsSecondSection.map((post: Post) => (
                <RecentPost post={post} />
              ))}
            </motion.div>
          </div>
          {endRecentPosts && (
            <>
              {loading ? (
                <div className="w-full h-fit flex mb-14 md:mb-0 items-center justify-center">
                  <Loader className="border-fill-strong dark:border-white !w-12 !h-12 !border-[4px]" />
                </div>
              ) : (
                <div className="flex w-full text-center items-center justify-center md:my-8 mt-4 mb-20 text-2xl">
                  There are no more recent posts
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-2xl pt-12 text-dusk-main dark:text-dawn-main font-bold">
            Most recent posts
          </h2>
          <div className="flex w-full items-center justify-center my-8 text-2xl">
            There are no recent posts
          </div>
        </section>
      )}
    </>
  )
}
