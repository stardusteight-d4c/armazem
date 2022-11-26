import { Key, useEffect, useState } from 'react'
import { RecentPost } from './integrate/RecentPost'
import axios from 'axios'
import { recentPostsWithPagination } from '../../services/api-routes'

export const RecentPosts = () => {
  const [page, setPage] = useState(1)
  const [recentPostsI, setRecentPostsI] = useState<[Post] | any>([])
  const [recentPostsII, setRecentPostsII] = useState<[Post] | any>([])
  const [endRecentPosts, setEndRecentPosts] = useState(false)
  const [request, setRequest] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!endRecentPosts) {
        const { data } = await axios.get(`${recentPostsWithPagination}/${page}`)
        if (data.status === true && page === 1) {
          setRecentPostsI(data.posts.slice(0, 2))
          setRecentPostsII(data.posts.slice(2, 4))
          setPage(2)
        } else if (data.status === true && page > 1) {
          if (data.posts.length === 0) {
            setEndRecentPosts(true)
          }
          setPage((page) => page + 1)

          setRecentPostsI([
            ...(recentPostsI !== undefined ? recentPostsI : []),
            ...(data.posts !== undefined ? data.posts.slice(0, 2) : []),
          ])
          setRecentPostsII([
            ...(recentPostsII !== undefined ? recentPostsII : []),
            ...(data.posts !== undefined ? data.posts.slice(2, 4) : []),
          ])
        }
      }
    })()
  }, [request])

  window.onscroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      // scrollbar is scrolled to bottom
      setRequest(!request)
    }
  }

  const rendersPosts = () => (
    <div className={style.postsWrapper}>
      <div className={style.postsContainer}>
        {recentPostsI.map((post: Post, index: Key) => (
          <RecentPost key={index} post={post} />
        ))}
      </div>
      <div className={style.postsContainer}>
        {recentPostsII.map((post: Post, index: Key) => (
          <RecentPost key={index} post={post} />
        ))}
      </div>
    </div>
  )

  const rendersNoData = () => (
    <section>
      <h2 className={style.title}>Most recent posts</h2>
      <span className={style.span}>There are no recent posts</span>
    </section>
  )

  return (
    <>
      {recentPostsI.length > 0 ? (
        <section>
          <h2 className={style.title}>Most recent posts</h2>
          {rendersPosts()}
          {endRecentPosts && (
            <span className={style.span}>There are no more recent posts</span>
          )}
        </section>
      ) : (
        <>{rendersNoData()}</>
      )}
    </>
  )
}

const style = {
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  postsWrapper: `flex flex-col md:flex-row min-w-full gap-4 pb-[40px]`,
  postsContainer: `flex flex-col gap-y-3 flex-grow md:max-w-[50%]`,
  span: `flex w-full text-center items-center justify-center md:my-8 mt-4 mb-24 md:mb-16 text-2xl`,
}
