import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  className?: string
  manga?: any
}

export const CardManga = ({ className, manga }: Props) => {
  const [avarageScore, setAvarageScore] = useState<any>()
  const [click, setClick] = useState<any>()
  const navigate = useNavigate()

  function averageScore() {
    if (manga?.score && manga.score.length > 0) {
      const scoreArr: Number[] = []
      manga?.score.map((score: { score: Number }) => scoreArr.push(score.score))
      const sum = scoreArr.reduce(
        (accumulator, score) => Number(accumulator) + Number(score)
      )
      const avarage = Number(sum) / Number(scoreArr.length)
      setAvarageScore(avarage)
    }
  }

  useEffect(() => {
    averageScore()
  }, [manga])

  // Prevents image dragging
  window.ondragstart = function () {
    return false
  }

  // Distinguishes drag and true click
  const delta = 6
  let startX: number
  let startY: number
  window.addEventListener('mousedown', function (event) {
    startX = event.pageX
    startY = event.pageY
  })
  window.addEventListener('mouseup', function (event) {
    const diffX = Math.abs(event.pageX - startX)
    const diffY = Math.abs(event.pageY - startY)
    if (diffX < delta && diffY < delta) {
      setClick(true)
    }
  })

  return (
    <motion.div
      whileTap={{ cursor: 'grabbing' }}
      onClick={() => {
        click && navigate(`/manga/${manga.uid}`)
        setClick(false)
      }}
      className="hover:bg-fill-strong  border border-dawn-weak/20 dark:border-dusk-weak/20 hover:shadow-xl dark:shadow-white/10 shadow-black/10 dark:hover:bg-dawn-weak/20 relative transition-all ease-in-out duration-200 border-b-[4px] hover:border-fill-strong dark:hover:border-fill-weak hover:scale-105 hover:brightness-110"
    >
      <div className="absolute bottom-0 left-0 z-10 bg-fill-weak dark:bg-fill-strong text-base gap-x-2 flex items-center px-2 py-1 font-semibold">
        <i className="ri-star-half-line" />
        {avarageScore ? avarageScore : '??'}
      </div>
      <img
        src={manga.cover}
        alt=""
        draggable="false"
        className={`object-fill min-w-[215px] h-[325px] ${className}`}
      />
    </motion.div>
  )
}