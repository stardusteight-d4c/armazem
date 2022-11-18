import React, { useEffect, useRef, useState } from 'react'
import { PreviewPost } from './PreviewPost'
import { motion } from 'framer-motion'

interface Props {
  topRatedPosts: any
}

export const RatedPosts = ({ topRatedPosts }: Props) => {
  const [previewPostCarouselWidth, setPreviewPostCarouselWidth] = useState(0)
  const [onDragPreviewPost, setOnDragPreviewPost] = useState(0)
  const [click, setClick] = useState<any>()

  // CAROUSEL FRAMER MOTION
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
      <h2 className="text-2xl flex items-center gap-x-2 pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Trending posts 
        {/* <div className='text-base font-medium mt-1'>(last 24h)</div>  */}
        {/* se não haver trending posts? */}
      </h2>
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
          {topRatedPosts.map((post: any) => (
            <PreviewPost postId={post._id}  />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
