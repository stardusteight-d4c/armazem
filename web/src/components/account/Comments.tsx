import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  accountComments,
  accountDataByUserId,
  addComment,
} from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { success } from '../Toasters'
import { Comment } from './integrate/Comment'

interface Props {
  userMetadata: User
}

export const Comments = ({ userMetadata }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [activeItem, setActiveItem] = useState('')
  const [requestAgain, setRequestAgain] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (userMetadata._id) {
        const { data } = await axios.get(
          `${accountComments}/${userMetadata?.account}`
        )
        if (data.status === true) {
          setComments(data.comments)
        }
      }
    })()
  }, [userMetadata, requestAgain])

  const sendComment = async () => {
    const { data } = await axios.post(addComment, {
      accountId: userMetadata?.account,
      userId: currentUser?._id,
      comment,
    })
    if (data.status === true) {
      success(data.msg)
      setComment('')
      setRequestAgain(!requestAgain)
    }
  }

  return (
    <section className="mb-7">
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Comments
      </h2>
      <div>
        {currentUser?._id !== userMetadata._id && (
          <>
            <div className="flex items-start gap-x-5">
              <img
                src={currentUser?.user_img}
                alt=""
                className="w-16 h-16 object-cover"
              />
              <div className="flex flex-col w-full">
                <span className="font-medium text-2xl text-dusk-main dark:text-dawn-main">
                  {currentUser?.name}
                </span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave your comment"
                  className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none"
                />
              </div>
            </div>
            <div className=" flex justify-end ">
              <Button
                title="Submit"
                onClick={sendComment}
                className="bg-prime-blue my-5 !w-fit px-4 py-2"
              />
            </div>
          </>
        )}
        {comments.length > 0 ? (
          <>
            {comments?.map((comment, index) => (
              <Comment
                requestAgain={requestAgain}
                setRequestAgain={setRequestAgain}
                userMetadata={userMetadata}
                comment={comment}
                key={index}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center text-2xl my-8">
            No comments yet
          </div>
        )}
      </div>
    </section>
  )
}
