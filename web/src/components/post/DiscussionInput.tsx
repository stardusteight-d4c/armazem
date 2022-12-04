import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components'
import { error, success } from '../../components/Toasters'
import { addNewDiscussion } from '../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { askToRequestAgain } from '../../store'

interface Props {
  discussions: any
  socket: React.MutableRefObject<any>
}

export const DiscussionInput = ({ discussions, socket }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const { id: postId } = useParams()
  const [postComment, setPostComment] = useState<any>({ body: '' })
  const dispatch = useAppDispatch()

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostComment({
      ...postComment,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmitMainDiscussion = async () => {
    const { data } = await axios.post(addNewDiscussion, {
      postId,
      userId: currentUser?._id,
      body: postComment.body,
    })
    if (data.status === true) {
      success(data.msg)
      setPostComment({ body: '' })
      // socket.current.emit('post-update', {
      //   postId,
      //   userId: currentUser?._id,
      // })
      dispatch(askToRequestAgain())
    }
    if (data.status === false) {
      error(data.msg)
    }
  }

  return (
    <div className={style.wrapper}>
      <header className={style.wrapperHead}>
        <div className={style.spanHeadContainer}>
          <i className={style.discussionIcon} />
          <span>
            {discussions.length}{' '}
            {discussions.length <= 1 ? 'Discussion' : 'Discussions'}
          </span>
        </div>
      </header>
      <div className={style.wrapperInput}>
        <img
          src={currentUser?.user_img}
          alt="user/img"
          className={style.userImg}
        />
        <div className={style.inputContainer}>
          <span className={style.userName}>{currentUser?.name}</span>
          <textarea
            maxLength={255}
            minLength={5}
            id="body"
            value={postComment.body}
            onChange={(e) => handleChange(e)}
            placeholder="Type what you think about this subject"
            className={style.textareaInput}
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          title="Submit"
          onClick={() => handleSubmitMainDiscussion()}
          className={style.buttonSubmit}
        />
      </div>
    </div>
  )
}

const style = {
  wrapper: `mb-5 md:px-4`,
  wrapperHead: `flex items-center mt-16 mb-8`,
  spanHeadContainer: `flex items-center space-x-1 text-xl font-semibold`,
  discussionIcon: `ri-discuss-line text-2xl pr-1`,
  wrapperInput: `flex items-start gap-x-2 md:gap-x-5`,
  userImg: `w-14 h-14 object-cover rounded-md`,
  inputContainer: 'flex flex-col w-full',
  userName: `font-medium text-xl text-dusk-main dark:text-dawn-main`,
  textareaInput: `w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none`,
  buttonContainer: `flex justify-end`,
  buttonSubmit: `bg-prime-blue my-5 !w-fit px-4 py-2`,
}
