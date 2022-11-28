import React, { useEffect, useRef, useState } from 'react'
import { CardManga } from '../CardManga'
import { motion, PanInfo } from 'framer-motion'
import { useAppSelector } from '../../store/hooks'
import { mangaFavorites } from '../../services/api-routes'
import axios from 'axios'

interface Props {}

export const Favorites = (props: Props) => {
  const [cardSliderWidth, setCardSliderWidth] = useState(0)
  const [onDrag, setOnDrag] = useState(0)
  const userMetadata: User | null = useAppSelector(
    (state) => state.armazem.userMetadata
  )
  const [favorites, setFavorites] = useState([])
  const cardSlider = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (userMetadata) {
      ;(async () => {
        const { data } = await axios.get(
          `${mangaFavorites}/${userMetadata?.account}`
        )
        if (data.status === true) {
          setFavorites(data.mangas)
        }
      })()
    }
  }, [userMetadata])

  useEffect(() => {
    cardSlider.current &&
      setCardSliderWidth(
        cardSlider.current.scrollWidth - cardSlider.current.offsetWidth
      )
  }, [onDrag])

  const dragAnimate = {
    drag: 'x' as 'x',
    ref: cardSlider,
    onDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
      setOnDrag(info.offset.x),
    dragConstraints: { right: 0, left: -cardSliderWidth },
    className: 'flex items-center gap-x-5',
  }

  return (
    <section>
      <h2 className={style.title}>Favorites</h2>
      <motion.div {...dragAnimate}>
        {favorites.length > 0 ? (
          <>
            {favorites.map((favorite, index) => (
              <CardManga
                manga={favorite}
                key={index}
                className={style.cardMangaOverwriteStyles}
              />
            ))}
          </>
        ) : (
          <div className={style.noFavorites}>No favorites yet</div>
        )}
      </motion.div>
    </section>
  )
}

const style = {
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  cardMangaOverwriteStyles: `!min-w-[200px] !max-w-[180px] !h-[290px]`,
  noFavorites: `flex w-full items-center justify-center text-2xl my-8`,
}
