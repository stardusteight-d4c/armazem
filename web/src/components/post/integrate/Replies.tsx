import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  addNewReply,
  deleteReply,
  updateReply,
  userData,
} from '../../../services/api-routes'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Button } from '../../Button'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { error, success } from '../../Toasters'
import { askToRequestAgain } from '../../../store'
import { Dropdown } from '../../Dropdown'

timeago.register('en_short', en_short)

interface Props {
  reply: any
  repliesLength: any
  index: number
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
  editValue: string
  setEditValue: React.Dispatch<React.SetStateAction<string>>
}

export const Replies = ({
  reply,
  editValue,
  setEditValue,
  activeItem,
  setActiveItem,
  repliesLength,
  index,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [userByMetadata, setUserByMetadata] = useState<any>()
  const [toUsername, setToUsername] = useState(null)
  const [replyUser, setReplyUser] = useState('')
  const dispatch = useAppDispatch()
  const replyEditId = reply._id + 'EDIT'
  const replyDeleteId = reply._id + 'DELETE'

  useEffect(() => {
    ;(async () => {
      const { data: by } = await axios.get(`${userData}/${reply.by}`)
      const { data: to } = await axios.get(`${userData}/${reply.to}`)
      setUserByMetadata(by.user)
      setToUsername(to.user.username)
    })()
  }, [])

  function handleActiveItemEditOnClick() {
    activeItem === replyEditId ? setActiveItem('') : setActiveItem(replyEditId)
    setEditValue(reply.body)
  }

  const handleAddNewReply = async (
    discussionId: any,
    sender: any,
    receiver: any
  ) => {
    await axios
      .post(addNewReply, {
        discussionId,
        sender,
        receiver,
        body: replyUser,
      })
      .then(({ data }) => {
        setActiveItem('')
        success(data.msg)
        dispatch(askToRequestAgain())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const editReply = async () => {
    if (editValue === reply.body) {
      error('No change detected')
    } else {
      await axios
        .post(updateReply, {
          replyId: reply._id,
          body: editValue,
        })
        .then(({ data }) => {
          setActiveItem('')
          success(data.msg)
          dispatch(askToRequestAgain())
        })
        .catch((error) => console.log(error.toJSON()))
    }
  }

  const handleActiveItemDeleteOnClick = () => {
    activeItem === replyDeleteId
      ? setActiveItem('')
      : setActiveItem(replyDeleteId)
  }

  const removeReply = async () => {
    await axios
      .post(deleteReply, {
        discussionId: reply.discussion,
        replyId: reply._id,
      })
      .then(({ data }) => {
        setActiveItem('')
        success(data.msg)
        dispatch(askToRequestAgain())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const deleteReplyItems = [
    {
      item: 'Delete',
      function: () => removeReply(),
    },
    {
      item: 'Cancel',
      function: () => setActiveItem(''),
    },
  ]

  const rendersReplyBodyAndEdit = () => (
    <span className={style.editContainer}>
      <span className={style.toUsername}>{toUsername}</span>
      {activeItem === replyEditId ? (
        <div className={style.inputTextareaContainer}>
          <textarea
            value={editValue}
            maxLength={255}
            onChange={(e) => setEditValue(e.target.value)}
            className={style.inputTextareaEdit}
          />
          <div className={style.buttonEditContainer}>
            <Button
              disabled={editValue.trim() === '' && editValue.length <= 5}
              title="Edit"
              onClick={() => editReply()}
              className={style.buttonEdit}
            />
          </div>
        </div>
      ) : (
        <>{reply.body}</>
      )}
    </span>
  )

  const handleDeleteActiveItem = () => {
    setActiveItem('')
    document.body.removeEventListener('click', handleDeleteActiveItem, false)
  }

  activeItem === replyDeleteId &&
    document.body.addEventListener('click', handleDeleteActiveItem, false)

  const rendersReplyActions = () => (
    <div className={style.replyActionsContainer}>
      <i
        onClick={() => {
          activeItem === reply?._id
            ? setActiveItem('')
            : setActiveItem(reply!._id)
        }}
        className={`${activeItem === reply?._id && '!text-prime-blue'} ${
          style.discussionIcon
        } ${style.action}`}
      />
      {userByMetadata._id === currentUser?._id && (
        <>
          <i
            onClick={handleActiveItemEditOnClick}
            className={`${activeItem === replyEditId && '!text-prime-blue'} ${
              style.editIcon
            } ${style.action}`}
          />
          <Dropdown
            title="Delete reply"
            items={deleteReplyItems}
            space="space-y-6"
          >
            <i
              onClick={handleActiveItemDeleteOnClick}
              className={`${activeItem === replyDeleteId && '!text-red'} ${
                style.deleteIcon
              } ${style.action}`}
            />
          </Dropdown>
        </>
      )}
    </div>
  )

  const rendersSendReply = () => (
    <>
      {reply?._id === activeItem && (
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className={style.replyContainer}>
            <img
              src={currentUser?.user_img}
              alt="user/img"
              className={style.replyUserImg}
            />
            <textarea
              maxLength={255}
              onChange={(e) => setReplyUser(e.target.value)}
              placeholder={`Reply to ${userByMetadata?.username}`}
              className={style.sendReplyInputTextarea}
            />
          </div>
          <div className={style.buttonReplyContainer}>
            <Button
              title="Reply"
              onClick={() =>
                handleAddNewReply(
                  reply.discussion,
                  currentUser?._id,
                  userByMetadata._id
                )
              }
              className={style.buttonReply}
            />
          </div>
        </motion.section>
      )}
    </>
  )

  return (
    <>
      {toUsername !== null && (
        <div className={style.wrapper}>
          {index < repliesLength - 1 && <div className={style.linkedReplies} />}
          <Link to={`/${userByMetadata.username}`}>
            <img
              src={userByMetadata.user_img}
              alt="user/img"
              className={style.userImg}
            />
          </Link>

          <div className={style.repliesContainer}>
            <div className={style.headContainer}>
              <span className={style.username}>@{userByMetadata.username}</span>
              <TimeAgo datetime={reply.createdAt} locale="en_short" />
            </div>
            {rendersReplyBodyAndEdit()}
            {rendersReplyActions()}
            {rendersSendReply()}
          </div>
        </div>
      )}
    </>
  )
}

const style = {
  wrapper: `flex relative p-2 my-1 text-dusk-main dark:text-dawn-main items-start gap-3`,
  linkedReplies: `h-[108%] z-0 left-[29px] absolute w-[2px] bg-black/20 dark:bg-white/20`,
  userImg: `w-11 h-11 absolute rounded-sm z-20 min-w-[44px] cursor-pointer border border-black/20 dark:border-white/20 object-cover`,
  repliesContainer: `flex flex-col w-full ml-[40px]`,
  headContainer: `flex justify-between items-center -mt-1`,
  username: `font-medium text-lg text-dusk-main dark:text-dawn-main`,
  editContainer: `pr-2 text-dusk-main/90 text-lg dark:text-dawn-main/90`,
  toUsername: `text-prime-blue pr-2`,
  inputTextareaContainer: `flex flex-col`,
  inputTextareaEdit: `p-1 mt-1 text-lg outline-none bg-dusk-weak/5 border-prime-blue border max-h-48 min-h-[100px] text-dusk-main/90 dark:text-dawn-main/90`,
  buttonEditContainer: `flex justify-end`,
  buttonEdit: `!bg-prime-blue !text-base my-2 px-4 py-2 !w-fit`,
  replyActionsContainer: `flex items-center py-2 space-x-2 justify-start md:justify-end w-full`,
  action: `border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
  discussionIcon: `ri-message-2-fill`,
  editIcon: `ri-edit-2-fill`,
  deleteIcon: `ri-delete-bin-2-fill`,
  replyContainer: `flex -ml-[55px] md:ml-0 gap-x-2 mt-2`,
  replyUserImg: `w-11 h-11 z-40 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover`,
  sendReplyInputTextarea: `w-full max-h-[180px] border-prime-blue placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] border p-2 outline-none`,
  buttonReplyContainer: `flex justify-end`,
  buttonReply: `!bg-prime-blue !text-base my-2 px-4 py-2 !w-fit`,
}
