import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  addNewReply,
  repliesOfDiscussion,
  userData,
} from '../../services/api-routes'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { handleOpenModal } from '../../store'
import { Button } from '../Button'
import { AnimatePresence, motion } from 'framer-motion'
import { Replies } from './Replies'

timeago.register('en_short', en_short)

interface Props {
  discussion: any
  currentUser: User | null
  post: Post
}

export const Discussions = ({ discussion, currentUser, post }: Props) => {
  const [user, setUser] = useState<User>()
  const dispatch = useAppDispatch()
  const [reply, setReply] = useState('')
  const [comment, setComment] = useState('')
  const [replies, setReplies] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${userData}/${discussion.by}`)
      const { data: replies } = await axios.get(
        `${repliesOfDiscussion}/${discussion._id}`
      )
      setUser(data.user)
      setReplies(replies.replies)
    })()
  }, [])

  const repliesLength = replies.length

  const handleAddNewReply = async (
    discussionId: any,
    sender: any,
    receiver: any
  ) => {
    const { data } = await axios.post(addNewReply, {
      discussionId,
      sender,
      receiver,
      body: reply,
    })
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReply(event.target.value)
  }

  console.log(replies)

  return (
    <>
      <div className="flex relative bg-dusk-weak/10 dark:bg-dusk-weak/5 border rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20 p-2   text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
        {replies.length !== 0 && (
          <div className="h-[110%] left-9 -z-10 absolute w-[1px] bg-dawn-weak/20 dark:bg-dusk-weak/20" />
        )}
        <img
          src={user?.user_img}
          alt=""
          className="w-14 h-14 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
        />
        <div className="flex flex-col w-full ">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg font-inter -mt-1 text-dusk-main dark:text-dawn-main">
              @{user?.username}
            </span>
            <span>
              <TimeAgo datetime={discussion.createdAt} locale="en_short" />
            </span>
          </div>
          <span className="pr-2 text-lg text-dusk-main/90 dark:text-dawn-main/90">
            {discussion.body}
          </span>
          <div>
            <div className="flex items-center py-2 space-x-2 justify-end w-full">
              <i
                onClick={() => {
                  comment === user?._id ? setComment('') : setComment(user!._id)
                }}
                className="ri-message-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer"
              />
              {currentUser?._id === user?._id && (
                <i className="ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
              )}
            </div>
          </div>
          {user?._id === comment && (
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
                  placeholder={`Reply to ${user?.username}`}
                  className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none"
                />
              </div>
              <div className="flex justify-end ">
                <Button
                  title="Reply"
                  onClick={() =>
                    handleAddNewReply(
                      discussion._id,
                      currentUser?._id,
                      user._id
                    )
                  }
                  className="!text-prime-blue !w-fit"
                />
              </div>
            </motion.section>
          )}
        </div>
      </div>
      <>
        {replies.map((reply, index) => (
          <Replies key={index} repliesLength={repliesLength} index={index} reply={reply} />
        ))}
      </>
    </>
  )
}
