import React from 'react'

interface Props {}

export const CardManga = (props: Props) => {
  return (
    <div className="bg-[#2e3440]  relative">
      <div className="absolute bottom-0 left-0 bg-white dark:bg-[#2e3440] text-base gap-x-2 flex items-center px-2 py-1 font-semibold">
        <i className="ri-star-half-line" />
        8.5
      </div>
      <img
        src="https://kbimages1-a.akamaihd.net/22af78ba-0eeb-44e0-ab5e-20a4a890ade9/1200/1200/False/jujutsu-kaisen-vol-8.jpg"
        alt=""
        draggable="false"
        className="object-fill min-w-[215px] h-[325px] pointer-events-none"
      />
    </div>
  )
}
