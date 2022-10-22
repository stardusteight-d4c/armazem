import React from 'react'

interface Props {}

export const PreviewPost = (props: Props) => {
  return (
    <article className="max-w-[450px] min-w-[450px] h-[285px] p-4 text-[#707070] dark:text-[#9B9B9B] bg-[#eceff4] dark:bg-[#2e3440]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-dusk-main dark:text-dawn-main">Gabriel Sena</span>
        </div>
        <span>3 hours ago</span>
      </div>
      <div>
        <h2 className="font-semibold text-lg py-2 text-dusk-main dark:text-dawn-main">
          Man, I wish smoker was not treated like an "Example dummy".
        </h2>
      </div>
      <p>
        I like this man so much but holy damn he's basically on the show just to
        be used as a punching bag. They need to introduce a new strong pirate?
        Great, send in smoker to catch some fists with his face...
      </p>
      <div className="h-[1px] w-[full] my-2 bg-dusk-weak/50" />
      <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
        <div className="flex items-center gap-x-5">
          <div className="flex items-center cursor-pointer">
            <i className="ri-battery-2-charge-line p-1 text-xl" />
            <span className="text-sm">25 Ups</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <i className="ri-discuss-line p-1 text-xl" />
            <span className="text-sm">Discuss</span>
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <i className="ri-share-box-line p-1 text-xl" />
          <span className="text-sm">Share</span>
        </div>
      </div>
    </article>
  )
}