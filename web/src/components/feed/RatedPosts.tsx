import React, { useEffect, useRef, useState } from 'react'
import { PreviewPost } from './PreviewPost'
import { motion } from 'framer-motion'

interface Props {
  session: {}
}



export const RatedPosts = ({session}: Props) => {
  const [previewPostCarouselWidth, setPreviewPostCarouselWidth] = useState(0)
  const [onDragPreviewPost, setOnDragPreviewPost] = useState(0)
  // CAROUSEL FRAMER MOTION
  const previewPostCarousel =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    previewPostCarousel.current &&
      setPreviewPostCarouselWidth(
        previewPostCarousel.current.scrollWidth -
          previewPostCarousel.current.offsetWidth
      )
  }, [session, onDragPreviewPost])

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Top rated posts
      </h2>
      <div className="w-full">
        <motion.div
          // whileTap={{ cursor: 'grabbing' }}
          drag="x"
          ref={previewPostCarousel}
          onDrag={(_event, info) => setOnDragPreviewPost(info.offset.x)}
          dragConstraints={{
            right: 0,
            left: -previewPostCarouselWidth,
          }}
          className="flex items-center gap-x-5"
        >
          <PreviewPost />
          <PreviewPost />
          <PreviewPost />
          <PreviewPost />
          <PreviewPost />
          <PreviewPost />
        </motion.div>
      </div>
    </section>
  )
}
