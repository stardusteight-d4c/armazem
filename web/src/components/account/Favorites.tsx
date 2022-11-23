import React, { useEffect, useRef, useState } from 'react'
import { CardManga } from '../feed/integrate/CardManga'
import { motion } from 'framer-motion'
import { useAppSelector } from '../../store/hooks'
import { mangaFavorites } from '../../services/api-routes'
import axios from 'axios'

interface Props {}

export const Favorites = (props: Props) => {
  const [favoritesWidth, setFavoritesCarouselWidth] = useState(0)
  const [onDragFavorites, setOnDragFavorites] = useState(0)
  const userMetadata: User | null = useAppSelector(
    (state) => state.armazem.userMetadata
  )

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (userMetadata) {
      ;(async () => {
        const { data } = await axios.get(
          `${mangaFavorites}/${userMetadata?.account}`
        )
        if (data.status === true) {
          console.log(data);
          
          setFavorites(data.mangas)
        }
      })()
    }
  }, [userMetadata])

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
        whileTap={{ cursor: 'grabbing' }}
        ref={favoritesCarousel}
        onDrag={(_event, info) => setOnDragFavorites(info.offset.x)}
        dragConstraints={{ right: 0, left: -favoritesWidth }}
        className="flex items-center gap-x-5 "
      >
        {favorites.length > 0 ? (
          <>
            {favorites.map((favorite, index) => (
              <CardManga
                manga={favorite}
                key={index}
                className="!min-w-[200px] !max-w-[180px] !h-[290px]"
              />
            ))}
          </>
        ) : (
          <div className="flex w-full items-center justify-center text-2xl my-8">
            No favorites yet
          </div>
        )}
      </motion.div>
    </section>
  )
}
