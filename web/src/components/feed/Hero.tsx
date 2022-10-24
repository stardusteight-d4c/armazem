import React from 'react'
import hero from '../../assets/hero.jpg'

interface Props {}

export const Hero = (props: Props) => {
  return (
    <header className="space-y-5 relative z-10 flex flex-col">
      <div className="flex gap-4">
        <img
          src={hero}
          alt=""
          className="w-full  mx-auto h-[300px] object-cover cursor-pointer"
        />
      </div>
    </header>
  )
}
