import React from 'react'

interface Props {}

export const Card = (props: Props) => {
  return (
    <div className="w-full col-span-1 cursor-pointer">
      <img
        src="https://cdn.myanimelist.net/images/manga/3/271629.jpg"
        className="w-full"
      />
    </div>
  )
}
