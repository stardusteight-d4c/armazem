import React, { useEffect, useRef, useState } from 'react'
import { TrendingPost } from './integrate/TrendingPost'
import { motion } from 'framer-motion'
import { topRatedPost } from '../../services/api-routes'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { handleLoading } from '../../store'

interface Props {}

export const TrendingPosts = (props: Props) => {
  const [previewPostCarouselWidth, setPreviewPostCarouselWidth] =
    useState<number>(0)
  const [onDragPreviewPost, setOnDragPreviewPost] = useState<number>(0)
  const [topRatedPosts, setTopRatedPosts] = useState<[Post] | []>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(topRatedPost)
      if (data.status === true) {
        setTopRatedPosts(data.posts)
      }
    })()
  }, [])

  const previewPostCarousel =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    previewPostCarousel.current &&
      setPreviewPostCarouselWidth(
        previewPostCarousel.current.scrollWidth -
          previewPostCarousel.current.offsetWidth
      )
  }, [onDragPreviewPost])

  return (
    <section>
      <h2 className={style.title}>Trending posts</h2>
      <div className="w-full">
        <motion.div
          whileTap={{ cursor: 'grabbing' }}
          drag="x"
          ref={previewPostCarousel}
          onDrag={(_event, info) => setOnDragPreviewPost(info.offset.x)}
          dragConstraints={{
            right: 0,
            left: -previewPostCarouselWidth,
          }}
          className="flex items-center gap-x-5"
        >
          {topRatedPosts.length > 0 ? (
            <>
              {topRatedPosts.map((post: any) => (
                <TrendingPost postId={post._id} />
              ))}
            </>
          ) : (
            <div className={style.noContent}>
              There are no trending posts yet
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const style = {
  title: `text-2xl md:flex items-center gap-x-2 pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  noContent: `flex w-full items-center justify-center my-8 text-2xl`,
}
