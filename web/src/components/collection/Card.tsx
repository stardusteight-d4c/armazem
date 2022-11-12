import React from 'react'

interface Props {}

export const Card = (props: Props) => {
  return (
    <div className="hover:bg-fill-strong hover:shadow-xl shadow-black/10 dark:shadow-white/10 dark:hover:bg-fill-weak cursor-pointer relative transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-fill-strong dark:hover:border-b-fill-weak hover:scale-105 hover:brightness-110">
      <img
        src="https://kbimages1-a.akamaihd.net/22af78ba-0eeb-44e0-ab5e-20a4a890ade9/1200/1200/False/jujutsu-kaisen-vol-8.jpg"
        alt=""
        className="object-fill w-full min-w-[215px] h-[325px] pointer-events-none"
      />
    </div>
  )
}
