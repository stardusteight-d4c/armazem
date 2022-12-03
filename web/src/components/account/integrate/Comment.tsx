import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import axios from 'axios'
import {
  deleteComment,
  updateComment,
  userData,
} from '../../../services/api-routes'
import { Button } from '../../Button'
import { error, success } from '../../Toasters'
import { Dropdown } from '../../Dropdown'

timeago.register('en_short', en_short)

interface Props {
  requestAgain: boolean
  setRequestAgain: React.Dispatch<React.SetStateAction<boolean>>
  userMetadata: User
  comment: Comment
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Comment = ({
  userMetadata,
  comment,
  activeItem,
  requestAgain,
  setRequestAgain,
  setActiveItem,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [commentAuthor, setCommentAuthor] = useState<User>()
  const [editValue, setEditValue] = useState('')
  const editId = comment._id + 'EDIT'
  const deleteId = comment._id + 'DELETE'
  const isUserAccount = currentUser?._id === userMetadata._id
  const isAuthorComment = currentUser?._id === commentAuthor?._id

  useEffect(() => {
    if (comment.by) {
      ;(async () => {
        await axios
          .get(`${userData}/${comment?.by}`)
          .then(({ data }) => setCommentAuthor(data.user))
          .catch((error) => console.log(error.toJSON()))
      })()
    }
  }, [userMetadata])

  function handleEditComment() {
    activeItem === editId ? setActiveItem('') : setActiveItem(editId)
    setEditValue(comment.comment)
  }

  function handleDeleteComment(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    activeItem === deleteId ? setActiveItem('') : setActiveItem(deleteId)
  }

  const editComment = async () => {
    if (comment.comment === editValue) {
      error('No change detected')
    } else {
      await axios
        .put(updateComment, {
          commentId: comment._id,
          body: editValue,
        })
        .then(({ data }) => {
          setRequestAgain(!requestAgain)
          success(data.msg)
          setActiveItem('')
        })
        .catch((error) => console.log(error.toJSON()))
    }
  }

  const removeComment = async () => {
    await axios
      .delete(deleteComment, {
        params: {
          commentId: comment._id,
        },
      })
      .then(({ data }) => {
        success(data.msg)
        setRequestAgain(!requestAgain)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const rendersEditComment = () => (
    <div className={style.editContainer}>
      <textarea
        value={editValue}
        maxLength={255}
        onChange={(e) => setEditValue(e.target.value)}
        className={style.textareaEditMode}
      />
      <div className={style.editButtonContainer}>
        <Button
          disabled={editValue.trim() === '' && editValue.length <= 5}
          title="Edit"
          onClick={() => editComment()}
          className={style.editButton}
        />
      </div>
    </div>
  )

  document.body.addEventListener('click', () => setActiveItem(''))

  const rendersActions = () => (
    <div className={style.actionsContainer}>
      {isUserAccount && (
        <>
          <Dropdown space="space-y-9" title="Delete" items={deleteItems}>
            <i
              onClick={(e) => handleDeleteComment(e)}
              className={`${activeItem === deleteId && '!text-red'} ${
                style.deleteIcon
              }`}
            />
          </Dropdown>
        </>
      )}
      {isAuthorComment && (
        <>
          <i
            onClick={handleEditComment}
            className={`${activeItem === editId && '!text-prime-blue'}
         ${style.editIcon}`}
          />
          <Dropdown space="space-y-9" title="Delete" items={deleteItems}>
            <div
              onClick={(e) => handleDeleteComment(e)}
              className={`${activeItem === deleteId && '!text-red'} ${
                style.deleteIcon
              }`}
            />
          </Dropdown>
        </>
      )}
    </div>
  )

  const deleteItems = [
    { item: 'Delete', function: () => removeComment() },
    { item: 'Cancel' },
  ]

  return (
    <div className={style.wrapper}>
      <img
        src={commentAuthor?.user_img}
        alt="authorComment/img"
        className={style.authorImg}
      />
      <div className={style.commentContainer}>
        <span className={style.date}>
          <TimeAgo datetime={comment.createdAt} locale="en_short" />
        </span>
        <span className={style.authorName}>{commentAuthor?.name}</span>

        {activeItem === editId ? (
          rendersEditComment()
        ) : (
          <span className={style.comment}>{comment?.comment}</span>
        )}
        {rendersActions()}
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8 px-2 text-neutral-weak dark:text-neutral-main items-start gap-3`,
  authorImg: `w-12 h-12 object-cover`,
  commentContainer: `flex flex-col w-full`,
  date: `-mt-5 ml-auto`,
  authorName: `font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main`,
  editContainer: `flex flex-col`,
  textareaEditMode: `p-1 mt-1 text-lg outline-none bg-dusk-weak/5 border-prime-blue border max-h-48 min-h-[100px] text-dusk-main/90 dark:text-dawn-main/90`,
  editButtonContainer: `flex justify-end`,
  editButton: `!bg-prime-blue my-5 px-4 py-2 !w-fit`,
  comment: `text-dusk-main/90 dark:text-dawn-main/90`,
  actionsContainer: `flex relative text-dusk-main dark:text-dusk-weak items-center space-x-2 justify-end w-full`,
  deleteIcon: `ri-delete-bin-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm text-lg cursor-pointer`,
  editIcon: ` ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm text-lg cursor-pointer`,
}
