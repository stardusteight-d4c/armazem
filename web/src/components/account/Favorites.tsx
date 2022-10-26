import React, { useEffect, useRef, useState } from 'react'
import { CardManga } from '../feed/CardManga'
import { motion } from 'framer-motion'

interface Props {}

export const Favorites = (props: Props) => {
  const [favoritesWidth, setFavoritesCarouselWidth] = useState(0)
  const [onDragFavorites, setOnDragFavorites] = useState(0)

  // CAROUSEL FRAMER MOTION
  const favoritesCarousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    favoritesCarousel.current &&
      setFavoritesCarouselWidth(
        favoritesCarousel.current.scrollWidth -
          favoritesCarousel.current.offsetWidth
      )
  }, [onDragFavorites])

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Favorites
      </h2>
      <motion.div
        drag="x"
        ref={favoritesCarousel}
        onDrag={(_event, info) => setOnDragFavorites(info.offset.x)}
        dragConstraints={{ right: 0, left: -favoritesWidth }}
        className="flex items-center gap-x-5 "
      >
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
        <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
      </motion.div>
    </section>
  )
}
