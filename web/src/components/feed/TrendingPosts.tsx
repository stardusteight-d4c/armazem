import React, { Key, useEffect, useRef, useState } from 'react'
import { TrendingPost } from './integrate/TrendingPost'
import { motion, PanInfo } from 'framer-motion'
import { topRatedPost } from '../../services/api-routes'
import axios from 'axios'

interface Props {}

export const TrendingPosts = (props: Props) => {
  const [trendingSliderWidth, setTrendingSliderWidth] = useState<number>(0)
  const [onDragTrendingPost, setOnDragTrendingPost] = useState<number>(0)
  const [topRatedPosts, setTopRatedPosts] = useState<[Post] | []>([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get(topRatedPost)
        .then(({ data }) => setTopRatedPosts(data.posts))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [])

  const trendingSlider = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    trendingSlider.current &&
      setTrendingSliderWidth(
        trendingSlider.current.scrollWidth - trendingSlider.current.offsetWidth
      )
  }, [onDragTrendingPost])

  const dragAnimate = {
    drag: 'x' as 'x',
    ref: trendingSlider,
    onDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
      setOnDragTrendingPost(info.offset.x),
    dragConstraints: { right: 0, left: -trendingSliderWidth },
  }

  const rendersTrendingPosts = () =>
    topRatedPosts.length > 0 ? (
      topRatedPosts.map((post: { _id: string }, index: Key) => (
        <TrendingPost key={index} postId={post._id} />
      ))
    ) : (
      <div className={style.noContent}>There are no trending posts yet</div>
    )

  return (
    <section>
      <h2 className={style.title}>Trending posts</h2>
      <div className="w-full">
        <motion.div {...dragAnimate} className={style.lateralScroll}>
          {rendersTrendingPosts()}
        </motion.div>
      </div>
    </section>
  )
}

const style = {
  title: `text-2xl md:flex items-center gap-x-2 pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  lateralScroll: `flex items-center gap-x-5 cursor-default`,
  noContent: `flex w-full items-center justify-center my-8 text-2xl`,
}
