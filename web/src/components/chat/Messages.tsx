import React from 'react'
import { useAppSelector } from '../../store/hooks'

interface Props {
  message: any
  currentChat: any
}

export const Messages = ({ message, currentChat }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  return (
    <>
      {message.fromSelf ? (
        <div className="flex justify-end">
          <div>
            <div className="text-right">@{currentUser?.username}</div>
            <div className="bg-dawn-weak/20 dark:bg-dusk-weak/20 ml-auto  p-2 w-fit h-fi rounded-sm my-2">
              {message.message}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div>
            <div className="text-left">@{currentChat.username}</div>
            <div className="bg-dawn-weak/20 dark:bg-dusk-weak/20 p-2 w-fit h-fi rounded-sm my-2">
              {message.message}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
