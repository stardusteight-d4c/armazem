import axios from 'axios'
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  addNewReply,
  deleteDiscussion,
  repliesOfDiscussion,
  updateDiscussion,
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
import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'

timeago.register('en_short', en_short)

interface Props {
  discussion: any
  currentUser: User | null
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Discussions = ({
  discussion,
  currentUser,
  activeItem,
  setActiveItem,
}: Props) => {
  const [user, setUser] = useState<User>()
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState([])
  const [editValue, setEditValue] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${userData}/${discussion.by}`)
      setUser(data.user)
      const { data: replies } = await axios.get(
        `${repliesOfDiscussion}/${discussion._id}`
      )
      setReplies(replies.replies)
    })()
  }, [discussion])

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

  function handleActiveItemEditOnClick() {
    activeItem === discussion._id + 'EDIT'
      ? setActiveItem('')
      : setActiveItem(discussion._id + 'EDIT')
    setEditValue(discussion.body)
  }

  function handleActiveItemDeleteOnClick() {
    activeItem === discussion._id + 'DELETE'
      ? setActiveItem('')
      : setActiveItem(discussion._id + 'DELETE')
  }

  const editDiscussion = async () => {
    const { data } = await axios.post(updateDiscussion, {
      discussionId: discussion._id,
      body: editValue,
    })
  }

  const removeDiscussion = async () => {
    const { data } = await axios.post(deleteDiscussion, {
      discussionId: discussion._id,
      postId: discussion.post,
    })
  }

  return (
    <>
      <div className="flex relative bg-dawn-weak/10 dark:bg-dusk-weak/10 p-2 text-dusk-main dark:text-dawn-main items-start gap-3">
        {replies.length !== 0 && (
          <div className="h-[110%] top-3 left-[29px] -z-10 absolute w-[1px] bg-black/20 dark:bg-white/20" />
        )}
        <Link to={`/${user?.username}`}>
          <img
            referrerPolicy="no-referrer"
            src={user?.user_img}
            alt=""
            className="w-10 h-10 rounded-md border border-black/20 dark:border-white/20 object-cover"
          />
        </Link>
        <div className="flex flex-col w-full ">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg font-inter -mt-1 text-dusk-main dark:text-dawn-main">
              @{user?.username}
            </span>
            <span>
              <TimeAgo datetime={discussion.createdAt} locale="en_short" />
            </span>
          </div>
          {activeItem === discussion._id + 'EDIT' ? (
            <div className="flex flex-col">
              <textarea
                value={editValue}
                maxLength={255}
                onChange={(e) => setEditValue(e.target.value)}
                className="p-1 mt-1 text-lg outline-none bg-dusk-weak/5 border-prime-purple border max-h-48 min-h-[100px]  text-dusk-main/90 dark:text-dawn-main/90"
              />
              <div className="flex justify-end">
                <Button
                  disabled={editValue.trim() === '' && editValue.length <= 5}
                  title="Edit"
                  onClick={() => editDiscussion()}
                  className="!text-prime-purple !w-fit"
                />
              </div>
            </div>
          ) : (
            <span className="pr-2 text-lg text-dusk-main/90 dark:text-dawn-main/90">
              {discussion.body}
            </span>
          )}
          <div>
            <div className="flex items-center text-dusk-main dark:text-dusk-weak py-2 space-x-2 justify-end w-full">
              <i
                onClick={() => {
                  activeItem === discussion._id
                    ? setActiveItem('')
                    : setActiveItem(discussion._id)
                }}
                className={`${
                  activeItem === discussion._id && '!text-prime-blue'
                } ri-message-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
              />
              {currentUser?._id === user?._id && (
                <>
                  <i
                    onClick={handleActiveItemEditOnClick}
                    className={`${
                      activeItem === discussion._id + 'EDIT' &&
                      '!text-prime-purple'
                    } ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
                  />
                  <div className="relative">
                    <i
                      onClick={handleActiveItemDeleteOnClick}
                      className={`${
                        activeItem === discussion._id + 'DELETE' && '!text-red'
                      } ri-delete-bin-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
                    />
                    {activeItem === discussion._id + 'DELETE' && (
                      <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[27px] -bottom-[70px]">
                        <a
                          onClick={() => removeDiscussion()}
                          className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                        >
                          Delete
                        </a>
                        <a
                          onClick={() => setActiveItem('')}
                          className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                        >
                          Cancel
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {discussion?._id === activeItem && (
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
                  className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] border border-prime-blue p-2 outline-none"
                />
              </div>
              <div className="flex justify-end ">
                <Button
                  title="Reply"
                  onClick={() =>
                    handleAddNewReply(
                      discussion._id,
                      currentUser?._id,
                      user?._id
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
          <Replies
            editValue={editValue}
            setEditValue={setEditValue}
            key={index}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            repliesLength={repliesLength}
            index={index}
            reply={reply}
          />
        ))}
      </>
    </>
  )
}
