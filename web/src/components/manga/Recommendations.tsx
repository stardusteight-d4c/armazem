import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CardManga } from '../CardManga'

interface Props {
  recMangas: any
}

export const Recommendations = ({recMangas}: Props) => {
  const [recommendationWidth, setRecommendationWidth] = useState(0)
  const [onDragRecommendations, setOnDragRecommendations] = useState(0)


  // CAROUSEL FRAMER MOTION
  const recommendationsCarrousel =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    recommendationsCarrousel.current &&
      setRecommendationWidth(
        recommendationsCarrousel.current.scrollWidth -
          recommendationsCarrousel.current.offsetWidth
      )
  }, [onDragRecommendations])

  return (
    <section className="px-2 md:px-0">
      <h2 className="text-2xl pb-4 text-dusk-main dark:text-dawn-main font-bold">
        Recommendations
      </h2>
      <motion.div
        drag="x"
        ref={recommendationsCarrousel}
        onDrag={(_event, info) => setOnDragRecommendations(info.offset.x)}
        dragConstraints={{ right: 0, left: -recommendationWidth }}
        className="flex items-center gap-x-5 "
      >
        {recMangas.map((manga: any, index: React.Key | null | undefined) => (
          <CardManga
            manga={manga}
            key={index}
            className="!min-w-[200px] !max-w-[180px] !h-[290px]"
          />
        ))}
      </motion.div>
    </section>
  )
}
