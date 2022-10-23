import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CardManga } from './CardManga'

interface Props {
  session: {}
}

export const PopularReadings = ({ session }: Props) => {
  const [cardCarouselWidth, setCardCarouselWidth] = useState(0)
  const [onDrag, setOnDrag] = useState(0)

  const cardCarousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    cardCarousel.current &&
      setCardCarouselWidth(
        cardCarousel.current.scrollWidth - cardCarousel.current.offsetWidth
      )
  }, [session, onDrag])

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Popular readings
      </h2>
      <motion.div
        // whileTap={{ cursor: 'grabbing' }}
        drag="x"
        ref={cardCarousel}
        onDrag={(_event, info) => setOnDrag(info.offset.x)}
        dragConstraints={{ right: 0, left: -cardCarouselWidth }}
        className="flex items-center gap-x-5 "
      >
        <CardManga />
        <CardManga />
        <CardManga />
        <CardManga />
        <CardManga />
        <CardManga />
        <CardManga />
      </motion.div>
    </section>
  )
}
