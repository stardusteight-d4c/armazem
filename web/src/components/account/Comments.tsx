import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { accountComments, addComment } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { success } from '../Toasters'
import { Comment } from './integrate/Comment'

interface Props {}

export const Comments = ({}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [activeItem, setActiveItem] = useState('')
  const [requestAgain, setRequestAgain] = useState(false)
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  if (!userMetadata) {
    return <></>
  }

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

  const commentProps = {
    requestAgain: requestAgain,
    setRequestAgain: setRequestAgain,
    userMetadata: userMetadata,
    activeItem: activeItem,
    setActiveItem: setActiveItem,
  }

  return (
    <section>
      <h2 className={style.title}>Comments</h2>
      <div>
        {currentUser?._id !== userMetadata._id && (
          <>
            <div className={style.leaveYourCommentContainer}>
              <img
                src={currentUser?.user_img}
                alt="profile_user/img"
                className={style.userImg}
              />
              <div className={style.inputTextareaContainer}>
                <span className={style.userName}>{currentUser?.name}</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave your comment"
                  className={style.textarea}
                />
              </div>
            </div>
            <div className={style.buttonContainer}>
              <Button
                title="Submit"
                onClick={sendComment}
                className={style.button}
              />
            </div>
          </>
        )}
        {comments.length > 0 ? (
          <>
            {comments?.map((comment, index: React.Key) => (
              <Comment key={index} comment={comment} {...commentProps} />
            ))}
          </>
        ) : (
          <div className={style.noComments}>No comments yet</div>
        )}
      </div>
    </section>
  )
}

const style = {
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  leaveYourCommentContainer: `flex items-start gap-x-5`,
  userImg: `w-16 h-16 object-cover`,
  inputTextareaContainer: `flex flex-col w-full`,
  userName: `font-medium text-2xl text-dusk-main dark:text-dawn-main`,
  textarea: `w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none`,
  buttonContainer: `flex justify-end`,
  button: `bg-prime-blue my-5 !w-fit px-4 py-2`,
  noComments: `flex items-center justify-center text-2xl my-8`,
}
