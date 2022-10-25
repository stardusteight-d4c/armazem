import React from 'react'

interface Props {
  className?: string
}

export const CardManga = ({className}: Props) => {
  return (
    <div className="hover:bg-black dark:hover:bg-white cursor-pointer relative transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110">
      <div className="absolute bottom-0 left-0 z-10 bg-white dark:bg-[#2e3440] text-base gap-x-2 flex items-center px-2 py-1 font-semibold">
        <i className="ri-star-half-line" />
        8.5
      </div>
      <img
        src="https://kbimages1-a.akamaihd.net/22af78ba-0eeb-44e0-ab5e-20a4a890ade9/1200/1200/False/jujutsu-kaisen-vol-8.jpg"
        alt=""
        draggable="false"
        className={`object-fill min-w-[215px] h-[325px] pointer-events-none ${className}`}
      />
    </div>
  )
}
