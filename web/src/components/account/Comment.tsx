import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import axios from 'axios'
import { updateComment, userData } from '../../services/api-routes'
import { Button } from '../Button'
import { Loader } from '../Loader'

timeago.register('en_short', en_short)

interface Props {
  userMetadata: User
  comment: Comment
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Comment = ({
  userMetadata,
  comment,
  activeItem,
  setActiveItem,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [commentAuthor, setCommentAuthor] = useState<User>()
  const [editValue, setEditValue] = useState('')

  console.log('comment', comment)

  useEffect(() => {
    if (comment.by) {
      ;(async () => {
        const { data } = await axios.get(`${userData}/${comment?.by}`)
        setCommentAuthor(data.user)
      })()
    }
  }, [])

  function handleEditComment() {
    activeItem === comment._id + 'EDIT'
      ? setActiveItem('')
      : setActiveItem(comment._id + 'EDIT')
    setEditValue(comment.comment)
  }

  function handleDeleteComment() {
    activeItem === comment._id + 'DELETE'
      ? setActiveItem('')
      : setActiveItem(comment._id + 'DELETE')
  }

  const editComment = async () => {
    await axios.post(updateComment, {
      commentId: comment._id,
      body: editValue,
    })
  }

  return (
    <div className="flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
      <img
        src={commentAuthor?.user_img}
        alt="authorComment/img_profile"
        className="w-12 h-12 rounded-sm border border-dawn-weak/20 dark:border-dusk-weak/20 object-cover"
      />
      <div className="flex flex-col w-full ">
        <span className="-mt-5 ml-auto">
          <TimeAgo datetime={comment.createdAt} locale="en_short" />
        </span>
        <span className="font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main">
          {commentAuthor?.name}
        </span>

        {activeItem === comment._id + 'EDIT' ? (
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
                onClick={() => editComment()}
                className="!text-prime-purple !w-fit"
              />
            </div>
          </div>
        ) : (
          <span className="text-dusk-main/90 dark:text-dawn-main/90">
            {comment?.comment}
          </span>
        )}

        <div className="flex relative text-dusk-main dark:text-dusk-weak items-center space-x-2 justify-end w-full">
          {currentUser?._id === userMetadata._id && (
            <>
              <i
                onClick={handleDeleteComment}
                className={`${
                  activeItem === comment._id + 'DELETE' && '!text-red'
                } ri-delete-bin-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
              />
              {activeItem === comment._id + 'DELETE' && (
                <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[20px] -bottom-[68px]">
                  <a
                    // onClick={() => removeDiscussion()}
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
            </>
          )}
          {currentUser?._id === commentAuthor?._id && (
            <>
              <i
                onClick={handleEditComment}
                className={`${
                  activeItem === comment._id + 'EDIT' && '!text-prime-purple'
                }
                ri-edit-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
              />
              <i
                onClick={handleDeleteComment}
                className={`${
                  activeItem === comment._id + 'DELETE' && '!text-red'
                } ri-delete-bin-2-fill border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer`}
              />
              {activeItem === comment._id + 'DELETE' && (
                <div className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[20px] -bottom-[68px]">
                  <a
                    // onClick={() => removeDiscussion()}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
