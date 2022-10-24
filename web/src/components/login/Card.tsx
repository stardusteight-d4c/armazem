import React from 'react'

interface Props {
  poster: string
  title: string
  tags: string
}

export const Card = ({ poster, title, tags }: Props) => {
  return (
    <div className="w-[240px] text-dusk-main dark:text-dawn-main bg-white dark:bg-layer-heavy cursor-pointer rounded-lg backdrop-brightness-50 flex">
      <img src={poster} alt="" className="w-[60px] h-[80px] rounded-lg" />
      <div className="flex items-center px-2">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
          <span className="text-xs font-semibold text-dawn-weak dark:text-dusk-weak">
            {tags}
          </span>
        </div>
      </div>
    </div>
  )
}
