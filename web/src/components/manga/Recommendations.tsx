import React, { useEffect, useRef, useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { CardManga } from '../CardManga'

interface Props {
  recMangas: [Manga]
}

export const Recommendations = ({ recMangas }: Props) => {
  const [recommendationsWidth, setRecommendationWidth] = useState(0)
  const [onDragRecommendations, setOnDragRecommendations] = useState(0)

  const recommendationsSlider =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    recommendationsSlider.current &&
      setRecommendationWidth(
        recommendationsSlider.current.scrollWidth -
          recommendationsSlider.current.offsetWidth
      )
  }, [onDragRecommendations])

  const dragAnimate = {
    drag: 'x' as 'x',
    ref: recommendationsSlider,
    onDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
      setOnDragRecommendations(info.offset.x),
    dragConstraints: { right: 0, left: -recommendationsWidth },
    className: 'flex items-center gap-x-5',
  }

  return (
    <section className={style.wrapper}>
      <h2 className={style.title}>Recommendations</h2>
      <motion.div {...dragAnimate}>
        {recMangas.map((manga: any, index: React.Key | null | undefined) => (
          <CardManga manga={manga} key={index} className={style.card} />
        ))}
      </motion.div>
    </section>
  )
}

const style = {
  wrapper: `px-2 md:px-0`,
  title: `text-2xl pb-4 text-dusk-main dark:text-dawn-main font-bold`,
  card: `!min-w-[200px] !max-w-[180px] !h-[290px]`,
}
