import React, { useEffect, useRef, useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { CardManga } from './integrate/CardManga'
import axios from 'axios'
import { mostRead } from '../../services/api-routes'

export const MostRead = () => {
  const [cardSliderWidth, setCardSliderWidth] = useState(0)
  const [onDrag, setOnDrag] = useState(0)
  const [mangas, setMangas] = useState<[Manga] | []>([])

  const cardSlider = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    cardSlider.current &&
      setCardSliderWidth(
        cardSlider.current.scrollWidth - cardSlider.current.offsetWidth
      )
  }, [onDrag])

  useEffect(() => {
    ;(async () => {
      await axios
        .get(mostRead)
        .then(({ data }) => setMangas(data.mangas))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [])

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
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Most read mangas
      </h2>
      <motion.div {...dragAnimate}>
        {mangas.map((manga) => (
          <CardManga manga={manga} />
        ))}
      </motion.div>
    </section>
  )
}
