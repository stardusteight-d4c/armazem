import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CardManga } from './CardManga'
import axios from 'axios'
import { mostRead } from '../../services/api-routes'

interface Props {}

export const PopularReadings = (props: Props) => {
  const [cardCarouselWidth, setCardCarouselWidth] = useState(0)
  const [onDrag, setOnDrag] = useState(0)
  const [mangas, setMangas] = useState([])

  const cardCarousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    cardCarousel.current &&
      setCardCarouselWidth(
        cardCarousel.current.scrollWidth - cardCarousel.current.offsetWidth
      )
  }, [onDrag])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(mostRead)
      if (data.status === true) {
        setMangas(data.mangas)
      }
    })()
  }, [])

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Most read mangas
      </h2>
      <motion.div
        // whileTap={{ cursor: 'grabbing' }}
        drag="x"
        ref={cardCarousel}
        onDrag={(_event, info) => setOnDrag(info.offset.x)}
        dragConstraints={{ right: 0, left: -cardCarouselWidth }}
        className="flex items-center gap-x-5 "
      >
        {mangas.map((manga) => (
          <CardManga manga={manga} />

        ))}
      </motion.div>
    </section>
  )
}
