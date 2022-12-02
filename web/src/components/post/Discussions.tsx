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
import { askToRequestAgain } from '../../store'
import { Button } from '../Button'
import { motion } from 'framer-motion'
import { Replies } from './integrate/Replies'
import { Link, useParams } from 'react-router-dom'
import { error, success } from '../Toasters'
import { Dropdown } from '../Dropdown'

timeago.register('en_short', en_short)

interface Props {
  discussion: any
  currentUser: User | null
  activeItem: string
  socket: React.MutableRefObject<any>
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Discussions = ({
  discussion,
  currentUser,
  activeItem,
  socket,
  setActiveItem,
}: Props) => {
  const [authorDiscussion, setAuthorDiscussion] = useState<User>()
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState([])
  const [editValue, setEditValue] = useState('')
  const dispatch = useAppDispatch()
  const { id: postId } = useParams()
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const editId = discussion._id + 'EDIT'
  const deleteId = discussion._id + 'DELETE'
  const repliesLength = replies.length

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${userData}/${discussion.by}`)
      setAuthorDiscussion(data.user)
      const { data: replies } = await axios.get(
        `${repliesOfDiscussion}/${discussion._id}`
      )
      setReplies(replies.replies)
    })()
  }, [discussion, requestAgain])

  function handleActiveItemEditOnClick() {
    activeItem === editId ? setActiveItem('') : setActiveItem(editId)
    setEditValue(discussion.body)
  }

  function handleActiveItemDeleteOnClick() {
    activeItem === deleteId ? setActiveItem('') : setActiveItem(deleteId)
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
      body: reply,
    })
    if (data.status === true) {
      setActiveItem('')
      success(data.msg)
      socket.current.emit('post-update', {
        postId,
        userId: currentUser?._id,
      })
      dispatch(askToRequestAgain())
    }
  }

  const editDiscussion = async () => {
    if (editValue === discussion.body) {
      error('No change detected')
    } else {
      const { data } = await axios.post(updateDiscussion, {
        discussionId: discussion._id,
        body: editValue,
      })
      if (data.status === true) {
        setActiveItem('')
        success(data.msg)
        dispatch(askToRequestAgain())
      }
    }
  }

  const removeDiscussion = async () => {
    const { data } = await axios.post(deleteDiscussion, {
      discussionId: discussion._id,
      postId: discussion.post,
    })
    if (data.status === true) {
      setActiveItem('')
      success(data.msg)
      dispatch(askToRequestAgain())
    }
  }

  const deleteDiscussionItems = [
    {
      item: 'Delete',
      function: () => removeDiscussion(),
    },
    {
      item: 'Cancel',
      function: () => setActiveItem(''),
    },
  ]

  const rendersDiscussionBodyAndEdit = () => (
    <>
      {activeItem === editId ? (
        <div className={style.editContainer}>
          <textarea
            value={editValue}
            maxLength={255}
            onChange={(e) => setEditValue(e.target.value)}
            className={style.editInputTextarea}
          />
          <div className={style.buttonEditContainer}>
            <Button
              disabled={editValue.trim() === '' && editValue.length <= 5}
              title="Edit"
              onClick={() => editDiscussion()}
              className={style.buttonEdit}
            />
          </div>
        </div>
      ) : (
        <span className={style.body}>{discussion.body}</span>
      )}
    </>
  )

  const handleDeleteActiveItem = () => {
    setActiveItem('')
    document.body.removeEventListener('click', handleDeleteActiveItem, false)
  }

  activeItem === deleteId &&
    document.body.addEventListener('click', handleDeleteActiveItem, false)

  const rendersDiscussionActions = () => (
    <div className={style.discussionActionsContainer}>
      <i
        onClick={(e) => {
          e.stopPropagation()
          activeItem === discussion._id
            ? setActiveItem('')
            : setActiveItem(discussion._id)
        }}
        className={`${activeItem === discussion._id && '!text-prime-blue'} ${
          style.replyIcon
        } ${style.action}
        }`}
      />

      {currentUser?._id === authorDiscussion?._id && (
        <>
          <i
            onClick={(e) => {
              e.stopPropagation()
              handleActiveItemEditOnClick()
            }}
            className={`${activeItem === editId && '!text-prime-blue'} ${
              style.editIcon
            } ${style.action}`}
          />
          <Dropdown
            title="Delete discussion"
            items={deleteDiscussionItems}
            space="space-y-6"
          >
            <i
              onClick={handleActiveItemDeleteOnClick}
              className={`${activeItem === deleteId && '!text-red'} ${
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
      {discussion?._id === activeItem && (
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
              onChange={(e) => setReply(e.target.value)}
              placeholder={`Reply to ${authorDiscussion?.username}`}
              className={style.replyInputTextarea}
            />
          </div>
          <div className={style.buttonReplyContainer}>
            <Button
              title="Reply"
              onClick={() =>
                handleAddNewReply(
                  discussion._id,
                  currentUser?._id,
                  authorDiscussion?._id
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
      <div className={style.wrapper}>
        {replies.length > 0 && <div className={style.linkedReplies} />}
        <Link to={`/${authorDiscussion?.username}`}>
          <img
            referrerPolicy="no-referrer"
            src={authorDiscussion?.user_img}
            alt="author/img"
            className={style.userImg}
          />
        </Link>
        <div className={style.discussionContainer}>
          <div className={style.headContainer}>
            <span className={style.username}>
              @{authorDiscussion?.username}
            </span>
            <span>
              <TimeAgo datetime={discussion.createdAt} locale="en_short" />
            </span>
          </div>
          {rendersDiscussionBodyAndEdit()}
          {rendersDiscussionActions()}
          {rendersSendReply()}
        </div>
      </div>
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
  )
}

const style = {
  wrapper: `flex relative bg-dawn-weak/10 dark:bg-dusk-weak/10 p-2 text-dusk-main dark:text-dawn-main items-start gap-3`,
  linkedReplies: `h-[100%] top-3 z-0 left-[29px] absolute w-[2px] bg-black/20 dark:bg-white/20`,
  userImg: `w-11 h-11 min-w-[44px] absolute z-20 rounded-sm border border-black/20 dark:border-white/20 object-cover`,
  discussionContainer: `flex flex-col w-full ml-[40px]`,
  headContainer: `flex justify-between items-center`,
  username: `font-medium text-lg font-inter -mt-1 text-dusk-main dark:text-dawn-main`,
  editContainer: `flex flex-col`,
  editInputTextarea: `p-1 mt-1 text-lg outline-none bg-dusk-weak/5 border-prime-blue border max-h-48 min-h-[100px] text-dusk-main/90 dark:text-dawn-main/90`,
  buttonEditContainer: `flex justify-end`,
  buttonEdit: `!bg-prime-blue my-2 px-4 py-2 !w-fit`,
  body: `pr-2 break-all text-lg text-dusk-main/90 dark:text-dawn-main/90`,
  discussionActionsContainer: `flex items-center text-dusk-main dark:text-dusk-weak py-2 space-x-2 justify-start md:justify-end w-full`,
  action: `border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-5 h-5 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
  replyIcon: `ri-message-2-fill`,
  editIcon: `ri-edit-2-fill`,
  deleteIcon: `ri-delete-bin-2-fill text-dusk-main dark:text-dusk-weak`,
  replyContainer: `flex -ml-[55px] md:ml-0 gap-x-2 mt-2`,
  replyUserImg: `w-12 h-12 rounded-sm border z-20 border-dawn-weak/20 dark:border-dusk-weak/20 object-cover`,
  replyInputTextarea: `w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] border border-prime-blue p-2 outline-none`,
  buttonReplyContainer: `flex justify-end`,
  buttonReply: `!bg-prime-blue my-2 px-4 py-2 !w-fit`,
}
