import React from 'react'

interface Props {
  connection: User
}

export const RecentConnectionOnline = ({connection}: Props) => {
  return (
    <li className="flex justify-between w-full cursor-pointer items-center px-4 gap-4">
      <div className="flex items-center space-x-4">
        <img
          src={connection.user_img}
          alt=""
          className="w-8 h-8 object-cover"
        />
        <span className="font-medium">{connection.username}</span>
      </div>
      <i className="ri-wifi-line" />
    </li>
  )
}
