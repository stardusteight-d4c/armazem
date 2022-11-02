import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { addNewReply, userData } from '../../services/api-routes'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

timeago.register('en_short', en_short)

interface Props {
  reply: any
  repliesLength: any
  index: number
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Replies = ({ reply, activeItem, setActiveItem, repliesLength, index }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [userByMetadata, setUserByMetadata] = useState<any>()
  const [toUsername, setToUsername] = useState(null)
  const [replyUser, setReplyUser] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data: by } = await axios.get(`${userData}/${reply.by}`)
      const { data: to } = await axios.get(`${userData}/${reply.to}`)
      setUserByMetadata(by.user)
      setToUsername(to.user.username)
    })()
  }, [])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyUser(event.target.value)
  }

  const handleAddNewReply = async (
    discussionId: any,
    sender: any,
    receiver: any
  ) => {
    const { data } = await axios.post(addNewReply, {
      discussionId,
      sender,
      receiver,
      body: replyUser,
    })
  }

  return (
    <>
      {toUsername !== null && (
        <div className="flex relative p-2 my-1  text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
          {index < repliesLength - 1 && (
            <div className="h-[110%] left-9 -z-10 absolute w-[1px] bg-dawn-weak/20 dark:bg-dusk-weak/20" />
          )}
          <Link to={`/${userByMetadata.username}`}>
          <img
            src={userByMetadata.user_img}
            alt=""
            className="w-14 h-14 cursor-pointer rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
            />
            </Link>
          <div className="flex flex-col w-full ">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg text-dusk-main dark:text-dawn-main">
                {`@${userByMetadata.username}`}
              </span>
              <TimeAgo datetime={reply.createdAt} locale="en_short" />
            </div>
            <span className="pr-2 text-dusk-main/90 text-lg dark:text-dawn-main/90">
              <span className="text-prime-blue pr-2">{toUsername}</span>
              {reply.body}
            </span>
            <div>
              <div className="flex items-center py-2 space-x-2 justify-end w-full">
                <i
                  onClick={() => {
                    activeItem === reply?._id
                      ? setActiveItem('')
                      : setActiveItem(reply!._id)
                  }}
                  className="ri-message-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer"
                />
                {userByMetadata._id === currentUser?._id && (
                  <i className="ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                )}
              </div>
            </div>
            {reply?._id === activeItem && (
              <motion.section
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex gap-x-2 mt-2">
                  <img
                    src={currentUser?.user_img}
                    alt=""
                    className="w-12 h-12 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
                  />
                  <textarea
                    maxLength={255}
                    onChange={(e) => handleChange(e)}
                    placeholder={`Reply to ${userByMetadata?.username}`}
                    className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none"
                  />
                </div>
                <div className="flex justify-end ">
                  <Button
                    title="Reply"
                    onClick={() =>
                      handleAddNewReply(
                        reply.discussion,
                        currentUser?._id,
                        userByMetadata._id
                      )
                    }
                    className="!text-prime-blue !w-fit"
                  />
                </div>
              </motion.section>
            )}
          </div>
        </div>
      )}
    </>
  )
}
