import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { userData } from '../../services/api-routes'

interface Props {
  reply: any
  repliesLength: any
  index: number
}

export const Replies = ({ reply, repliesLength, index }: Props) => {
  const [userByMetadata, setUserByMetadata] = useState<any>()
  const [toUsername, setToUsername] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { data: by } = await axios.get(`${userData}/${reply.by}`)
      const { data: to } = await axios.get(`${userData}/${reply.to}`)
      setUserByMetadata(by.user)
      setToUsername(to.user.username)
    })()
  }, [])

  console.log('repliesLength', repliesLength)
  console.log('index', index)

  return (
    <>
      {toUsername !== null && (
        <div className="flex relative p-2 my-1  text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
          {index < repliesLength - 1 && (
            <div className="h-[110%] left-[26px] -z-10 absolute w-[1px] bg-dawn-weak/20 dark:bg-dusk-weak/20" />
          )}
          <img
            src={userByMetadata.user_img}
            alt=""
            className="w-9 h-9 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
          />
          <div className="flex flex-col w-full ">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg text-dusk-main dark:text-dawn-main">
                {`@${userByMetadata.username}`}
              </span>
              <span>{reply.createdAt}</span>
            </div>
            <span
              className="pr-2 text-dusk-main/90 dark:text-dawn-main/90"
              pb-2
            >
              <span className="text-prime-blue pr-2">{toUsername}</span>
              {reply.body}
            </span>
            <div>
              <div className="flex items-center py-2 space-x-2 justify-end w-full">
                <i className="ri-message-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                <i className="ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
