import { useEffect, useState } from 'react'
import { Link } from './Link'

interface Props {
  className?: string
  manga: {
    uid: string
    title: string
    cover: string
    score: Array<{ userId: string; score: number }>
  }
}

export const CardManga = ({ className, manga }: Props) => {
  const [avarageScore, setAvarageScore] = useState<number>()

  console.log(manga);
  

  const averageScore = () => {
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

  return (
    <Link
      title={manga.title}
      to={`/manga/${manga.uid}`}
      className={style.container}
    >
      <div className={style.scoreContainer}>
        <i className={style.starIcon} />
        {avarageScore ? avarageScore : 'No score'}
      </div>
      <img
        src={manga.cover}
        alt={manga.title}
        draggable="false"
        className={`${style.cover} ${className}`}
      />
    </Link>
  )
}

const style = {
  container: `hover:bg-fill-strong  border border-dawn-weak/20 dark:border-dusk-weak/20 hover:shadow-xl dark:shadow-white/10 shadow-black/10 dark:hover:bg-dawn-weak/20 relative transition-all ease-in-out duration-200 border-b-[4px] hover:border-fill-strong dark:hover:border-fill-weak hover:scale-105 hover:brightness-110`,
  scoreContainer: `absolute bottom-0 left-0 z-10 bg-fill-weak dark:bg-fill-strong text-base gap-x-2 flex items-center px-2 py-1 font-semibold`,
  starIcon: `ri-star-half-line`,
  cover: `object-fill min-w-[215px] h-[325px] `,
}
