import React from 'react'

interface Props {
  img: string 
  title: string
  tags: string
}

export const Card = ({ img, title, tags }: Props) => {
  return (
    <div className="w-[240px] text-[#3e3e3e] dark:text-[#E1E1E6] bg-[#f0f0f0] dark:bg-[#2d3039] cursor-pointer rounded-lg backdrop-brightness-50 flex">
      <img
        src={img}
        alt=""
        className="w-[60px] h-[80px] rounded-lg"
      />
      <div className="flex items-center px-2">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
          <span className="text-xs font-semibold text-[#a7a7a7]">{tags}</span>
        </div>
      </div>
    </div>
  )
}
