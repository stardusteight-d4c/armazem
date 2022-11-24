import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  manga: Manga
}

export const Card = ({manga}: Props) => {
  return (
    <Link to={`/manga/${manga.uid}`} className="hover:bg-fill-strong hover:shadow-xl shadow-black/10 dark:shadow-white/10 dark:hover:bg-fill-weak cursor-pointer relative transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-fill-strong dark:hover:border-b-fill-weak hover:scale-105 hover:brightness-110">
      <img
        src={manga.cover}
        alt=""
        className="object-fill w-full min-h-[250px] max-h-[250px] md:max-h-fit md:min-w-[215px] md:h-[325px] pointer-events-none"
      />
    </Link>
  )
}
